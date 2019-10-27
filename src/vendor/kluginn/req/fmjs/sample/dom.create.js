var box = FM.dom.find('#codesnap-dom_create-description');

var el = FM.dom.create('div', {'id': 'dom-create-sample'}, 'dom.create() sample.');

FM.dom.style(el, {'background-color': '#aaddff'})

FM.dom.append(box, el);
