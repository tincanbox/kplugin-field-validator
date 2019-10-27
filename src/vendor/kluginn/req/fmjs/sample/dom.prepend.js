sample = function(){
  FM.dom.prepend('#codesnap-dom_prepend-title', '<span id="dom_prepend_prepended">>>> </span>').length
}

revert = function(){
  FM.dom.remove('#dom_prepend_prepended');
}
