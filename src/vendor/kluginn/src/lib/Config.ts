import Submodule from '../interface/Submodule';

declare var $: any;
declare var _: any;
declare var FM: any;


export default class __Config extends Submodule {

  $form: any;
  selector: {[key:string]: string};

  constructor(c, opt = {}){
    super(c, opt);
    this.selector = {
      "form_input_class": "plugin-data"
    }
  }

  /* Object
   */
  init(){
    this.$form = this.$('.js-submit-settings');
    this.update_form();
  }


  /*
   *
   * ( p:Object = Object for setConfig(p) param.
   * ) -> Promise
   */
  save(p){
    var self = this;
    return new self.$k.Promise(function(res, rej){
      var sv = FM.ob.merge({}, p);
      try{
        sv.json = JSON.stringify(sv.json || {});
        self.$k.plugin.app.setConfig(sv, function(r){
          res(r);
        });
      }catch(e){
        rej(e);
      }
    });
  }

  /* getConfig() して config の内容を更新するだけ。
   *
   * ( void
   * ) -> Nothing
   */
  fetch(){
    var c = this.core.$k.plugin.app.getConfig(this.core.plugin_id)
    c.json = c.json ? JSON.parse(c.json) : {};
    return c;
  }

  /* fetch で config の内容を更新したうえで、
   * 呼ぶだけのショートカット
   *
   * ( void
   * ) -> Nothing
   */
  update_form(){
    console.log("Updating form");
    this.update_input(this.fetch());
  }

  /* name[%form_input_class%] を持つ全要素に対して、
   * val() で値の更新をかける。主に fetch とのセット用。
   *
   * ( void
   * ) -> Nothing
   */
  update_input(o){
    var self = this;
    for(var k in o){
      self.core.$('[name="' + k + '"]').val(o[k]);
    }
  }


  /* form_input_class(default: plugin-data) に設定された要素を全取得し、
   * val() で取得した値をObjectにまとめて返す
   *
   * ( void
   * ) -> Object
   */
  retrieve_form_data(){
    var self = this;
    var data = {};
    self.core.$("." + self.selector.form_input_class).each(function(i, el){
      var $el = self.core.$(el);
      var nm = $el.attr("name");
      data[nm] = $el.val();
    });
    return data;
  }

};
