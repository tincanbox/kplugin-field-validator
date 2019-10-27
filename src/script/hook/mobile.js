(function(k, factory) {
  'use strict';

  factory(new Kluginn.default());

})(kintone, function(p){

  var K = p;
  var $ = K.$;

  K.init().then(main);

  /* Put kintone-event listener on top level.
   *
   * K.$k.events.on()
   */

  function main(){
  }

});
