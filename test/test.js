const assert = require('assert');
const mix = require('../../jsclass-mixin')


describe('Basic mixin test', function() {
  describe('mix with classes', function() {
    it('#test()', function() {
      class A {
        constructor(arg) {
          this.a1 = arg;
          this.a2 = function() {
            "I am constructor defined function!"
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
        }
      }

      let c = new C();

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

      let a = new A();
      assert.equal(a instanceof A, true);

    })
  })
})