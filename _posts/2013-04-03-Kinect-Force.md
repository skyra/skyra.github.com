---
layout: post
title: Kinect Force
category: blog
tags: [tech, processing, kinect]
excerpt: Particle physics meets skeleton tracking.
video: KLACA8kUFCc
---

Building upon my last post about [Kinect and Processing]({% post_url 2013-03-17-Kinect-Processing %}), I decided it would be fun to add some particle systems to a sketch that could be controlled by the user's skeleton. I ended up picking [toxiclibs.org](http://toxiclibs.org/) since it seemed to be the most fully featured library for using physics and having particles interact.

I set up a simple particle system with various forces and added some attraction to the hands. This was the result.

{% assign video_id="KLACA8kUFCc" %}
{% include youtube.html %}

If you are interested in trying it out yourself, get the OSCeletonWrapper processing library and the code for this example here: [https://github.com/cketcham/kinect_force](https://github.com/cketcham/kinect_force)
