---
title: Fix SharePoint 2013's Broken &ldquo;Add an App&rdquo; Feature in Oslo
title_image: tube.min.jpg
date: 2014-04-07
tags: SharePoint 2013, Oslo, loading, add an app
description: Learn how to make Oslo's default Add an App feature work.
alias: blog/2014/04/07/fix-sharepoint-2013s-broken-add-an-app-feature-in-oslo.html
---

Oslo, one of the default themes in SharePoint 2013 is broken. 

Just about every SharePoint user is going to need to create a new List or 
Library at some point. In SharePoint 2013, the new term Microsoft is using to 
refer to these objects is "App."

If you try to **Add an App** when you are using the Oslo Master Page, SharePoint
will show that it is loading... but never resolve.

But do not fret, it can be fixed.

READMORE

## What the $@*! is Happening?

If you take a look at the console (hit `F12` in IE or open the DevTools in 
Chrome or Firefox), you see an error message:

~~~ javascript
SCRIPT5007: Unable to get value of the property 'className': object is null or undefined 
ScriptResource.axd?d=xnE4ulS576DyEnvtLEA19xcWq47ZTil7CRTUvxz4cCuU1tAzjdVaH5trosHwlwFZJ7r0Hwqj5_K0u7bFvztQvwDttJ7g2NN1z2L42VUDf-jS7PDHDbCzwV8NKCqeGOrTEf0D7RsrVa_yaXSK-eC_Y6s6-vIhQA-7mlM6Dg09QH3uOw_p6tCs_D4tjAjBEAzh0&t=ca758f3, line 5 character 59249
~~~

One of the loading Javascript functions is failing to find a value for `className`.
In other words, our generated HTML is missing a neccessary class.

SharePoint 2013 requires several controls in order to function propperly, 
**DeltaPlaceHolderLeftNavBar**, **PlaceHolderLeftNavBar**, 
**DeltaPlaceHolderPageTitleInTitleArea**, and **PlaceHolderPageTitleInTitleArea**.
In order to get them to render HTML, they need to _not_ be set to `Visible=False`.

This is what Olso ships with:

~~~ html
<div class="ms-tableCell ms-verticalAlignTop">
  <div id="sideNavBox" class="ms-dialogHidden ms-forceWrap ms-noList">
    <a id="startNavigation" name="startNavigation" tabIndex="-1">
    </a>
    <!--SPM:<SharePoint:AjaxDelta id="DeltaPlaceHolderLeftNavBar" Visible="false" class="ms-core-navigation ms-belltown-sideNavDelta" BlockElement="true" runat="server">-->
    <!--SPM:<asp:ContentPlaceHolder id="PlaceHolderLeftNavBar" Visible="false" runat="server">-->
    <!--SPM:<asp:ContentPlaceHolder id="PlaceHolderLeftNavBarTop" Visible="false" runat="server">-->
    <!--SPM:<asp:ContentPlaceHolder id="PlaceHolderQuickLaunchTop" Visible="false" runat="server">-->
    <!--SPM:<asp:ContentPlaceHolder id="PlaceHolderLeftNavBarDataSource" Visible="false" runat="server">-->
    <!--SPM:<asp:ContentPlaceHolder id="PlaceHolderCalendarNavigator" Visible="false" runat="server">-->
    <!--SPM:<asp:ContentPlaceHolder id="PlaceHolderLeftActions" Visible="false" runat="server">-->
    <!--SPM:<asp:ContentPlaceHolder id="PlaceHolderQuickLaunchBottom" Visible="false" runat="server">-->
    <!--SPM:</asp:ContentPlaceHolder>-->
    <!--SPM:</SharePoint:AjaxDelta>-->
  </div>
</div>
<div id="contentBox" class="ms-pub-contentLayout" aria-live="polite" aria-relevant="all">
  <a id="mainContent" name="mainContent" tabindex="-1">
  </a>
  <h1 id="pageContentTitle" class="ms-belltown-pageName ms-noWrap ms-dialogHidden">
    <!--SPM:<SharePoint:AjaxDelta id="DeltaPlaceHolderPageTitleInTitleArea" runat="server">-->
    <!--SPM:<asp:ContentPlaceHolder id="PlaceHolderPageTitleInTitleArea" runat="server">-->
    <!--SPM:<SharePoint:SPTitleBreadcrumb runat="server" RenderCurrentNodeAsLink="true" SiteMapProvider="SPContentMapProvider" WelcomePageUsesWebTitle="false">-->
    <!--SPM:<PATHSEPARATORTEMPLATE>-->
    <!--SPM:<SharePoint:ClusteredDirectionalSeparatorArrow runat="server"/>-->
    <!--SPM:</PATHSEPARATORTEMPLATE>-->
    <!--SPM:</SharePoint:SPTitleBreadcrumb>-->
    <!--SPM:</asp:ContentPlaceHolder>-->
    <!--SPM:</SharePoint:AjaxDelta>-->
  </h1>
~~~

Notice the `Visible="false"` attributes on some controls and the lack of a `Visible`
attribute on other controls.

## The Fix

Knowing the requirements of SharePoint makes the fix quite self-evident: 

~~~ html
<div class="ms-tableCell ms-verticalAlignTop">
  <div id="sideNavBox" class="ms-dialogHidden ms-forceWrap ms-noList">
    <a id="startNavigation" name="startNavigation" tabIndex="-1">
    </a>
    <!--SPM:<SharePoint:AjaxDelta id="DeltaPlaceHolderLeftNavBar" Visible="true" class="ms-core-navigation ms-belltown-sideNavDelta" BlockElement="true" runat="server">-->
    <!--SPM:<asp:ContentPlaceHolder id="PlaceHolderLeftNavBar" Visible="true" runat="server">-->
    <!--SPM:<asp:ContentPlaceHolder id="PlaceHolderLeftNavBarTop" Visible="true" runat="server">-->
    <!--SPM:<asp:ContentPlaceHolder id="PlaceHolderQuickLaunchTop" Visible="true" runat="server">-->
    <!--SPM:<asp:ContentPlaceHolder id="PlaceHolderLeftNavBarDataSource" Visible="true" runat="server">-->
    <!--SPM:<asp:ContentPlaceHolder id="PlaceHolderCalendarNavigator" Visible="true" runat="server">-->
    <!--SPM:<asp:ContentPlaceHolder id="PlaceHolderLeftActions" Visible="true" runat="server">-->
    <!--SPM:<asp:ContentPlaceHolder id="PlaceHolderQuickLaunchBottom" Visible="true" runat="server">-->
    <!--SPM:</asp:ContentPlaceHolder>-->
    <!--SPM:</SharePoint:AjaxDelta>-->
  </div>
</div>
<div id="contentBox" class="ms-pub-contentLayout" aria-live="polite" aria-relevant="all">
  <a id="mainContent" name="mainContent" tabindex="-1">
  </a>
  <h1 id="pageContentTitle" class="ms-belltown-pageName ms-noWrap ms-dialogHidden">
    <!--SPM:<SharePoint:AjaxDelta id="DeltaPlaceHolderPageTitleInTitleArea" Visible="true" runat="server">-->
    <!--SPM:<asp:ContentPlaceHolder id="PlaceHolderPageTitleInTitleArea" Visible="true" runat="server">-->
    <!--SPM:<SharePoint:SPTitleBreadcrumb Visible="true" runat="server" RenderCurrentNodeAsLink="true" SiteMapProvider="SPContentMapProvider" WelcomePageUsesWebTitle="false">-->
    <!--SPM:<PATHSEPARATORTEMPLATE>-->
    <!--SPM:<SharePoint:ClusteredDirectionalSeparatorArrow Visible="true" runat="server"/>-->
    <!--SPM:</PATHSEPARATORTEMPLATE>-->
    <!--SPM:</SharePoint:SPTitleBreadcrumb>-->
    <!--SPM:</asp:ContentPlaceHolder>-->
    <!--SPM:</SharePoint:AjaxDelta>-->
  </h1>
~~~

The **Add an App** page will load now. You'll see a small app menu over on the 
Left Nav quicklaunch.
