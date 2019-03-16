---
title: Create QML Apps Without Qt Creator on OSX
cta_text: Learn how
title_image: Death_to_stock_Dinner_damo_3.min.jpg
date: 2015-12-31
tags: qml, qt, osx, vim, homebrew
published: true

---

I wanted to play around with QML, but I didn't see much point to installing an
IDE just to play. Plus, I prefer writing in Vim. Here's how I did it on OSX.

READMORE

Install QT5
-----------

Intending to play with the most up-to-date tech, I installed qt5 with homebrew.

~~~bash
brew update
brew install qt5
~~~

However, there seems to be a bit of an issue with the formula not building
**qmake** (a `make` for qml) or **qmlscene** (a rendering utility for QML
documents). To get around it, symlink `qt5` into the `~/Applications` directory
and the Homebrew prefix.

~~~bash
brew linkapps qt5
brew link --force qt5
~~~

Running `which qmake` and `which qmlscene` should each return a filepath now.

QT Projects
-----------

QT projects include backend logic in QT, a thin wrapper around C++.

### Create a Project File

Ultimately, each project needs a project file in order to build apps with
qmake. These files define some of the project settings and expectations.

Given a project file named `helloWord.pro`, you might start off with the following.

~~~bash
TEMPLATE += app
TARGET = HelloWorld
QT += core gui declarative
SOURCES += main.cpp
~~~

`*.cpp` files are where the actual application logic takes place.

In the above project file, the file `main.cpp` is defined as one of the source
files. Its contents might look like this: 

~~~qml
#include <QApplication>
#include <QPushButton>

int main(int argc, char **argv)
{
  QApplication app (argc, argv);

  QPushButton button ("Hello world!");
  button.show();

  return app.exec();
}
~~~

### Compile the Application

Create a makefile with `qmake` and then run `make` to compile the application.

~~~bash
qmake helloWorld.pro
make

open HelloWorld.app
~~~

I'm not yet sure how to incorporate a testing framework into this flow.


QML Files
---------

To build and run QML files, you don't need nearly as much structural overhead.

A QML file called `hello.qml` might look like this:

~~~qml
import QtQuick 2.0

Rectangle {
  id: root
  width: 600; height: 600
  color: "#D8D8D8"

  Text {
    width: root.width
    horizontalAlignment: Text.AlignHCenter
    text: 'Hello World'
  }
}
~~~

And you can run it with `qmlscene`.

~~~bash
qmlscene hello.qml
~~~
