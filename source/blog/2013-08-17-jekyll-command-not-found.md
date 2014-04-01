---
title: Jekyll - Command Not Found
date: 2013-08-17
tags: jekyll, dreamhost, heroku
---

[Jekyll][], most of the time you're pretty awesome but sometimes you can be a real son-of-a-bitch.

I've got a dreamhost server and have been trying to use [this tutorial][tatey.com] to deploy Jekyll via git. Sure, at the end of the tutorial Tate Johnson recommends using a Rakefile and rsync for deployment, but I'm really keen on using git for both version control and deployment.

Basically, I want to turn dreamhost into Heroku.

READMORE

## Where Did Jekyll Go? ##

I've got nearly everything hooked up: all of the git stuff seems to be working fine, but when my bash script goes to build the site with jekyll, it balks.

## Potential Solution ##

Add quotes around the PATH string. Yeah... that wasn't it.

[Jekyll]: http://jekyllrb.com
[tatey.com]: http://tatey.com/2009/04/29/jekyll-meets-dreamhost-automated-deployment-for-jekyll-with-git/
