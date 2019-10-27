function Sample(){}
Sample.prototype.value = 123;
var data = {value: 123};

result = [
  FM.ob.know(data, 'value'),
  FM.ob.know(new Sample, 'value')
]
