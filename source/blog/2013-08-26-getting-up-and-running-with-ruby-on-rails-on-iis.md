---
title: Getting Up and Running with Ruby on Rails on IIS
date: 2013-08-26
tags: IIS, RoR
---

After a mad dash the previous week to compose and deploy a significant number 
of changes to our website, I decided to try and get Ruby on Rails up and running 
on the production site.

I've been developing the site in HTML5 HAML for structure and backend processing, 
LESS for presentation management, and jQuery for client side processing. The main 
content of the pages are in Maruku flavored markdown in most cases (Textile is 
used for pages with elements that Maruku 0.61 flubbs... like nested lists). All 
of this allows me to build static pages that load really fast.

READMORE

I'd been considering moving out of HAML into Liquid templating goodness of Jekyll, 
but I'm getting some push back from my content writers. They don't know markdown, 
and don't have much interest in learning. 

Instead, they want a WYSIWYG.

So the plan: sacrifice the lean load-time of a static site in the short term with 
a dynamically generated site that will teach its users how to write in markdown.


Implimenting the Plan
---------------------

To get folks to buy into markdown, they'll need to learn to use it. However, 
only nerds like me use their free time to read documentation. So I'll make use 
of a database to hold the content of the site and make it editable. The editable 
text will be in markdown.

A few sites already do this in a super snappy way. 

* [Stackoverflow][1], for example has a really sweet integration of a markdown 
  editor and previewer as their question and answer platform.

  If you know markdown, you can just type away. As you type, a live preview is
  displayed below the text box.

  If you don't know markdown (or you've forgotten something), a helpful cheat 
  sheet is displayed next to the textbox. There are also automatic buttons that 
  will help you enter in just about everything you need: bold and italic text, 
  hyperlinks, blockquotes, code, images, ordered and unordered lists, top level 
  headings, and horizontal rules.

* [Github][2] is another site that does a fantastic job at teaching markdown 
  through use. You can choose the markup language you use, but markdown is the 
  default (and awesome anyway).

  Github's markdown editor gives you a plain text field for a title, and a 
  second text area box for the markdown content.

  Like Stackoverflow, github's content entry comes with helpful buttons (h1 
  through h3, links, images, bold, italic, code, unordered and ordered lists, 
  blockquotes, and horizontal rules) and a help guide.

In order to make it happen though, these sites need to be able to accept and 
store user content, which means they need a database.


The State the Server IIS In
---------------------------

The server of the current site is an offsite IIS 6.0 server. That means I have 
to get Ruby (and Rails) running on IIS. An old version of IIS.

The machine is already running a [Microsoft SQL Server][3] database, SQL Server 
2005 (SQL Server 9.0.5057). SQL Server is suppose to be a pretty awesome db 
system according to some of my co-workers. We are pretty well bought into the 
Microsoft stack, so using the Microsoft database is probably the best way to go 
(despite a [growing preference][4] for [PostgreSQL][5] in the open source 
[community][6]). Our Microsoft Project, SharePoint, and business intelligence 
tools are more likely to play well with SQL Server than other db systems.

Additionally, given the high cost of SQL Server, it is unlikely that I'll have 
a lot of opportunity to get experience with SQL Server on my own. So, SQL Server 
it is.

The machine that all of this sits on is (according to the system properties) a 
Microsoft Windows Server 2003 Enterprise Edition OS on Service Pack 2. I don't 
know why there's such a discrepency between the SQL Server stats and the actual 
machine, but this may be something that bites me in the future.


Cygwin
------

To do all of this work, I'll need a Unix-y commandline interface: [Cygwin][7].

Cygwin comes with the following packages installed:

- Admin

  - **libattr1** (2.4.46-1): Shared lib for managing filesystem extended attributes

- Archive

  - **liblzma5** (5.0.2_20110517-1): XZ and LZMA compression (runtime)
  - **xz** (5.0.2_20110517-1): XZ and LZMA compression (utilities)

- Base

  - **alternatives** (1.3.30c-10): A tool for managing package conflicts
  - **base-cygwin** (3.3-1): Initial base installation helper script
  - **base-files** (4.1-1): A set of important system configuration and setup 
    files
  - **bash** (4.1.10-4): The GNU Bourne Again SHell
  - **coreutils** (8.15-1): GNU core utilities (includes fileutils, sh-utils 
    and textutils)
  - **cygutils** (1.4.14-1): A collection of simple utilities (core collection)
  - **cygwin** (1.7.24-1): The UNIX emulation engine
  - **dash** (0.5.7-1): Dash shell
  - **dos2unix** (6.0.3-1): Line Break Conversion
  - **editrights** (1.01-2): Alter Windows user rights and privleges from 
    command line
  - **file** (5.11-1): Determines file type using 'magic' numbers
  - **findutils** (4.5.11-1): Utilities for finding files--find, xargs, locate, 
    updatedb
  - **gawk** (4.1.0-1): GNU awk, a pattern scanning and processing language
  - **grep** (2.6.3-1): Search and print textual input for lines which match a 
    specific pattern
  - **gzip** (1.4-1): The GNU compression utility
  - **ipc-utils** (1.0-1): XSI IPC maintainance utilities
  - **libreadline7** (6.1.2-3): GNU readline and history libraries (runtime)
  - **login** (1.10-10): Sign on to a system
  - **man** (1.6g-2): Man, apropos and whatis commands
  - **mintty** (1.1.3-1): Terminal emulator with native Windows look and feel
  - **rebase** (4.4.0-1): Utilities for rebasing DLLs to load at alternate 
    addresses
  - **run** (1.3.0-1): Launch cmdline programs with hidden console
  - **sed** (4.2.2-3): The GNU sed stream editor
  - **tar** (1.26-1): A GNU file archiving program
  - **terminfo** (5.7_20091114-14): Database for ncurses-style terminal handling
  - **tzcode** (2013c-1): The time zone package
  - **vim-minimal** (7.3.1152-1): Minimal Vi text editor
  - **which** (2.20-2): Prints out full path of executables
  - **zlib0** (1.2.8-1): Zlib de/compression library (runtime)

- Devel

  - **gettext** (0.18.1.1-2): GNU Internationalization library and core utilities
    (PLUS LINK LIBS)

- Doc

  - **man** (1.6g-2): Man, apropos and whatis commands

- Interpreters

  - **gawk** (4.1.0-1): GNU awk, a pattern scanning and processing language

- Libs

  - **gettext** (0.18.1.1-2): GNU Internationaliztion library and core utilities
    (PLUS LINK LIBS)
  - **libattr1** (2.4.46-1): Shared lib for managing filesystem extended attributes
  - **lbbz2_1** (1.0.6-2): A high-quality block-storing file compressor (runtime)
  - **libgcc1** (4.7.3-1): GCC C runtime library
  - **libgmp10** (5.1.2-1): Library for arbitary precision arithmetic (C runtime)
  - **libgmp3** (4.3.2-1): Runtime library for GMP arbitary precision arithmetic library
  - **libiconv2** (1.14-2): GNU character set conversion library and utilities 
    - runtime (1)
  - **libintl8** (0.18.1.1-2): GNU Internationalization runtime library
  - **liblzma5** (5.0.2_20110517-1): XZ and LZMA compression (runtime)
  - **libmpfr4** (3.1.2-1): A library for multiple-precision floating-point 
    arithmetic with exact rounding (runtime)
  - **libcurses10** (5.7-18): (runtime) libraries for terminal handling
  - **libcursesw10** (5.7-18): (runtime) libraries for terminal handling (wide 
    character support)
  - **libpcre0** (8.21-2): Perl-Compatible Regular Expressions library (C runtime)
  - **libpopt0** (1.6.4-4): Library for parsing cmdline parameters - runtime
  - **libreadline7** (6.1.2-3): GNU readline and history libraries (runtime)
  - **libstdc++6** (4.7.3-1): GCC C++ runtime library
  - **zlib0** (1.2.8-1): Zlib de/compression library (runtime)

- Math

  - **libgmp10** (5.1.2-1): Library for arbitary precision arithmetic (C runtime)
  - **libgmp3** (4.3.2-1): Runtime library for GMP arbitary precision arithmetic 
    library
  - **libmpfr4** (3.1.2-1): A library for multiple-precision floating-point 
    arithmetic with exact rounding (runtime)

- Shells

  - **bash** (4.1.10-4): The GNU Bourne Again SHell
  - **dash** (0.5.7-1): Dash shell
  - **mintty** (1.1.3-1): Terminal emulator with native Windows look and feel

- System

  - **libattr1** (2.4.46-1): Shared lib for managing filesystem extended attributes
  - **rebase** (4.4.0-1): Utilities for rebasing DLLs to load at alternate addresses
  - **tzcode** (2013c-1): The time zone package

- Text

  - **groff** (1.21-2): GNU troff text-formatting system
  - **less** (444-1): A file pager program, similar to more(1)

- Utils

  - **bzip2** (1.0.6-2): A high-quality block-sorting file compressor (utilities)
  - **diffutils** (3.2-1): A GNU collection of diff utilities
  - **file** (5.11-1): Determines file type using 'magic' numbers
  - **rebase** (4.4.0-1): Utilities for rebasing DLLs to load at alternate addresses
  - **which** (2.20-2): Prints out full path of executables

Because I'm pretty sure I'll need them, I'm also going to install the following 
packages:

- Web

  - **curl** (7.32.0-1): Multi-protocol file transfer tools
  - **wget** (1.13.4-1): Utility to retrieve files from the WWW via HTTP and FTP

Cygwin is getting installed into the cygwin directory at `C:\cygwin` and the 
packages are all going into `C:\Documents and Settings\Jeff Jacobson\Desktop`.


RVM
---

To manage the Rubies on the server, I plan to make use of [RVM][8]. The RVM 
website links to [this tutorial][9] for guidance on installing RVM on IIS.

There are a few more cygwin packages to install according to this, so I open 
the cygwin setup program back up and install the following:

- Archive

  - **unzip** (6.0-10): Info-ZIP decompression utility

- Devel

  - **colorgcc** (1.3.2-2): Colorizer for GCC warning/error messages
  - **gcc** (4.7.3-1): GNU Compiler Collection
  - **gcc-core** (4.7.3-1): GNU Compiler Collection (C, OpenMP)
  - **git** (1.7.9-1): Fast Version Control System - core files
  - **git-completion** (1.7.9-1): Fast Version Control System - git bash completion
  - **git-gui** (1.7.9-1): Fast Version Control System - git-gui viewer
  - **git-svn** (1.7.9-1): Fast Version Control System - git-svn conversions
  - **gitk** (1.7.9-1): Fast Version Control System - gitk viewer
  - **libtool** (2.4-1): A shared library generation tool
  - **libncurses-devel** (5.7-18): (devel) libraries for terminal handling
  - **make** (3.82.90-1): The GNU version of the 'make' utility
  - **mercurial** (2.5.2-1): Python based distributed version control system (DVCS)
  - **openssl-devel** (1.0.1e-2): The OpenSSL development environment
  - **readline** (6.1.2-3): GNU readline and history libraries

- Libs

  - **zlib** (1.2.8-1): Zlib de/compression library (documentation)
  - **zlib-devel** (1.2.8-1): Zlib de/compression library (development)

- Net

  - **openssh** (6.2p2-1): The OpenSSH server and client programs
  - **openssl** (1.0.1e-2): The OpenSSL base environment

- Utils

  - **ncurses** (5.7-18): Utilities for terminal handling
  - The guide mentions the need to use Patch. Since I don't see that with this 
    version of setup, I'm going to give the following two a try in the hopes 
    that one of them works:

    - **patcher** (0.0.20040521-1): Perl script To manage patches
    - **patchutils** (0.3.2-1): A small collectionof programs that operate on 
      patch files

    Hopefully, one of those works!

[1]: http://stackoverflow.com
[2]: http://github.com
[3]: http://www.microsoft.com/en-us/sqlserver/default.aspx
[4]: http://datachomp.com/archives/top-10-reasons-i-like-postgres-over-sql-server/
[5]: http://www.postgresql.org/
[6]: http://www.reddit.com/r/SQLServer/comments/1a87sp/your_boss_asks_you_to_justify_using_sql_server/
[7]: http://www.cygwin.com/
[8]: https://rvm.io/
[9]: http://blog.developwithpassion.com/2012/03/30/installing-rvm-with-cygwin-on-windows/
