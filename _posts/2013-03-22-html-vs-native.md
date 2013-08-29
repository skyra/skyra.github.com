---
layout: post
title: HTML5 apps vs Native Apps
category: blog
tag: tech
---

I've always felt a struggle between HTML5 apps, and native apps. There are many great apps which are written with HTML5 which use [Cordova](http://cordova.apache.org/), [jQuery Mobile](http://jquerymobile.com/), or just something like [Boostrap](http://twitter.github.com/bootstrap/). And there are equally great apps which were built for native phone clients. I think overall the choice of whether to write an app with HTML5 or to write a native app really depends on the app you want to write. But ignoring that, this is what I think about the HTML5 vs. native debate.

I'm an native android programmer so that probably plays into my bias, but I don't think an application written with HTML5 (the way we do now) can ever be as good as native applications since you can't take advantage of the design patterns for specific devices easily. And if you decide to invest the time to create a different experience for each device, you might as well have just built a native app in the first place!

I think it really comes down to the amount of time you can put into an app. HTML5 is nice since you don't need to put as much time into it since it will work on multiple devices. But since you don't put as much time into the app, it won't be as polished as it could be if you had spent the time making one app per device.

I think eventually another layer will be created that can create easily customizable interfaces on an individual level. There is less of a linkage between how the server and the clients behave since they can communicate using JSON messages or something similar. So multiple different clients can use the same server api to get the data. The problem is that the visualization is usually all on the client. 

Imagine there was another layer in between the data from the server and the client ui. It's a very similar idea to the way atom xml works for blogs. If you have an rss reader, you can read data from websites and blogs and it can be formatted any way the user wants since the xml specifies the structure of the data to be viewed, but the reader specifies how the ui should look. If there was something similar for apps, you could have a general device like and iPhone or Android or a desktop that would read data from an app, but it would automatically be formatted in a consistent way depending on the device. So as an app developer you would only have to develop the middle layer. You could take data from existing servers (or create new servers if you needed to) and format it in this universal app layer. Then device manufacturers (or the end user) would build in readers to the devices themselves which could handle any app written in this universal app layer. 

Although maybe this isn't possible though since applications can be so different.. unlike blog posts.

And maybe HTML5 will become this eventually. HTML5 has the capabilities to access different features of phones. All that is needed, is an app/reader/browser which will render the pages with native ui components and design.