---
layout: post
title: How to get Kinect Data into Processing
categories: [tech, processing]
---

The Kinect is an awesome tool to get skeleton data. [Processing](http://processing.org) is an awesome tool for creating visualizations. It is only natural to wonder what one can do with Kinect data inside of processing. If you are on Windows, you are in luck. The Kinect for Windows SDK is available and there are instructions on [OpenNI.org](http://www.openni.org/) which should help you get started. If you are instead on linux or a mac (like me), follow these instructions to get started.

I decided to use OSC messages to send data to processing. There are at least 3 ways to get osc messages into it. One which is the easiest is to use [Synapse for Kinect](http://synapsekinect.tumblr.com/). Synapse is a standalone app which will send osc messages about joint positions. The problem I had with Synapse was I could not figure out if it was sending user information so I was only able to use one skeleton at a time. Another way is to use [jit-openni](http://hidale.com/jit-openni/) which can send OSC messages through MaxMSP. This is less useful for me since it adds a dependency on MaxMSP which we don't need. Although maybe it will be useful for someone else who wants to use it. The third is to use [OSCeleton](https://github.com/Sensebloom/OSCeleton). OSCeleton sends skeleton data for multiple users as OSC messages. Exactly what I need.

OSCeleton has four requirements for it to work properly.
* libusb
* OpenNI SDK v1.5.4.0
* OpenNI-Compliant Sensor Driver v5.1.2.1
* NiTE v1.5.2.21

The instructions for installing are a little outdated and confusing, but this is what I did to get things to work.

The first thing I did was to check `brew`. [Homebrew](https://github.com/mxcl/homebrew) is my favorite package manager for osx. It keeps everything nice and tidy. It also has libfreenect and libusb. So it makes installation of those two packages a breeze. To read data from the Kinect sensor, we need libusb.

{% highlight bash %}
$ brew install libusb --universal
{% endhighlight %}

After installing libusb, the first mistake I made was to try to install OpenNI 2.1. Apparently with version 2.0 of OpenNI support for the Kinect was removed from os x because the Kinect for Windows SDK was more tightly integrated into the project. There are a few attempts to build OpenNI 2.1 with [libfreenect](https://github.com/OpenKinect/libfreenect) such as [OpenNI2-FreenectDriver](https://github.com/piedar/OpenNI2-FreenectDriver), but I decided to go with the older versions of OpenNI. You can download those versions from here: [http://www.openni.org/openni-sdk/openni-sdk-history-2](http://www.openni.org/openni-sdk/openni-sdk-history-2). This is where you can download `OpenNI SDK v1.5.4.0`, `OpenNI-Compliant Sensor Driver v5.1.2.1`, and `NiTE v1.5.2.21`. Alternatively you can download the source for each, build it and install. In each file that you download is an `install.sh` script that you need to run as root to install the required software.

Once all the dependencies are installed, plug in your kinect and run osceleton. I posted the code I use to parse the osc messages on github: [ProcessingKinectOSC](https://github.com/cketcham/ProcessingKinectOSC)
