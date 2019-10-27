var data = {
  name: 'john',
  age: 3
}

result = [
  // Ambigious
  FM.ob.valid(data, {name: ['string']}),
  FM.ob.valid(data, {age: ['string']}),
  // Strict
  FM.ob.valid(data, {name: ['string']}, true),
  FM.ob.valid(data, {name: ['string'], age: ['integer']}, true),
]
