(function(k, factory) {
  'use strict';

  factory(new Kluginn.default());

})(kintone, function(p){

  var K = p;
  var $ = K.$;

  // "C"onfig
  var C = {
    // Tabulator configs
    // @see http://tabulator.info/docs
    column: [
      {
        title:"Name", field:"name",
        width:150, editor: 'input',
        validator: ["required"]
      },
      {
        title:"Target", field:"target",
        width:150, editor: 'select',
        editorParams: {
          values: function(row){
            var vals = {};
            var ks = Object.keys(S.properties).sort();
            for(var k of ks){
              var p = S.properties[k];
              vals[p.code] = p.code + " ["+p.type+"]"
            }
            return vals;
          },
        },
        validator: ["required"]
      },
      {
        title:"Type", field:"type",
        width:150, editor: 'select',
        editorParams: {
          values: [
            "presence",
            "format", "length",
            "email", "url", "zipcode", "phonenumber",
            "date", "datetime",
            "equality", "type",
            "exclusion", "inclusion",
            "custom"
          ]
        },
        validator: ["required"]
      },
      {
        title:"Message", field:"message",
        editor: 'input',
        validator: []
      },
      {
        title:"Param", field:"param",
        formatter: 'textarea', editor: 'textarea',
        validator: []
      },
      {
        formatter: function(cell, formatterParams, onRendered){
          return '<i class="fa fa-trash-alt"></i>';
        },
        width:40, align:"center",
        cellClick: function(e, cell){
          K.dialog({
            type: 'warning',
            text: 'Deleting Config Row',
            showConfirmButton: true,
            showCancelButton: true
          }).then(function(e){
            if(e.value){
              cell.getRow().delete();
            }
          });
        }
      }

    ]
  };

  // "S"torage
  var S = {
    config: {}
  };

  // "A"ction
  var A = {
    'click': {
      // Help popup
      'show-help': function(){
        K.dialog({
          title: 'Help',
          html: K.ui.render('help')()
        });
      },
      // default table action
      'config-table-add-row': function(e){
        S.table.addRow();
      },
      // default table action
      'config-table-save': function(){
        var c = K.config.retrieve_form_data();
        c.json = c.json || {};
        c.json.table = S.table.getData();
        c.json.table = c.json.table.filter(function(r){
          var any = false;
          for(var k in r){
            if(r[k]){
              any = true;
              break;
            }
          }
          return any;
        });
        validate(c)
          .then(function(){
            K.config.save(c).then(function(){
              K.dialog({
                title: "Yay!!",
                text: "Your data was correctly saved."
              });
              init_config_table();
            });
          })
          .catch(validation_error);
      },
      'config-table-download': function(){
        S.table.download("csv", "kplugin-config-data.csv");
      },
      'config-table-upload': function(){
        K.file.select()
          .then(function(r){
            return K.file.read(r.input.files[0], 'text');
          })
          .then(function(r){
            return K.csv.parse(r.file.result, {
              header: true
            });
          })
          .then(function(r){
            S.table.setData([]);
            S.table.setData(r.data);
          });
      }
    }
  };


  /* Procedures below.
   */


  Promise.all([
    // Do your prerequisities.

    K.api.fetch('app/form/fields')

  ]).then(function(e){
    S.properties = e[0].properties;
    K.init().then(main);
  });

  // Main hook after kintone and Kluginn were initialized.
  function main(){
    init_config_table();
    K.ui.bind_action(A);
  }

  /* validation func on save
   * ( data
   * ) => Promise
   */
  function validate(data){
    return new Promise(function(res, rej){
      res(data);
    });
  }

  function validation_error(r){
    throw new Error("validation failed");
  }

  /* wrapper func for table
   * ( void
   * ) => void
   */
  function init_config_table(){
    load_config();
    build_table();
  }

  /* Just loads $k.config
   * ( void
   * ) => Object
   */
  function load_config(){
    S.config = K.config.fetch();
    return S.config;
  }

  /* Builds config table and replace S.table prop.
   */
  function build_table(){
    S.table = new Tabulator("#config-table", {
      data: S.config.json.table || [],
      columns: C.column.map(function(e){
        e.downloadTitle = e.field;
        return e;
      }),
      //fit columns to width of table
      layout: "fitColumns",
      //hide columns that dont fit on the table
      responsiveLayout: "hide",
      //show tool tips on cells
      tooltips: true,
      //when adding a new row, add it to the top of the table
      addRowPos: "top",
      //allow undo and redo actions on the table
      history: true,
      //paginate the data
      pagination: "local",
      //allow 7 rows per page of data
      paginationSize: 10,
      //allow column order to be changed
      movableColumns: true,
      //allow row order to be changed
      resizableRows: true,
      /* set height of table (in CSS or here),
       * this enables the Virtual DOM and
       * improves render speed dramatically (can be any valid css height value)
       */
      height: 360
    });
  }

});
