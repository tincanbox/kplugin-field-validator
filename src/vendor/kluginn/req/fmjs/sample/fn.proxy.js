var accessor = function(){
  return this.name;
};

var proxy = FM.fn.proxy(accessor, {name: 'I am FM.'});

result = proxy();
