


function checkPass() {
  document.getElementById("register").disabled = true;
  var password1 = document.getElementById('floatingPassword').value;
  var password2 = document.getElementById('floatingPasswordConfirm').value;

  if(password1 == password2) {
    document.getElementById("register").disabled = false;
  }
  else {
    document.getElementById("register").disabled = true;
  }
}
