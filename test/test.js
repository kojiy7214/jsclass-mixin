const assert = require('assert');
const mix = require('../../jsclass-mixin')


describe('Basic mixin test', function() {
  describe('mix with one class', function() {
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

      class C extends mix(B, A) {
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
      assert.equal(c.isMixedWith(A), true);
    })
  })
})