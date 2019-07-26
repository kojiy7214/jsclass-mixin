[![Build Status](https://travis-ci.org/kojiy7214/jsclass-mixin.svg?branch=master)](https://travis-ci.org/kojiy7214/jsclass-mixin)

# jsclass-mixin
Mixin JavaScript ES6 based classes made easy &amp; simple.

## What Make "jsclass-mixin" Unique
Among other mixin libraries, jsclass-mixin focuses on sticking to ES6 class
defining style, thous archiving high level code readability.
Code says more than thousand words.

```
  class Base{
    constructor(a, b){};
  };

  class MixA{
    constructor(a, b){};
    hello(){
      console.log("I am MixA");
    }
  };

  class MixB{
    constructor(c, d){}};
  };

  class MixinSample extends mix(Base, MixA, MixB){
    constructor(a, b, c, d){
      //calling Base constructor
      super(a, b);

      //calling Mixin classes' constructor
      MixA.new(a, b);
      MixB.new(c, d);
    };
  }
```

## How to Use
Just extend your class using mix function.

## Some Notes
### Method "new()" is Attached Automatically
To archive high level code readability, jsclass-mixin offers a constructor alternative.
So developers are able to control mixin classes initialization sequence, and confirm it
at a glance within his/her class constructor.
The constructor alternative method, "new()" is attached as a static method of
mixin classes.  Developer can pass a set of arguments as s/he defined in the
original constructor to initialize the class as it was originally designed.

## Function Ready
"jsclass-mixin" mixies not only properties, but also functions from mixin
classes.

## No Limitation and Assumption
Developer can use any class as mixin class.  Developers does not need to design
special class for mixin, "jsclass-mixin" accepts any/every ES6 class!

## "instanceof" Works
Mixed classes can now test with normal instanceof operator.

```
  class MixinSample extends mix(Base, MixA, MixB){
  }

  let obj = new MixinSample();

  //below codes return true
  obj instanceof Base;
  obj instanceof MixA;
  obj instanceof MixB;
```

## "super" Alternative for Mixed Class (update@0.1.6)
While it is not possible to access mixed classes over-ridden methods using super
key word, jsclass-mixin provides alternative way to it.
You can use mixed property to access mixed classes overriden method.

```
  class MixinSample extends mix(Base, MixA, MixB){
    hello(){
      console.log("I am MixinSample");
    }
  }

  let obj = new MixinSample();

  obj.hello();
  > I am MixinSample

  //access over-ridden method this way
  obj.mixed.hello();
  > I am MixA
```
