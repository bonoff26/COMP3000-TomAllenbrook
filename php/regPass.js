


function checkPass() {
  document.getElementById("login").disabled = true;
  var password1 = document.getElementById('form-PasswordReg').value;
  var password2 = document.getElementById('form-PasswordRegConfirm').value;

  if(password1 == password2) {
    document.getElementById("login").disabled = false;
  }
  else {
    document.getElementById("login").disabled = true;
  }
}
