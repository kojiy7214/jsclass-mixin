module.exports = function(base, ...mixins) {
  let copyProperties = function(target = {}, source = {}) {
    const ownPropertyNames = Object.getOwnPropertyNames(source);

    ownPropertyNames
      .filter(key => !/(prototype|name|constructor)/.test(key))
      .forEach(key => {
        const desc = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc);
      });
  };

  let copyFunctions = function(target = {}, source = {}, bindto) {
    const ownPropertyNames = Object.getOwnPropertyNames(source);

    ownPropertyNames
      .filter(key => !/(prototype|name|constructor)/.test(key))
      .filter(key => source[key] instanceof Function)
      .forEach(key => {
        target[key] = source[key].bind(bindto);
      });
  };

  let retval = class VirtualBase extends base {
    constructor(...args) {
      super(...args);

      this.mixed = {};
      let that = this;

      for (let i in mixins) {
        let handler = {
          apply: function(target, thisobj, arglist) {
            copyProperties(that, mixins[i].prototype);
            copyFunctions(that.mixed, mixins[i].prototype, that);
            let obj = new mixins[i](...arglist);
            copyProperties(that, obj);
            copyFunctions(that.mixed, obj, that);
          }
        }

        let p = new Proxy(mixins[i], handler);
        mixins[i].new = p;

        let desc = Object.getOwnPropertyDescriptor(mixins[i], Symbol.hasInstance);

        if (!desc || desc.writable) {
          let original_instanceof = mixins[i][Symbol.hasInstance];

          Object.defineProperty(mixins[i], Symbol.hasInstance, {
            value: (o) => original_instanceof(o) || o instanceof VirtualBase || mixins[i].prototype.isPrototypeOf(o),
            writable: true
          });
        }
      }

      this.isMixedWith = (cl) => mixins.reduce(
        (p, c) => p || (cl === c || cl.isPrototypeOf(c)), false);
    }
  };

  return retval;
}