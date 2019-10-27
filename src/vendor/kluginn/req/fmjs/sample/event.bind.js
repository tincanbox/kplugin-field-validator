var btn = FM.dom.find('#button-event-A');
var data = {value: 1}

FM.event.bind(data, 'add', function(e, incr){
  this.value = incr(this.value) + 1;
});

FM.event.bind(btn, 'click.add', function(){
  FM.event.trigger(data, 'add', function(n){ return n + 3; });
  FM.dom.text(this, 'Current value is ' + data.value)
});
