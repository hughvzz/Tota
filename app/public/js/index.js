function signUpUser(user) {
  $.post("/api/signup", {
    email: user.email,
    password: user.password
  }).then(function(data) {
    window.location.replace(data);
    // If there's an error, log the error
  }).catch(handleLoginErr);
}

function handleLoginErr(err) {
  $("#alert .msg").text(err.responseJSON);
  $("#alert").fadeIn(500);
}

$("#sendRegisterForm").on("click", function() {
  event.preventDefault();
  var email = $("#emailInput").val().trim();
  var password = $("#passwordInput").val().trim();
  console.log(name);
  var newUser = {
    email: email,
    password: password
  }

  if (!newUser.email || !newUser.password) {
    return;
  }

  signUpUser(newUser);
  $("#emailInput").val("");
  $("#passwordInput").val("");
});

function loginUser(login) {
  $.post("/api/login", {
    email: login.email,
    password: login.password
  }).then(function(data) {
    window.location.replace(data);
    // If there's an error, log the error
  }).catch(function(err) {
    console.log(err);
  });
}


$("#sendLogin").on("click", function() {
  event.preventDefault();
  var email = $("#emailInputLogin").val().trim();
  var password = $("#passwordInputLogin").val().trim();
  var login = {
    email: email,
    password: password
  }

  if (!login.email || !login.password) {
    return;
  }

  loginUser(login)
  $("#emailInputLogin").val("");
  $("#passwordInputLogin").val("");
});

$("#registerBtn").on("click", function() {
  $("#registroModal").modal("show");
});

$("#loginBtn").on("click", function() {
  $("#loginModal").modal("show");
})