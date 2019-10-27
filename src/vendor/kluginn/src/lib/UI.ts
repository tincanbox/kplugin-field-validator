import Submodule from '../interface/Submodule'

declare var $: any;
declare var _: any;

export default class __UI extends Submodule {

  action: {[s:string]: Function};

  constructor(c, opt = {}){
    super(c, opt)
  }

  /*
   */
  bind_action(evm){
    var self = this;
    var atr = "data-action";
    var sel = '[' + atr + ']';
    console.log("applying", evm);

    /* {
     *   click: {
     *     "foo": function(){
     *     }
     *   },
     *   change: {
     *   }
     * }
     */
    for(var ev in evm){
      console.log("attaching event", ev);
      var evh = evm[ev];
      self.core.$(document).on(ev, sel, self.core.$.proxy(function(e){
        console.log("called", e);
        var $el = self.core.$(e.target);
        var evc = $el.attr(atr);
        if(evc in evh){
          evh[evc].apply($el, [e]);
        }else{
        }
      }, self.core));
    }

  }

  /*
   */
  render(template_id, attr){
    var t_el = document.getElementById('template:' + template_id);
    if(t_el){
      var comp = _.template(this.$(t_el).html());
      return attr ? comp(attr) : comp;
    }else{
      return "TEMPLATE ERROR";
    }
  }

}
