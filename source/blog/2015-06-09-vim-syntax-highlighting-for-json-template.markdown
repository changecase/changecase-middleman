---
title: Vim Syntax Highlighting for JSON Template
title_image: winter_aurora.min.jpg
date: 2015-06-09
tags: vim, json, json-t, json template, squarespace, developer platform, vimrc, syntax highlighting
description: Create custom syntax highlighting for Squarespace's JSON-T files.
published: false

---

[JSON Template][JSONT] (aka, JSON-T or JSONT) is the templating language used
by Squarespace's Developer Platform for laying out custom blocks, collections,
and pages. It is a simplified templating language with a little bit of logic
baked in - &agrave; la [Handlebars], [Liquid], and the like. It operates on
[JSON] data similar to the way that [XSLT] operates on XML data to transform it
into a document. Unfortunately nobody seems to have created any vim syntax
highlighting plugins for JSON-T.

One reason for this is likely due the [lack of specified file extensions][JSONT_spec]. 
Squarespace uses five different extensions for their templates:

1. `.block`
2. `.list`
3. `.item`
4. `.page`
5. `.region`

Despite the variety of extensions, JSON-T is still JSON-T. It would be
redundant to maintain five seperate syntax files in order to cover each file
extension Squarespace uses. Instead, we'll use one file to describe the syntax
highlighting for JSON-T and our `.vimrc` file to declare the files that should
be highlighted.

## Enabling Highlighting via .vimrc

To make things easier to manage later, create a new autocommand group in your
`.vimrc` (often located at `~/.vimrc`). Let's name the group "squarespaceGroup"
and start off by making sure that it has been cleared.

~~~vimscript
augroup squarespaceGroup
  au!
augroup END
~~~

Then, we can set the filetype for each extension. Let's filter the filetype
setting by making sure the files are in the `sqs_template` folder.

~~~vimscript
augroup squarespaceGroup
  au!

  "set the filetype of Squarespace files
  autocmd BufNewFile,BufRead */sqs_template/*.block set ft=jsont
  autocmd BufNewFile,BufRead */sqs_template/*.list set ft=jsont
  autocmd BufNewFile,BufRead */sqs_template/*.item set ft=jsont
  autocmd BufNewFile,BufRead */sqs_template/*.page set ft=jsont
  autocmd BufNewFile,BufRead */sqs_template/*.region set ft=jsont
augroup END
~~~

Now, when the Squarespace template files are opened (or created), their
filetype will be set to **jsont**.

## Create a JSON-T Syntax File

Now comes the fun bit: making the template files actually syntax highlighted.
Start off by creating a new syntax file at `~/.vim/syntax/jsont.vim`. You'll
want to give it a header that includes the _Language_, _Maintainer_, _URL_, and
the date of the _Last Change_.

[JSONT]: http://jsont.squarespace.com/
[Handlebars]: http://handlebarsjs.com/
[Liquid]: http://liquidmarkup.org/
[JSON]: http://json.org/
[XSLT]: http://www.w3.org/TR/xslt
[JSONT_spec]: https://code.google.com/p/json-template/wiki/Reference
