---
title: InDesign to Ebook&nbsp;&ndash; Duplicated List Symbols
title_image: studying.min.jpg
date: 2013-06-20
tags: InDesign, eBook, ePub, mobi
---

Working on setting up an InDesign book for conversion to ebook formats (ePub 
and mobi), I ran into a problem: double bullets. We use a lot of ordered lists 
and unordered lists in our technical manuals -- there's a lot of step-by-step 
"do this, then do that" material. So, getting rid of the bullets all together 
isn't an option.

READMORE

## Is It Me? ##

At first, I thought I must be doing something wrong. After all, I'd semantically 
named by bullet styles and the bullets were being applied by the paragraph style
_Bullets & Numbering_ feature. Surely, I must have some setting wrong in the 
export options!

Nope.

It looks like I'm not the only one with this problem. It was reported on the
[Adobe forums in June of 2012][1]. That was almost a year ago.


## Hacks ##

Some hacks have cropped up in order to deal with this terriblly non-semantic use
of lists.


### Correct the markup ###

Part of the problem is that InDesign CS6 doesn't have a good way to semantically
group inline content. You can Group objects, but you can't group together a 
collection of paragraphs and inline objects. That means you can't say "Hey, 
InDesign: all of these things are a part of the same list item."

[Ron Bilodeau's solution][2] is to let InDesign get you most of the way there,
and then strip out some of the stuff (the ending `</ol>` tags) that is messing 
everything up.

Ron has a decent idea here, but he really needs to be properly nesting the
elements within the list item. Ron's solution leaves the document in only 
barely better condition than it was when it started:
  
~~~ html
<body id="List_test" xml:lang="en-US">
  <div class="Basic-Text-Frame">
    <ol>
      <li class="Num-List"><span class="char-style-override-1">1.&#9;</span>First list item</li>
    </ol>
    <p class="Num-List----">Additional paragraph to extend the content for the first list item.</p>
    <ol>
      <li class="Num-List"><span class="char-style-override-1">2.&#9;</span>Second list item</li>
      <li class="Num-List"><span class="char-style-override-1">3.&#9;</span>Third list item</li>
    </ol>
  </div>
</body>
~~~

Instead, he should be nesting that paragraph within the first list item:

~~~ html
<body id="List_test" xml:lang="en-US">
  <div class="Basic-Text-Frame">
    <ol>
      <li class="Num-List"><span class="char-style-override-1">1.&#9;</span>First list item
        <p class="Num-List----">Additional paragraph to extend the content for the first list item.</p>
      </li>
    </ol>
    <ol>
      <li class="Num-List"><span class="char-style-override-1">2.&#9;</span>Second list item</li>
      <li class="Num-List"><span class="char-style-override-1">3.&#9;</span>Third list item</li>
    </ol>
  </div>
</body>
~~~

As a result, he can get rid of the extra non-semantic ordered lists:

~~~ html
<body id="List_test" xml:lang="en-US">
  <div class="Basic-Text-Frame">
    <ol>
      <li class="Num-List"><span class="char-style-override-1">1.&#9;</span>First list item
        <p class="Num-List----">Additional paragraph to extend the content for the first list item.</p>
      </li>
      <li class="Num-List"><span class="char-style-override-1">2.&#9;</span>Second list item</li>
      <li class="Num-List"><span class="char-style-override-1">3.&#9;</span>Third list item</li>
    </ol>
  </div>
</body>
~~~

Doesn't that look so much better? There's still a bunch of unnecessary stuff 
there though.


### Override the CSS ###
  
We see the double bullets because InDesign is encoding the bullets as real
characters. Never mind the accessibility concerns, Adobe's hack of a solution
to the problem of custom bullet styling is extremely shortsighted: it causes
the InDesign generated layout to break in many older ebook readers (and it is
just plain ugly).

Adobe tries to implement custom list styling by making lists behave like blocks
and by taking away all of the default hanging indentation with the following 
CSS rules:

~~~ css
li { /* Make a list item behave like a generic block element */
  display: block;
}

ol, ul, li { /* Strip all spacing from lists and list items */
  margin: 0;
  padding: 0;
  border-width: 0;
}
~~~

So, Liz Castro's "coder" [solution][3] is to just make everything _look_ like it 
should through CSS overrides. She adds another stylesheet in the EPUB export
process with the following rules:

~~~ css
li { /* Make lists behave like lists */
  display: list-item;
}

ol, ul { /* Add two em measurements of negative space around each list */
  margin: 2em;
}
~~~

Since this stylesheet will be added after the default InDesign stylesheet, these
CSS rules will override the bad InDesign CSS. Lists now behave like lists.

We still have the problem of a bunch of number entity references in numbered 
lists and bullet entity references in bulleted lists. Liz uses a GREP search &
replace to get rid of the numbers:

~~~ grep
<span class="ordered-list.*?</span>
~~~

The `ordered-list` class is the name of the paragraph style that used numbering.

We can use a similar replacement to remove all of the bullets:

~~~ grep
<span class="unordered-list.*?</span>
~~~

The result is not too shabby, but it doesn't help us correct the markup 
semantically.


## Semantic Enforcement ##

Currently, the best solution is to use the above to techniques to get you a step
in the right direction, and then do the real clean up by hand.

I plan to construct some automation.


[1]: http://forums.adobe.com/message/4527122 "InDesign CS6 Coding ePub Lists Wrong?"
[2]: http://silvadeau.wordpress.com/2012/08/23/lists-in-epub-generated-from-indesign-cs6 "Lists in ePub generated from InDesign CS6"
[3]: http://www.pigsgourdsandwikis.com/2012/08/numbered-lists-from-indesign-6.html "Numbered lists from InDesign CS 6 to EPUB and mobi"
