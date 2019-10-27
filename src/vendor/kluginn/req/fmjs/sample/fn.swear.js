
var s1 = FM.fn.promise();
var s2 = FM.fn.promise();

s1.then(function(){
  console.log('[fn.swear] s1 done');
});

s2.then(function(){
  console.log('[fn.swear] s2 done');
})

setTimeout(function(){
  s1.resolve(1);
}, 1000);

setTimeout(function(){
  s2.resolve(2);
}, 2000);

var s = FM.fn.swear(s1, s2).then(function(r1, r2){
  console.log('[fn.swear] Your oath was bound.', r1, r2);
});
