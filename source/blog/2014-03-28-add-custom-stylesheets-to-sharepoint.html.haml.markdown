---
title: Add Custom Stylesheets to SharePoint 2013
date: 2014-03-28
tags: stylesheet, SharePoint 2013, CSS
---

Microsoft's documentation on adding custom stylesheets to a SharePoint site is 
terrible. Much of the information is merely incomplete or out of date. Some of 
the information is wrong. 

This is an attempt to provide better information.

READMORE

## Page Structure in SharePoint, According to Microsoft

Knowing the logic of a CMS' struture and markup is a fantastic way to supercharge
your CSS. But it only helps if the information you have is accurate.

There is a [wonderful page][1] that provides some insight in to the obscure 
class names used in SharePoint's HTML structure. Unfortunately, it is for 
SharePoint 2010 Foundation. No SharePoint 2013 version of the page has been 
created.

Still, that page doesn't tell you anything about best practices for storing 
custom stylesheets, or the prefered method for loading them.

## CssLink 

The Dev Center includes a short description of the [`CssLink` class][2]. This class
is used by SharePoint 2013 to include a `<link>` element into a HTML page. This 
sounds like it would do the job, right? 

**Well, I haven't tried it yet.** 

The information on the page references `Corev4.css`, which is the default 
stylesheet for SharePoint 2010. So, I'm not sure I trust the information on 
this page to be current.

The non-Microsoft article _Understanding SharePoint: CSSLink and how to add your
custom CSS in SharePoint 2010_ on [nothingbutsharepoint.com][3] shows that CssLink 
has been around since at least SharePoint 2010. The gist of this article is that
you don't use `CssLink` at all. Instead, just include a hardcoded `<link>` element
in your masterpage:

~~~
<link rel="stylesheet" type="text/css" href="/Style Library/INSERT_PATH.css" />
~~~

It is worth noting the path of the stylesheet in the example given by this article:
`/Style Library/INSERT_PATH.css`. It seems like a really logical place for stylesheets,
doesn't it? Just keep 'em all in the Style Library!

Unfortunately, in SharePoint 2013, spaces in folder and file names (like `Style 
Library`) don't get URI encoded. Instead, they keep the line from being generated
at all! 

Addtionally, URI encoding it yourself (as `Style%20Library`) doesn't work either.
The `%` ends up being URI encoded, giving your the erroneous destination of 
`Style%2520Library`.

Aweseome.

[1]: http://msdn.microsoft.com/en-us/library/office/ms438349(v=office.14).aspx "Cascading Style Sheets Class Usage in SharePoint Foundation"
[2]: http://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.webcontrols.csslink(v=office.15).aspx "CssLink class"
[3]: https://www.nothingbutsharepoint.com/sites/eusp/Pages/Understanding-SharePoint-CSSLink-and-how-to-add-your-custom-CSS-in-SharePoint-2010.aspx "Understanding SharePoint: CSSLink and how to add your custom CSS in SharePoint 2010"
