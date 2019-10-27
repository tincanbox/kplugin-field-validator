import Config from './lib/Config';
import API from './lib/API';
import UI from './lib/UI';
import Debug from './lib/Debug';
import _file from './lib/file';
import _csv from './lib/csv';

import Service_GoogleAPI from './lib/service/GoogleAPI';

declare var jQuery: any;
declare var kintone: any;
declare var Swal: any;
declare var FM: any;
declare var Papa: any;
declare var _: any;

export default class Kluginn {

  $: object;
  $k: {[key:string]: any};
  plugin_id: number;
  option: object;
  config: object;
  api: API;
  ui: UI;
  debug: Debug;
  file: _file;
  csv: _csv;
  vendor: object;
  service: object;
  external: object;

  constructor(option){

    if(!kintone){
      throw new Error("Kluginn only works with kintone !!");
    }

    this.$ = jQuery;
    this.$k = kintone;
    this.plugin_id = this.$k.$PLUGIN_ID;
    this.option = option;
    this.config = new Config(this);
    this.api = new API(this);
    this.ui = new UI(this);
    this.debug = new Debug(this);
    this.file = new _file(this);
    this.csv = new _csv(this);

    // vendor libraries
    this.vendor = {};
    this.vendor["jquery"] = jQuery;
    this.vendor["underscore"] = _;
    this.vendor["FM"] = FM;
    this.vendor["Swal"] = Swal;
    this.vendor["papaparse"] = Papa;

    // external services
    this.service = {};
    this.service["google"] = new Service_GoogleAPI();

    this.external = {
      "gapi": "https://apis.google.com/js/api.js"
    };

  }

  /*
   * ( opt:object
   * ) => Promise
   */
  init(opt = {}){
    var self = this;
    return new Promise(function(rs, rj){
      // Loades external files
      var ps = [];
      for(var n in self.external){
        ps.push(self.load(self.external[n]));
      }
      Promise.race(ps).then(rs).catch(rj);
    });
  }

  load(url){
    return new Promise(function(resolve, reject) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    })
  }

  dialog(a){
    var p;
    if(a instanceof Array){
      p = a;
    }else{
      p = [a];
    }
    p = p.map(function(r){
      r.customContainerClass = r.customContainerClass || 'BSTRP';
      return r;
    });
    return Swal.queue(p);
  }

}
