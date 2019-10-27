result = [
  FM.dom.html(
    '#codesnap-dom_html-description',
    'SAMPLE: ' + FM.dom.html('#codesnap-dom_html-description').shift()
  ).length,
  FM.dom.html('#codesnap-dom_html-title')
]
