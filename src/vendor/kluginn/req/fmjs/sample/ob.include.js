var boy = {
  name: 'Wonderful Boy',
  age: '16'
}

function introduce(){
  return 'My name is ' + this.name;
}

FM.ob.include(boy, [introduce]);

result = boy.introduce();
