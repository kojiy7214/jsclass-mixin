'use strict'

const assert = require('assert');
const mix = require('../../jsclass-mixin')


describe('Basic mixin test', function() {
  describe('mix with classes', function() {
    it('#test()', function() {
      class A {
        constructor(arg) {
          this.a1 = arg;
          this.a2 = function() {
            console.log("I am constructor defined function!" + this.a1);
          };
        }

        testA() {
          console.log("I am testA")
        };
      }

      class B {
        constructor() {
          this.b = "B";
        }

        testB() {
          console.log("I am testB")
        };
      }

      class D {};

      class C extends mix(B, A, D) {
        constructor() {
          super();
          A.new("a");
          this.a2 = function() {
            console.log("over ridden!" + this.a1);
          }
        }
      }

      class E extends mix(B, A, D) {
        constructor() {
          super();
          A.new("a");
        }
      }

      let c = new C();
      let e = new E();

      assert.notEqual(A.new, undefined);
      assert.equal(c.a1, "a");
      assert.notEqual(c.testA, undefined);
      assert.notEqual(c.testB, undefined);
      assert.notEqual(c.a2, undefined);
      assert.notEqual(c.isMixedWith, undefined);
      assert.equal(c.isMixedWith(B), false);
      assert.equal(c instanceof B, true);
      assert.equal(c.isMixedWith(A), true);
      assert.equal(c instanceof A, true);
      assert.equal(c.isMixedWith(D), true);
      assert.equal(c instanceof D, true);

      assert.equal(e.a1, "a");
      assert.notEqual(e.testA, undefined);
      assert.notEqual(e.testB, undefined);
      assert.notEqual(c.a2, undefined);
      assert.notEqual(e.isMixedWith, undefined);
      assert.equal(c.isMixedWith(B), false);
      assert.equal(e instanceof B, true);
      assert.equal(c.isMixedWith(A), true);
      assert.equal(e instanceof A, true);
      assert.equal(c.isMixedWith(D), true);
      assert.equal(e instanceof D, true);

      let a = new A();
      assert.equal(a instanceof A, true);

      c.a2();
      c.mixed.a2();

    })
  })
})