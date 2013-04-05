---
layout: post
title: Kinect Force
categories: [blog, processing]
---

Building upon my last post about Kinect and Processing ([http://skyra.github.com/blog/processing/Kinect-Processing/](http://skyra.github.com/blog/processing/Kinect-Processing/)), I decided it would be fun to add some particle systems to a sketch that could be controlled by the user's skeleton. I ended up picking [toxiclibs.org](http://toxiclibs.org/) since it seemed to be the most fully featured library for using physics and having particles interact.

I set up a simple particle system with various forces and added some attraction to the hands. This was the result.

{% assign video_id="KLACA8kUFCc" %}
{% include youtube.html %}

If you are interested in trying it out yourself, take a look at the source code. Take a look at the `kinect_force` example in the [ProcessingKinectOSC](https://github.com/cketcham/ProcessingKinectOSC) repository.

