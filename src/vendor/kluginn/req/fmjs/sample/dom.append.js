sample = function(){
  FM.dom.append('#codesnap-dom_append-title', '<span id="dom_append_appended"> <<<</span>').length
}

revert = function(){
  FM.dom.remove('#dom_append_appended');
}
