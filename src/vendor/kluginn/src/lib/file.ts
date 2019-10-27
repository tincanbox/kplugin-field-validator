import Submodule from '../interface/Submodule';

declare var $: any;
declare var _: any;

export default class _file extends Submodule {

  constructor(c, opt = {}){
    super(c, opt);
  }

  /* Object
   */
  init(){
  }

  select(){
    var self = this;
    // Create an input element
    return new Promise(function(res, rej){
      var input = document.createElement("input");
      input.type = "file";
      input.addEventListener("change", function(e){
        if(!(window.FileReader)){
          rej("FileReader is not supported!!");
        }
        if(!input.value || !input.files){
          rej("File is not selected.");
        }
        res({
          input: input,
          event: e
        });
      });
      input.dispatchEvent(new MouseEvent("click"));
    });
  }

  /* ( InputElement.files
   * ) => Promise
   */
  read(ifl, tp = "text"){
    return new Promise(function(res, rej){
      var f = new FileReader();
      f.onload = function(e){
        res({
          file: f,
          event: e
        });
      };
      f.onerror = function(e){
        rej(e);
      }
      f['readAs' + tp.charAt(0).toUpperCase() + tp.slice(1)](ifl);
    });
  }

};
