import Submodule from '../interface/Submodule';

declare var $: any;
declare var _: any;

export default class __Debug extends Submodule {

  constructor(c, opt = {}){
    super(c, opt);
  }

  /* Object
   */
  init(){
  }

  log(o){
    console.log("[" + (this.core.option["namespace"] || "kluginn") + "]", o);
  }

};
