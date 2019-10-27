declare var gapi : any
declare var FM : any

export default class GoogleAPI {

  ins: any
  config: {[key:string]: any}

  constructor(conf = {}){
    this.config = conf;
  }

  init(){

    this.ins = gapi;

    var p = FM.promise();
    var self = this;
    self.oauth(
      function(){
        self.ins.client.init(self.config);
        p.resolve();
      },
      function(){
        p.reject();
      }
    );
    return p;
  }

  oauth(success, fail){
    return this.ins.load('client:auth2', {
      callback: success,
      onerror: fail
    });
  }

  signin(){
    if(this.is_signedin()){
      return true;
    }else{
      return this.ins.auth2.getAuthInstance().signIn();
    }
  }

  is_signedin(){
    return this.ins.auth2 && this.ins.auth2.getAuthInstance().isSignedIn.get() ? true : false;
  }


}
