// CodeSnap
//
// Author: Matooy
//
(function(root, factory){
  'use strict';

  factory.namespace = "CodeSnap";

  // Exposure!!
  ;((typeof exports) === "object" && (typeof module) === "object")
    ? (module.exports = factory())
    : (
      (typeof define === "function" && define.amd)
        ? define([], factory)
        : (root[factory.namespace] = factory())
      );

})(this, e = function(){

  function CodeSnap(O){

    this.config = { // Defaults

      // Prefix for element classes.
      prefix    : O.prefix   || 'codesnap-'

      // ID of element
      , wrapper   : O.wrapper  || null

      // base URL for sample files.
      , dir       : O.dir      || 'sample'

      // Sample files. [{title:, description:, param:}]
      , files     : O.files    || []

      , show_index: true

      // Callbacks
      , events    : {
        before_load : (O.events && O.events.before_load) || function(f, text){ return f; }
        , loaded      : (O.events && O.events.loaded)   || function(f, text){ console.log("CodeSnap> "+ (info(f).name) +" loaded."); }
        , indexed     : (O.events && O.events.indexed)  || function(wrapper, anchor){ wrapper.appendChild(anchor); }
      }

      //
      , format: {
        title: associated(O, 'format.title')
        ? O.format.title
        : "<p>{{title}}</p>"
        , description: associated(O, 'format.description')
        ? O.format.description
        : "<div>{{description}}</div>"
      }
    }

    // Surrogaion
    var C = this.config;

    //
    function associated(o, refstr){
      var s = (refstr || "").split(".")
        , k = s.shift() ;
      return (o.hasOwnProperty(k))
        ? associated(o[k], s.join("."))
        : (refstr ? false : true);
    }

    function prepare_GUI(){
      var wrp = C.wrapper ? document.getElementById(C.wrapper) : document.body;
      if(C.show_index){
        var id = C.prefix + 'index';
        var el = document.getElementById(id);
        if(el){
        }else{
          el = document.createElement('div');
          el.setAttribute('id', id);
          wrp.appendChild(el);
        }
      }
    }

    //
    function prepare_GUI_for_file(f){
      var file = info(f);
      var wrp = C.wrapper ? document.getElementById(C.wrapper) : document.body;
      var ind = document.getElementById(C.prefix + 'index');
      var el = document.getElementById(C.prefix + file.name);
      if(!el){
        el = document.createElement('div');
        el.setAttribute('id', C.prefix + file.name);
        el.setAttribute('class', C.prefix + 'container');
        wrp.appendChild(el);
      }
      if(C.show_index && ind){
        var anc = document.createElement('a');
        anc.setAttribute('href', '#' + C.prefix + file.name);
        anc.setAttribute('class', C.prefix + 'index-anchor');
        anc.innerHTML = file.name;
        C.events.indexed(ind, anc, file);
      }
      var title = document.createElement('div');
      title.setAttribute('id', C.prefix + file.name + '-title');
      title.setAttribute('class', C.prefix + 'title');
      title.innerHTML = file.title || file.name;
      el.appendChild(title);
      var description = document.createElement('div');
      (file.description) && (function(){
        description.setAttribute('id', C.prefix + file.name + '-description');
        description.setAttribute('class', C.prefix + 'description');
        description.innerHTML = file.description;
        el.appendChild(description);
      })();
      var pre = document.createElement('pre');
      pre.setAttribute('id', C.prefix + file.name + '-pre');
      pre.setAttribute('class', C.prefix + 'pre');
      var code = document.createElement('code');
      code.setAttribute('id', C.prefix + file.name + '-code');
      code.setAttribute('class', C.prefix + 'code');
      pre.appendChild(code);
      el.appendChild(pre);
    }

    // preview :: String -> String -> Nothing
    function preview(f, src){
      var file = info(f);
      var wrap = document.getElementById(C.prefix + file.name);
      var pre = document.getElementById(C.prefix + file.name + '-pre');
      var code = document.getElementById(C.prefix + file.name + '-code');
      if(code){
        code.innerHTML = src;
      }
      try{
        (new Function("'use strict'; " + src))(file.param || {});
        (file.callback.complete) && file.callback.complete(file);
      }catch(e){
        console.error("[CodeSnap] Error occured in " + file.name + ' => "'+e.message+'"');
        wrap.className = wrap.className + ' codesnap-exception';
        pre.className = pre.className + ' codesnap-exception';
        pre.title = '[CodeSnap] ' + e.message;
        (file.callback.error) && file.callback.error(e, file);
      }
    }

    // load :: Object -> Closure -> XMLHttpRequest
    function load(param, c){
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
          c(xhr.responseText);
        }
      }
      xhr.open('GET', param.url, true);
      xhr.send(null);
      return xhr;
    }

    // load_sorce :: String -> Closure -> XMLHttpRequest
    function load_sorce(url, done){
      return load({
        url: url
      }, done);
    }

    // make_source_url :: String -> String
    function make_source_url(f){
      return C.dir + '/' + info(f).name + '.js';
    }

    function is_a(v){
      return toString.call(v) === '[object Array]';
    }

    function info(v){
      var isa = is_a(v);
      return {
        name: isa ? v[0] : v
        , title: isa
        ? (v[1] && v[1].hasOwnProperty('title')?v[1].title:"") : ""
        , description: isa
        ? (v[1] && v[1].hasOwnProperty('description')?v[1].description:"") : ""
        , param: isa
        ? (v[1] && v[1].hasOwnProperty('param')?v[1].param:null) : null
        , callback: {
          complete: isa
          ? (v[2] && v[2].hasOwnProperty('complete')&&typeof v[2]['complete'] === 'function'?v[2]['complete']:null)
          : null
          , error : isa
          ? (v[2] && v[2].hasOwnProperty('error')&&typeof v[2]['error'] === 'function'?v[2]['error']:null)
          : null
        }
      }
    }

    // fitering_file :: a -> Closure
    function fitering_file(file){
      var t = toString.call(file);
      return function(v, i){
        var fname = is_a(v) ? v[0] : v;
        switch (t) {
          case '[object Array]': return file.indexOf(fname) > -1;
          default: return fname === file;
        }
      }
    }


    this.load = function(file){
      (prepare_GUI());
      ((file)
        ? C.files.filter(this.filtering_file(file))
        : C.files
      ).map(function(v, i){
        v = (typeof v === 'string') ? [v] : v;
        prepare_GUI_for_file(v);
        load_sorce(make_source_url(v), function(res){
          var file = info(v);
          var rv = C.events.before_load(file, res);
          preview(v, res);
          C.events.loaded(file, res, rv);
        });
      });
    }


  }

  return CodeSnap;

});
