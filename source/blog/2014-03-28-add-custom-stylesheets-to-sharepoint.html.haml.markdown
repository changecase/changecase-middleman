---
title: Add Custom Stylesheets to SharePoint 2013
title_image: typewriter_apart.min.jpg
date: 2014-03-28
tags: stylesheet, SharePoint 2013, CSS, master page
description: Learn how to add custom stylesheets to SharePoint 2013 master pages.
alias: blog/2014/04/28/add-custom-stylesheets-to-sharepoint.html
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

## Upload Your Stylesheet

In order to include your stylesheet, you'll have to upload it.

The best place for your stylesheet is the **Style Library**. After all, the 
default description of the Style Library is:

<blockquote>
Use the style library to store style sheets, such as CSS or XSL files. The 
style sheets in this gallery can be used by this site or any of its subsites.
</blockquote>

You can find the Style Library in the **Site Contents** of your root site, 
`http://[YOURSITEURL]/_layouts/15/viewlsts.aspx`.

Upload your stylesheet (we'll call ours `custom.css` in this example), and let's 
move on to including it.

## Include Your Stylesheet with CssRegistration 

First off, it is a really good idea to be working off of a custom master page 
for edits to your SharePoint deployment of this nature. At the very least, backup
the master page you are currently using.

In this example, we'll work off a modified version of **seattle.master**. We'll
call it **portland.master**.

### Find the Stylesheets Already Registered

Both the master page seattle.master and the master page we based off of it, 
portland.master already reference a stylesheet:

~~~html
<SharePoint:CssRegistration Name="Themable/corev15.css" runat="server" />
~~~

Let's break this down.

All of the elements of a SharePoint master page are listed and nested in XML. 
This element is a self-closing `<SharePoint:CssRegistration />` control. It 
allows you to list the stylesheets SharePoint should use when it renders a page.

The `Name` attribute provides the filepath to the stylesheet. The default 
stylesheet is located in `Themable/corev15.css`. 

The `runat` attribute tells SharePoint how to use the file referenced by the 
control. In this case, it is using the file at the server (`runat="server"`), 
compiling all the stylesheets into a single file.

Now that we know a bit about CssRegistration, it is time to register your own 
stylesheet. We're going to have to do two things to get this working:

<ol>
<li>Add another CssRegistration for your stylesheet.</li>
<li>Give each of the CssRegistration controls a unique ID.</li>
</ol>

### Register Your StyleSheet

Since we don't want to keep the default stylesheet from being used, we don't 
want to just change the path of the current CssRegistration control to our new
stylesheet.

Instead, we're going to add a new CssRegistration control:

~~~html
<SharePoint:CssRegistration Name="<% $SPUrl:~SiteCollection/Style Library/custom.css%>" runat="server" />                                                                           
~~~

Notice that funky path in the `Name` attribute. This allows us to include an 
updated relative url to the path of our stylesheet. This method will allow us 
to reference the same stylesheet from anywhere in the site collection.

Just change `custom.css` to the name of your css file.

It is important that our new CssRegistration control is _after_ the default one.
This will allow our style rules to cascade appropriately.

This section of portland.master now looks like this:

~~~html
<SharePoint:CssRegistration Name="Themable/corev15.css" runat="server" />
<SharePoint:CssRegistration Name="<% $SPUrl:~SiteCollection/Style Library/custom.css%>" runat="server" />
~~~

### Give Each CssRegistration Control a Unique ID

In order for SharePoint to appropriately include each of the registered stylesheets,
each control needs to have its own unique ID attribute:

~~~html
<SharePoint:CssRegistration ID="CssRegistration1" Name="Themable/corev15.css" runat="server" />
<SharePoint:CssRegistration ID="CssRegistration2" Name="<% $SPUrl:~SiteCollection/Style Library/custom.css%>" runat="server" />
~~~

## Upload the Updated Master Page

Now, just upload your master page (and make sure it is the default master page) 
and your custom css will be included!

[1]: http://msdn.microsoft.com/en-us/library/office/ms438349(v=office.14).aspx "Cascading Style Sheets Class Usage in SharePoint Foundation"
[2]: http://msdn.microsoft.com/en-us/library/office/microsoft.sharepoint.webcontrols.csslink(v=office.15).aspx "CssLink class"
[3]: https://www.nothingbutsharepoint.com/sites/eusp/Pages/Understanding-SharePoint-CSSLink-and-how-to-add-your-custom-CSS-in-SharePoint-2010.aspx "Understanding SharePoint: CSSLink and how to add your custom CSS in SharePoint 2010"
