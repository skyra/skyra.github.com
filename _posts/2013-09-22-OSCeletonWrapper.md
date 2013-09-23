---
layout: post
title: OSCeletonWrapper
category: blog
tags: [tech, processing, kinect]
excerpt: [OSCeletonWrapper](https://github.com/cketcham/OSCeletonWrapper) is a processing library which wraps OSCeleton and makes it easy to use Skeleton data inside processing. Look here if you are just getting started with the kinect.
---

#### Getting Started
[OSCeletonWrapper](https://github.com/cketcham/OSCeletonWrapper) is a processing library which wraps OSCeleton and makes it easy to use Skeleton data inside processing. The easiest way to install [OSCeletonWrapper](https://github.com/cketcham/OSCeletonWrapper) is clone the repo into the processing library directory. The user library directory is inside the libraries folder in your sketch directory. Use this command to clone the repo:

{% highlight java %}
git clone https://github.com/cketcham/OSCeletonWrapper
{% endhighlight %}
   
or download a zip file from here:  [https://github.com/cketcham/OSCeletonWrapper/archive/master.zip](https://github.com/cketcham/OSCeletonWrapper/archive/master.zip)

#### Examples
In order to use this library with your kinect, you will need OSCeleton set up and sending messages. Information on how to get everything working can be found here: [How to get Kinect Data into Processing]({% post_url 2013-03-17-Kinect-Processing %}).

Two examples are included with this library
* [kinect_force](https://github.com/cketcham/kinect_force)
* [DrawingTree](https://github.com/cketcham/DrawingTree)

More information about both can be found here:
* [Kinect Force]({% post_url 2013-04-03-Kinect-Force %})
* [Life as a Tree]({% post_url 2013-04-05-Life-of-a-Tree %})
* [Tree Generation in Processing]({% post_url 2013-03-10-Processing-Tree-Generation %})