import Submodule from '../interface/Submodule';

declare var $: any;
declare var _: any;
declare var Papa: any;
declare var FM: any;

export default class _csv extends Submodule {

  constructor(c, opt = {}){
    super(c, opt);
  }

  /* Object
   */
  init(){
  }

  parse(content, prm){
    return new Promise(function(rs, rj){
      var p = Papa.parse(content, FM.ob.merge({
        error: (err) => {
          rj(err);
        },
        complete: (result) => {
          rs(result);
        }
      }, prm));
    });
  }

};
