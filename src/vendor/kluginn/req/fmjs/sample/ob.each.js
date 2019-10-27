var data = {
  id: 1,
  name: 'Sample',
}

FM.ob.each(data, function(key, value, o){
  o[key] = value + 'ADDED';
});

result = data;
