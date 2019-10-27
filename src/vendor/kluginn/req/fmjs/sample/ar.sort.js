result = FM.ar.sort([{l:1}, {l:4}, {k:3}, {l:2}, {l:5}], function(n, m){
  return (n.l >= m.l
       ? 1
       : (n.l < m.l
         ? -1
         : false));
});
