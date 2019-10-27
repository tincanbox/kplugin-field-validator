
function fn1(){
  return 1 + 1;
}

function fn2(){
  return 4 + 4;
}

var module = FM.fn.pack([fn1, fn2]);

result = module.fn2();
