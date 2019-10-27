result = [
  FM.vr.valid('123', 'integer'),
  FM.vr.valid(1.2, 'number'),
  FM.vr.valid([1, 2, 3], ['object', 'array'])
];
