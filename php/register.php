<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" crossorigin="anonymous">

<link rel="stylesheet" href="../css/homepage.css">
<link rel="stylesheet" href="../css/login.css">
<script src="../javascript/background.js"></script>
<script src="regPass.js"></script>

<?php
include_once('navbar.php');
include_once('../javascript/p5.html');

?>

<body>
<div class="container">
    <div class="row">
        <div class="col-lg-10 col-xl-9 mx-auto">
            <div class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
                <div class="card-img-left d-none d-md-flex">
                    <!-- Background image for card set in CSS! -->
                </div>
                <div class="card-body p-4 p-sm-5">
                    <h5 class="card-title text-center mb-5 fw-light fs-5">Register</h5>
                    <form action = "process_registration.php" method="post" id="UserRegister">

                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInputUsername" name="form_usernameReg" placeholder="myusername" required autofocus>
                            <label for="floatingInputUsername">Username</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="floatingInputEmail" name="form-emailReg" placeholder="name@example.com">
                            <label for="floatingInputEmail">Email address</label>
                        </div>

                        <hr>

                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" id="floatingPassword" name="form-PasswordReg" placeholder="Password">
                            <label for="floatingPassword">Password</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" id="floatingPasswordConfirm" name="form-PasswordRegConfirm" placeholder="Confirm Password" oninput="checkPass();">
                            <label for="floatingPasswordConfirm">Confirm Password</label>
                        </div>

                        <div class="d-grid mb-2">
                            <button class="btn btn-lg btn-primary btn-login fw-bold text-uppercase" id="register" type="submit" disabled>Register</button>
                        </div>

                        <a class="d-block text-center mt-2 small" href="#">Have an account? Sign In</a>

                        <hr class="my-4">

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</body>