var iterable = FM.fn.partial(function(a, b){
  return a.map(b);
}, ['array', 'function']);

var mapper = iterable(FM.ar.range(1, 5));

result = [
  mapper(function(v){ return v + 2; }),
  mapper(function(v){ return v * 2; }),
];
