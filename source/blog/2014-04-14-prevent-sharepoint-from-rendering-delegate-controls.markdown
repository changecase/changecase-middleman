---
title: Prevent SharePoint from Rendering Delegate Controls
title_image: telesiege.min.jpg
date: 2014-04-14
tags: SharePoint 2013, SuiteLinksDelegate, Delegate Control
description: Learn how to prevent SharePoint from displaying Newsfeed, OneDrive, and Sites links in the Suite Bar.
---

SharePoint 2013 introduces the Suite Bar, a collection of navigation items 
including administration menus and links to Newsfeed, OneDrive, and Sites. But,
what if you don't need to display the links to Newsfeed, OneDrive, or Sites?

You have four options:

1. [Remove the delegate control from the Master Page][1].
2. [Prevent SharePoint from importing the control][2].
3. [Hide the links with CSS][3].
4. [Hide the links with JavaScript][4].

READMORE

## Remove the Delegate Control From the Master Page

To generate the links to Newsfeed, OneDrive, and Sites, SharePoint 2013 uses a
Delegate Control, specifically the `SuiteLinksDelegate`. If this control is 
available in your Master Page, you can simply remove it or comment it out to 
prevent SharePoint from rendering these links.

Taking this approach allows you to make the change merely by editing the Master 
Page in SharePoint Designer, Visual Studio, Vim or any other text editor. By 
removing the control from the Master Page, you save some processor overhead 
since SharePoint doesn't have to bother rendering the links at all (slightly 
decreasing page load time).

There is one requirement to this approach though: your Master Page _must_ be 
explicitly declaring the `DeltaSuiteLinks` control. In other words, if your 
Delegate Controls are all being rendered as children of `AdditionalPageHead` 
by using the `AllowMultipleControls="true"` attribute, this is not an option 
for you.

Oslo is an example of a Master Page that renders the Delegate Controls as 
children of `AdditionalPageHead`:

~~~ html
<!--SPM:<SharePoint:DelegateControl runat="server" ControlId="AdditionalPageHead" AllowMultipleControls="true"/>-->
~~~

The control to remove or comment out will look something like: 

~~~ html
<!--SPM:<SharPoint:DelegateControl id="ID_SuiteLinksDelegate" ControlID="SuiteLinksDelegate" runat="server" />-->
~~~

## Prevent SharePoint from Importing the Control

What if you don't want to use the processor overhead to render the links, but 
the control is being rendered as a child of `AdditionalPageHead`?

Unfortunately, this is not a change that you can make from the SharePoint Admin
interface, SharePoint Designer, or Visual Studio. You have to have direct access
to the Server hosting your SharePoint environment. That means physical or RDP
access.

## Hide the Links with CSS

If you are including an additional or custom CSS file, this is an extremely 
quick solution to impliment. Just hide the element that contains the links, 
`#DeltaSuiteLinks`:

~~~ css
#DeltaSuiteLinks { display: none; }
~~~

While this is a very quick solution, SharePoint still ends up rendering the 
links. 

Since the magic here is all happening client side, the `#DeltaSuiteLinks` element 
and all of the elements it contains remain programatically accessable (via the 
DOM). If the CSS fails to load, the links will be visible to the end user. If 
you've got a _lot_ of CSS, your end users may observe a flicker on page load 
as the `#DeltaSuiteLinks` waits for the command to hide.

## Hide the Links with JavaScript

You can hide the links with Javascript instead of straight CSS. However, like 
hiding the links via CSS, this all happens client side and includes the same 
risks... plus more. Since the JavaScript has to load (and run), you'll be 
increasing the client side page load time by including JavaScript.

By creating a new function and pushing it to `_spBodyOnLoadFunctionNames`, you 
will be able to asyncronously load the JavaScript hiding. This is great, since 
you don't end up with blocking js, but it will give you a flicker as the 
`#DeltaSuiteLinks` element winks into a hidden state.

To hide the links via vanilla JavaScript, add the following to your js stack:

~~~ javascript
// push our custom function to the list of functions to load as soon as the 
// DOM is ready
_spBodyOnLoadFunctionNames.push("HideDeltaSuiteLinks");

// Our custom function for selecting and hiding those links
function HideDeltaSuiteLinks(){
  // impliment the style attribute of "display: none;" to the #DeltaSuiteLinks element
  document.getElementById('DeltaSuiteLinks').style.display = 'none';
}
~~~

If you are using jQuery, you can do the same thing with the following:

~~~ javascript
// Push our custom function to the list of functions to load as soon as the 
// DOM is ready. 

// NOTE: I'm _not_ using $('document').ready() here. JQuery's document ready is
// redundant with SharePoint's _spBodyOnLoadFunctionNames (and introduces 
// potential confilicts.
_spBodyOnLoadFunctionNames.push("HideDeltaSuiteLinks");

// Our custom function for selecting and hiding those links, in jQuery!
function HideDeltaSuiteLinks(){
  // Impliment the style attribute of "display: none;" to the #DeltaSuiteLinks 
  // element. Use jQuery() instead of $() to avoid dollar sign conflicts with 
  // SharePoint.
  jQuery('#DeltaSuiteLinks').style.display = 'none';
}
~~~

## In Conclusion

The most performant solution is to prevent SharePoint from rendering the link
elements in the first place. But your ability to do that may be restricted by 
your level of access.

[1]: #remove-the-delegate-control-from-the-master-page
[2]: #prevent-sharepoint-from-importing-the-control
[3]: #hide-the-link-with-css
[4]: #hide-the-links-with-javacript
