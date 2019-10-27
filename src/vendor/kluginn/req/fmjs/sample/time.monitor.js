var m = FM.time.monitor(1800, function(p){
  (p === window.innerHeight)
    && console.log('[time.monitor] Window was resized and kept innerHeight 1.8sec');
});

window.addEventListener('resize', function(){
  m(window.innerHeight);
});
