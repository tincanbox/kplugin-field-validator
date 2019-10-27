function Sample(){}
Sample.prototype.value = 123;
var data = {value: 123};

result = [
  FM.ob.has(data, 'value'),
  FM.ob.has(new Sample, 'value')
]
