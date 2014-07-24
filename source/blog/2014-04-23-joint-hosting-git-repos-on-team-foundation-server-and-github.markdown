---
title: Joint Hosting Git Repos on Team Foundation Server and Github
title_image: into_the_fog.min.jpg
date: 2014-04-23
tags: git, github, microsoft, team foundation server, tfs, visual studio online
description: 
  Learn how to use git and Team Foundation Server for hosting your code in
  multiple repositories.
alias: blog/2014/04/23/joint-hosting-git-repos-on-team-foundation-server-and-github.html
---

Sometimes it is useful to host your code repositories in two different places. 
This is most likely to happen when you are working on a project that mixes 
Microsoft and open-source technology. Luckily, Microsoft's cloud code hosting 
platform Team Foundation Server (aka, Visual Studio Online) has finally 
implimented [git](http://git-scm.com/) integration!

The steps are easy, but there are a _lot_ of them.

READMORE

## Connect TFS to Your Microsoft Account

If you don't already have a Visual Studio Online account, you'll have to [create one][1].
In order to do that, you'll need to have a [Microsoft live account][2].

## Create a New Project Repository on TFS

Once you are signed into your Visual Studio Online account, create a new project.
Give it whatever **Project name**, **Description**, and **Process template** you
want, but make sure you set the **Version control** to **Git**.

## Clone the TFS Repo

In order to actually start coding, you'll have to clone the (currently empty) 
code repository.

You can clone the repo by either connecting with Team Explorer (via the Visual 
Studio desktop application) or by command line.

### Connecting with Team Explorer

Assuming you have access to a Windows machine with some flavor of Visual Studio
2013 installed, hit the big **Open with Visual Studio to connect** button on 
the new project confirmation page. 

If you'd prefer your connection to initate from Visual Studio, open the **TEAM** 
menu in Visual Studio and select **Connect to Team Foundation Server...**. 

Either way, the connection will be the same.

After you've connected, you can select your code repository (called a "Project"
in Visual Studio) and clone it. This will allow you to start coding in Visual
Studio.

The big advantage to doing your development work in Visual Studio when hosting 
your repository on Visual Studio Online is that you get access to the issues 
list that your team creates via the web-based Team Explorer or through Project
Server. Additionally, the auto-complete feature in IDEs like Visual Studio can 
be useful when trying to write code in a language you are unfamiliar with.  

### Connect via Command Line

To connect via command line, just clone your repo. In order to do that though, 
you'll need to enable basic authentication.

#### Enable Basic Authentication

Head back to Visual Studio Online and click on your account user name in order
to access your user profile. You'll be presented with the information on the 
**General** tab by default. 

Switch over to the **Credentials** tab.

Once on the **Credentials** tab, click **Enable alternate credentials** and 
create a password for alternate authentication credential access. 

It is also a good idea to set up a secondary user name. Git uses `https` to 
acccess the TFS repository, so you'll be saving yourself a lot of headache if 
your secondary user name doesn't include spaces or the @ symbol.

Once you've enabled alternate credentials, you can clone your repo:

~~~ bash
# Clone the repo.
# Replace USERNAME with your Visual Studio Online user name.
# Replace REPOSITORY with the name of your new Visual Studio Online repo.
# Replace DESTINATIONPATH with the location on your local machine for your local repo.
git clone https://USERNAME.visualstudio.com/DefaultCollection/_git/REPOSITORY DESTINATIONPATH

# Name the remote "microsoft", just to keep things straight.
git remote rename origin microsoft
~~~

If you've already started your project, you can push upstream: 

~~~ bash
git remote add microsoft https://USERNAME.visualstudio.com/DefaultCollection/_git/REPOSITORY
git push -u microsoft --all
~~~

Now you can use the usual `git push` and `git pull` process with the `microsoft`
remote to manage your changes on the Visual Studio Online repository.

## Create a New Repository on Github

To connect your local repository to github, do the same thing you always do:

1. Create a [new repository](https://github.com/new)
2. Create a new remote: `git remote add github https://github.com/USERNAME/REPOSITORY.git`
3. Push upstream `git push -u github master`

And you're done!

[1]: http://www.visualstudio.com/get-started/connect-to-vs
[2]: https://signup.live.com/signup.aspx
