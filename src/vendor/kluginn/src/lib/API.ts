import Submodule from '../interface/Submodule'
declare var $: any;
declare var _: any;

export default class __API extends Submodule {

  constructor(c, opt = {}){
    super(c, opt)
  }

  request(method:string, url:string, param:object){
    console.log("API Request[" + method + "]", url);
    var self = this;
    return self.$k.api(
      self.$k.api.url(url, true),
      method.toUpperCase(),
      param ? (self.$.extend({app: self.$k.app.getId()}, param || {})) : null
    );
  }

  error_handler(r:{[key:string]:any}){
    return new Promise(function(res, rej){
      console.log("PLUGIN API ERROR", r);
      switch(r.code){
        // Error: The app %% not found
        case "GAIA_AP01":
          break;
        default:
          break;
      }
      return rej(r);
    });
  }

  /*
   */
  fetch(path, opt = {}){
    return this.request('get', '/k/v1/' + path, opt);
  }


  /*----------------------------------------------
   * Aliases
   *----------------------------------------------
   */

}
