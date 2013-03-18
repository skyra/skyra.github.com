---
layout: post
title: How to get Kinect Data into Processing
categories: [blog, processing]
---

The Kinect is an awesome tool to get skeleton data. [Processing](http://processing.org) is an awesome tool for creating visualizations. It is only natural to wonder what one can do with Kinect data inside of processing. If you are on Windows, you are in luck. The Kinect for Windows SDK is available and there are instructions on [OpenNI.org](http://www.openni.org/) which should help you get started. If you are instead on a mac (like me), follow these instructions to get started.

I decided to use OSC messages to send data to processing. There are at least 3 ways to get osc messages into it. One which is the easiest is to use [Synapse for Kinect](http://synapsekinect.tumblr.com/). You can download that and it will send OSC messages about joint position. The problem I had with Synapse was I could not figure out if it was sending user information. So I was only able to use one skeleton at a time. Another way is to use [OSCeleton](https://github.com/Sensebloom/OSCeleton). OSCeleton sends skeleton data for multiple users as OSC messages. The third way is to use [jit-openni](http://hidale.com/jit-openni/) which can send OSC messages through MaxMSP. I choose the third way since jit-openni looks like it has the most recent development.

jit-openni has four requirements for it to work properly. You can download everything you need from the info page, but in case people are curious there are a few other ways to install the dependencies which I prefer.

The first thing I did was to check `brew`. [Homebrew](https://github.com/mxcl/homebrew) is my favorite package manager for osx. It keeps everything nice and tidy. It also has libfreenect and libusb. So it makes installation of those two packages a breeze. To read data from the Kinect sensor, we need libusb.

{% highlight bash %}
$ brew install libusb --universal
{% endhighlight %}

After installing libusb, the first mistake I made was to try to install OpenNI 2.1. Apparently with version 2.0 of OpenNI support for the Kinect was removed from os x because the Kinect for Windows SDK was more tightly integrated into the project. There are a few attempts to build OpenNI 2.1 with [libfreenect](https://github.com/OpenKinect/libfreenect) such as [OpenNI2-FreenectDriver](https://github.com/piedar/OpenNI2-FreenectDriver), but I decided to go with the older versions of OpenNI. You can download those versions from here: [http://www.openni.org/openni-sdk/openni-sdk-history-2](http://www.openni.org/openni-sdk/openni-sdk-history-2). You need `OpenNI SDK v1.5.4.0`, `OpenNI-Compliant Sensor Driver v5.1.2.1`, and `NiTE v1.5.2.21`. In each file that you download is an `install.sh` script that you need to run as root to install the required software.

Once all the dependencies are installed you can install jit-openni! It is a max patch which can easily be extended to send OSC messages using `udpsend`. This data can then be interpreted in processing using [oscp5](http://www.sojamo.de/libraries/oscP5/). Code will be posted shortly.
