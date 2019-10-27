import validator from '../../vendor/validate/validate.min.js';

(function(k, factory) {
  'use strict';

  factory(new Kluginn.default());

})(kintone, function(p){

  var K = p;
  var $ = K.$;
  var S = {
    config: K.config.fetch()
  };

  K.init().then(main);

  /* Put kintone-event listener on top level.
   *
   * K.$k.events.on()
   */
  K.$k.events.on([
    'app.record.index.submit',
    'app.record.create.submit',
    'app.record.edit.submit',
  ], function(e){
    var rc = e.record;
    var cj = S.config.json.table;
    if(!cj) return e;
    var f = {};

    try{
      /* formats validationg data. */
      var rc_f = {};
      for(var k in rc){
        rc_f[k] = rc[k].value;
      }
      /* generates validator's options */
      for(var a of cj){
        f = apply_type_validator(f, a);
      }
    }catch(e){
      console.error(
        "kplugin-field-validator", e.message
      );
    }

    var er = validator(rc_f, f);

    if(!er){
      // yay!! no error!!
    }else{
      var es = [];
      for(var k in er){
        rc[k].error = er[k].join(" & ");
        es.push(k);
      }
      e.error = "Errors(" + es.length + "): " + es.join(", ");
    }
    return e;
  });

  function main(){
  }

  function apply_type_validator(f, a){
    var tp = a.type;
    var tg = a.target;
    var o = f[tg] = f[tg] || {};

    switch(tp){
      case "phonenumber":
        o.format = {
          pattern: /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))*[)]?[-\.]?[(]?[0-9]{1,3}[)]?([-\.]?[0-9]{3})([-\.]?[0-9]{3,4})/
        };
        tp = 'format';
        break;
      case "zipcode":
        o.format = {
          pattern: /^\d{5}(-\d{4})?$/
        };
        tp = 'format';
        break;
      case "custom":
        if(a.param.length == 0){
          throw new Error("custom type should have valid param-JSON");
        }
        var j = JSON.parse(a.param);
        if(j instanceof Object){
          o = FM.ob.merge(o, j);
        }
        break;
      default:
        if(a.param.length){
          if(a.param.match(/^\//)){
            var sp = a.param.split(/[^\\]\//);
            var rx = sp[1].replace(/^\//, "");
            var ro = sp[2];

            if(a.type == 'format'){
            }else{
              o[tp] = true;
            }

            o.format = {
              pattern: new RegExp(rx, ro)
            };
          }else{
            o[tp] = JSON.parse(a.param);
          }
        }else{
          o[tp] = true;
        }
        break;
    }

    if(o[tp]){
      o[tp].message = function(val, attr, opt, data, gopt) {
        var tx = (a.message || '": " + value + " is not valid [" + type + "]"');
        var pr = FM.ob.merge({}, a, {
          value: val,
          field: a.target,
          attr: attr, opt: opt, data: data
        });
        var str = _.template('<%- ' + tx + '%>')(pr);
        return str;
      }
    }

    return f;
  }

});
