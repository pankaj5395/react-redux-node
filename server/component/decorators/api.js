exports.Post = function(url='') {
  function actualPostDecorator(target, property, descriptor) {
    var actualFunction = descriptor.value;
    var decoratorFunc = function() {
      return actualFunction.call(this)
    }
    descriptor.value = decoratorFunc
    return descriptor
  }
  return actualPostDecorator
}
