result = [
  // Original HTML...
  // &lt;div>&lt;h1>Trim&lt;/h1>&lt;p>Trim this&lt;/p>&lt;/div>
  FM.html.escape(FM.html.trim("<div><h1>Trim</h1><p>Trim this</p></div>", "p"))
];
