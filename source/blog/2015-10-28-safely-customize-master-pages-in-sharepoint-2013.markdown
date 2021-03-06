---
title: Safely Customize Master Pages in SharePoint 2013
cta_text: Learn how
title_image: DeathtoStock_London7.min.jpg
date: 2015-10-28
tags: SharePoint 2013, master page

---

It is all too easy to create headaches for yourself (or your team) when
customizing your SharePoint 2013 deployment. One source of these pains comes
from [directly editing master files][1]. Whether you are creating a custom
layout from scratch or modifying an existing one, take these steps to ensure
that you safely customize master pages in SharePoint 2013.

READMORE

## 1. Locate the Master Page

If you are customizing an existing layout, you'll need to find the existing
source files. Even if you are creating a custom layout from scratch, you'll
want to make sure you are uploading your files to the appropriate location.

You'll need more than the basic permissions to access the Master Page. If you
find you don't have access, talk to your site administrator.

You can navigate to the storeage of Master Pages through the SharePoint ribbon.
Click the **Settings** gear, and select **Site settings** from the dropdown
menu. You'll find yourself at the _Site Settings_ page.

If you have the permissions you need to create custom SharePoint 2013 layouts,
you'll see a **Web Designer Galleries** section. Click on **Master pages and
page layouts** to access all of your Master Pages. You can also get there using the following url:
`http://YOUR-SHAREPOINT-SITE-URL/_catalogs/masterpage/Forms/AllItems.aspx`

Download the HTML Master Page that you've applied to your SharePoint site and
open it up in your favorite text editor. If you work in SharePoint Designer or
Visual Studio, I'll assume you know how to navigate to your Master Page
already.

In this example we'll use the master page from the default SharePoint 2013 theme, 
Oslo: `oslo.html`. There are a few things to note here:

### Edit the Right File

There are very likely three files with similar names in the Master Page Gallery, 
`oslo.html`, `oslo.master`, and `oslo.preview`. You want `oslo.html`.

  - The file `oslo.master` will be regenerated by SharePoint when you upload
    your changes. This is the file that SharePoint actually references when
    doing the work to render your site's pages. Editing this file _will_ have
    an effect on the layout of your site. However, you risk loosing your
    customizations when SharePoint gets updated by Microsoft (even with "minor"
    updates like security fixes and performance gains).

    Since SharePoint doesn't expect Master Pages to be edited directly, you can
    create all kinds of issues for yourself down the road. Often, the source of
    these issues is difficult to track down.

    Instead, leave the *.master file alone.

  - The file `oslo.preview` is related to theming. It is a file neccessary for
    selecting your from the theme preview. It is of no concern to us in this
    specific discussion.

  - The file `oslo.html` is the source of the .master file. This is the file
    SharePoint expects to be edited. SharePoint will use changes made to this
    file to generate a new .master file later.

### Don't Make Changes to Default Files

Since we are going to be working on making changes to one of the default 
Master Pages, we risk breaking things terribly. Instead of making your changes 
in `oslo.html`, save your changes with a new filename. This way, you can always
revert back to `oslo.html` if neccessary.

This is a rule to hold to when working on anything with SharePoint. If you are 
making changes built off a default file, call your changed file something different.
Sure, you may have to go back and re-connect a few links when you do this, but 
that's better than bringing your whole site down when you update.

We'll call our new Master Page `copenhagen.html`. When we upload our changes, 
SharePoint will generate `copenhagen.master`.

### Use a Version Contol System

Using version control when editing and creating layouts in SharePoint is
[extremely useful][2]. SharePoint comes with [its own "versioning" system][4],
but don't rely on that system alone. Make sure you are using version control on
your local code as well.

My prefered version control system is [git with an offsite mirror of the repository][3], 
but other systems (like svn and TFS) are fine too. Just remember, 
_version control only works if you use it_.

## 2. Edit the Master Page

Make your edits (or create your own custom file). When you're done, save your changes.

## 3. Commit to Your Changes

Now, upload (or save) `copenhagen.html` back into the Master Page Gallery. 
When uploading the file, make sure to mark the file's **Type** as _HTML Master
Page_ and mark the checkbox for compatability with **15**. SharePoint will 
generate `copenhagen.master` for you.

If versioning has been turned on in your environment (and it should be!),
you'll have to **Publish a Major Version** of `copenhagen.html` in order to
apply your changes. After doing so, you'll be able to select and apply the
master page from the Design Manager.


[1]: http://sharepoint.stackexchange.com/questions/78037/is-it-totally-wrong-to-modify-the-seatle-master-page "Is it totally wrong to modify the Seattle.master page?"
[2]: http://stackoverflow.com/a/1408464/2719135 "Why should I use version control?"
[3]: /blog/2014/04/23/joint-hosting-git-repos-on-team-foundation-server-and-github "Keep a git repo on TFS and github"
[4]: https://support.office.com/en-us/article/Introduction-to-versioning-49e87cfa-1f18-427b-852b-7ff1612ef672 "Introduction to Versioning"

 
