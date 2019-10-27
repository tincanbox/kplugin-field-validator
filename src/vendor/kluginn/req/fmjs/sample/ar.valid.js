result = [
  FM.ar.valid([1, 2, 3], 'integer'),
  FM.ar.valid([2, 3, '4'], 'integer'),
  FM.ar.valid(['Foo', {bar: 1}, ['baz']], ['string', 'object', 'array'])
];
