---
layout: post
title: Tree Generation in Processing
categories: [tech, processing]
---

I'm working on a [processing](http://processing.org) sketch which generates trees of different heights randomly. I started from this sketch: [http://www.openprocessing.org/sketch/2235](http://www.openprocessing.org/sketch/2235). I like the way it looks, but I want something that will grow and is animatable.

Let's start from the main sketch code.

{% highlight java %}
Tree tree = new Tree();
 
void setup() {
  size(1024, 640, P2D);
  colorMode(RGB, 255);
  background(192);
  smooth(8);
}
 
void draw() {
}
 
void keyReleased() {
  background(192);
}
 
void mouseReleased() {
  tree = new Tree(mouseX, height, height-mouseY, 5);
  tree.render();
}
{% endhighlight %}

Since I want the sketch to be animatable, I need to set the rendering engine to `P2D`. Using this rendering engine leaves the lines a little jagged, so I also set the smoothness to 8 with `smooth(8)`. I also think the size of the drawing is a little small so I increase the size to 1024x640 so it's twice as big.

The way the drawing code works is that each time the mouse is clicked, a new tree is created and drawn to the screen. No other operations are done in the drawing loop. Since I want to be able to animate the motion of the tree, I have to be able to continuously draw the tree each frame, so I need to move the call `tree.render()` into the `draw()` function.

{% highlight java %}
void draw() {
  background(192);
  tree.render();
}
{% endhighlight %}

This makes it redraw the tree each time, but it is madness! Each frame, it will draw a new tree (with branches in different places) at the same x position on the screen. At 60 frames a second that is a lot of trees thrashing about! To prevent the code from generating a new random tree each frame, I need to use `randomSeed()`. By setting a seed, I am ensuring each successive call to `random()` will return random numbers in the same order. Here is the code for the tree which draws each frame using the same random numbers:

{% highlight java %}
class Tree {
  float x, y;
  float h;
  float steps;
  int seed;
   
  Tree() {
    x = 0;
    y = 0;
    h = 0;
    steps = 0;
    seed = int(random(0, 1000));
  }
   
  Tree(int x_, int y_, int h_, int s_) {
    x = x_;
    y = y_;
    h = map(h_, 0, height, 0, 160);
    steps = s_;
    seed = int(random(0, 1000));
  }
   
  void render() {
    randomSeed(seed);
    stroke(32);
    branch(x, y, -HALF_PI, h);
  }
   
  void branch(float x_, float y_, float a_, float s_) {
    strokeWeight(s_/16);
    float a = random(-PI/16, PI/16)+a_;
    float nx = cos(a)*s_+x_;
    float ny = sin(a)*s_+y_;
    stroke(32, 16*s_);
    line(x_, y_, nx, ny);
    if (s_>10) {
      branch(nx, ny, a_-random(PI/4), s_*random(0.6, 0.8));
      branch(nx, ny, a_, s_*random(0.6, 0.8));
      branch(nx, ny, a_+random(PI/4), s_*random(0.6, 0.8));
    } else {
      float w = random(155, 255);
      stroke(255, w, w, random(32, 192));
      strokeWeight(random(0, 8));
      point(nx+random(-2, 2), ny+random(-2, 2));
    }
  }
}
{% endhighlight %}

Ok cool, but I also want to be able to make the tree grow. For now I will link it to the vertical movement of the mouse. I can just change the height of the tree `h` in the `render()` function based on the `mouseY` variable. Here is the new function:

{% highlight java %}
void render() {
  randomSeed(seed);
  h = map(height-mouseY, 0, height, 0, 170);
  stroke(32);
  branch(x, y, -HALF_PI, h);
}
{% endhighlight %}

Uh oh. It almost works. When the mouse is not moving the same tree draws every frame, but when I move the mouse up and down to change the height of the tree, the branches move. Not what I want. This is caused because the tree is being drawn using recursion, i.e. depth first using the program stack. This means it draws the trunk, then draws the first branch, then draws that branches first branch all the way down to a leaf. Then it goes back up one step and draws the next leaf. Learn more about [Depth First Search](http://en.wikipedia.org/wiki/Depth-first_search) on Wikipedia! Since the order of the random calls is set using `randomSeed()` when it draws a bigger tree, the calls to `random()` on the smaller tree no longer apply to the same branches to the bigger tree, since it adds branches in the middle. I can fix this by changing the order of branch drawing to [Breadth First](http://en.wikipedia.org/wiki/Breadth-first_search). This will ensure that the random calls always apply to the same branches. Breadth first will draw the trunk, all of is branches, all of the branches' branches, etc until it gets to the final branches and all the leaves.

That brings me to the final code which I am going to use for now.

{% assign video_id="MiZYfwMA_Ao" %}
{% include youtube.html %}

treeSketch.pde
{% highlight java %}
Tree tree;
 
void setup() {
  size(1024, 640, P2D);
  colorMode(RGB, 255);
  background(192);
  smooth(8);
}
 
void draw() {
    background(192);
    if(tree != null)
      tree.render();
    frame.setTitle(frameRate + "fps");
}
 
void keyReleased() {
}
 
void mouseReleased() {
  tree = new Tree(mouseX, height, height-mouseY, 5);
}
{% endhighlight %}

Tree.pde
{% highlight java %}
class Tree {
  float x, y;
  float h;
  float steps;

  int seed;


  Tree() {
    x = 0;
    y = 0;
    h = 0;
    steps = 0;
    seed = int(random(0, 1000));
  }

  Tree(int x_, int y_, int h_, int s_) {
    x = x_;
    y = y_;
    h = map(h_, 0, height, 0, 160);
    steps = s_;
    seed = int(random(0, 1000));
  }

  void render() {
    randomSeed(seed);
    
    h = map(height-mouseY, 0, height, 0, 170);
    print(h + "\n");

    stroke(32);
    branch(x, y, -HALF_PI, h);
  }

  void branch(float x_, float y_, float a_, float s_) {

    branches.add(new Branch(x_, y_, a_, s_));

    while(branches.size() > 0) {
      
      Branch b = branches.get(0);
      branches.remove(0);
      
      strokeWeight(b.s/16);
      float a = random(-PI/16, PI/16)+b.a;
      float nx = cos(a)*b.s+b.x;
      float ny = sin(a)*b.s+b.y;
      stroke(32, 16*b.s);
        line(b.x, b.y, nx, ny);
  
      if (b.s>10) {
        branches.add(new Branch(nx, ny, b.a-random(PI/4), b.s*random(0.6, 0.8)));
        branches.add(new Branch(nx, ny, b.a, b.s*random(0.6, 0.8)));
        branches.add(new Branch(nx, ny, b.a+random(PI/4), b.s*random(0.6, 0.8)));
      } 
      else {
        float w = random(155, 255);
        stroke(255, w, w, random(32, 192));
        strokeWeight(random(0, 8));
        float offx = random(-2, 2);
        float offy = random(-2, 2);
        point(nx+offx, ny+offy);
      }
    }
  }
  
  class Branch {
     float x, y, a, s;
     public Branch(float x_, float y_, float a_, float s_) {
       x = x_;
       y = y_;
       a = a_;
       s = s_;
     }
  }

  ArrayList<Branch> branches = new ArrayList<Branch> ();
}
{% endhighlight %}

The last thing I need to fix is the drawing of the blossoms since they are constantly jumping around. This is caused by the same problem I experienced when drawing the branches. I could just set another random seed before I draw the leaves to ensure they are always drawn the same way like the branches are. But for now I like what I've done.
