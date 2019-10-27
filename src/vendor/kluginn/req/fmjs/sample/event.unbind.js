var btn1 = FM.dom.find('#button-event-unbind-1');
var btn2 = FM.dom.find('#button-event-unbind-2');
var btn3 = FM.dom.find('#button-event-unbind-3');

var bound = 0;

FM.event.bind(btn2, 'click.bind', function(){
  bound++;
  FM.event.bind(btn1, 'click.action', function(){
    console.log('Bound:' + bound);
  });
});

FM.event.bind(btn3, 'click.unbind', function(){
  FM.event.unbind(btn1, 'click.action');
});
