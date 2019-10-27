export default class Submodule {

  core: any;
  config: {[key:string]: any};
  option: {[key:string]: any};
  $k: any;
  $: any;

  constructor(c:any, opt:{[key:string]: any} = {}){
    this.core = c;
    this.$k = c.$k;
    this.$ = c.$;
    this.config = {};
    this.option = opt;
  }

}
