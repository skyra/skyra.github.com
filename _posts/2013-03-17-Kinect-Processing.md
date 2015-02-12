---
layout: post
title: How to setup Microsoft Kinect on OS X 10.10 with Processing
category: blog
tags: [tech, processing]
---

The Kinect is an awesome tool to get skeleton data. [Processing](http://processing.org) is an awesome tool for creating visualizations. Combined they can be used to make cool interactive visualizations.

Since OpenNI has been taken down, the best source I've found for setting up the kinect is here: [http://blog.nelga.com/setup-microsoft-kinect-on-mac-os-x-10-9-mavericks/](http://blog.nelga.com/setup-microsoft-kinect-on-mac-os-x-10-9-mavericks/)

Once everything is installed, you can use [OSCeleton](https://github.com/Sensebloom/OSCeleton) to send OSC messages to processing.

You can use [OSCeletonWrapper](https://github.com/cketcham/OSCeletonWrapper) to help read those messages in processing.

more info [here]({% post_url 2013-09-22-OSCeletonWrapper %})
