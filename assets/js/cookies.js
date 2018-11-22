function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function deleteCookie(name, path, domain) {
  if (getCookie(name)){
    createCookie(name, "", -1, path, domain);
  }
}

function setLoginTxt(){
  var m = readCookie('user');
  var t, p;
  
  if(m=='registered'){
    t = 'Welcome back :)</br> Please log in below';
    p = 'To access the free learning tutorials, you need to register first.</br>Enter an email and password of your choice or select one of the social media options below.';
  }else{
    t = 'Welcome! Please log in below';
    p = 'To access the free tutorials, simply enter your email and password or click one of the social media options below.';
  }
  document.getElementById('titleX').innerHTML = t;
  document.getElementById('textX').innerHTML = p;
}
