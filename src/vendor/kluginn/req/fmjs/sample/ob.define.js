var john_generator = FM.ob.define({
  name: 'john'
});

var john20 = john_generator({
  age: 20
});

var john30 = john_generator({
  age: 30
});

result = [
  john20.name + " > " + john20.age,
  john30.name + " > " + john30.age
];
