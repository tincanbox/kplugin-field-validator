var data = {
  id: 1,
  name: 'Sample',
}

result = FM.ob.filter(data, function(key, value, o){
  return FM.vr.valid(value, 'integer');
});
