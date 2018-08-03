* global moment * /

// When the page loads, grab and display all of our chirps
$.get("/api/all", function (data) {

  if (data.length !== 0) {

    for (var i = 0; i < data.length; i++) {

      var row = $("<div>");
      row.addClass("user");

      // row.append("<p>" + data[i].author + " chirped.. </p>");
      // row.append("<p>" + data[i].body + "</p>");


       // code added
      row.append("<p>" + data[i].firstName + "</p>");
      row.append("<p>" + data[i].lastName + "</p>");
      row.append("<p>" + data[i].email + "</p>");
      row.append("<p>" + data[i].address + "</p>");
      row.append("<p>" + data[i].address2 + "</p>");
      row.append("<p>" + data[i].city + "</p>");
      row.append("<p>" + data[i].state + "</p>");
      row.append("<p>" + data[i].zip + "</p>");
      row.append("<p>Date of Birth " + moment(data[i].dateOfBirth).format("dddd") + "</p>");

      // $("#chirp-area").prepend(row);

    }

  }

});



// When user is created (clicks addBtn)
$("#user-submit").on("click", function (event) {
  event.preventDefault();

  // Make a newChirp object
  var newUser = {
    // author: $("#author").val().trim(),
    // body: $("#chirp-box").val().trim(),
    // created_at: moment().format("YYYY-MM-DD HH:mm:ss")


     // code added
      firstName: $("#firstName").val().trim(),
     lastName:  $("#lastName").val().trim(),
     lastName:  $("#lastName").val().trim(),
     email: $("#email-input").val().trim(),
     address: $("#address-input").val().trim(),
     address2: $("#address2-input").val().trim(),
     city: $("#city-input").val().trim(),
     state: $("#state-input").val().trim(),
     zip: $("#zip-input").val().trim(),
     dateOfBirth: $("#dateOfBirth-input").val().trim().format("YYYY-MM-DD")
  };

  console.log(newUser);

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newUser)
    // On success, run the following code
    .then(function () {

      var row = $("<div>");
      row.addClass("user");

      // row.append("<p>" + newUser.author + " chirped: </p>");
      // row.append("<p>" + newUser.body + "</p>");
      // row.append("<p>At " + moment(newUser.created_at).format("h:mma on dddd") + "</p>");


        // code added
      row.append("<p>" + newUser.firstName + "</p>");
      row.append("<p>" + newUser.lastName + "</p>");
      row.append("<p>" + newUser.email + "</p>");
      row.append("<p>" + newUser.address + "</p>");
      row.append("<p>" + newUser.address2 + "</p>");
      row.append("<p>" + newUser.city + "</p>");
      row.append("<p>" + newUser.state + "</p>");
      row.append("<p>" + newUser.zip + "</p>");
      row.append("<p>Date of Birth " + moment(newUser..dateOfBirth).format("dddd") + "</p>");




      // $("#chirp-area").prepend(row);

    });

  // Empty each input box by replacing the value with an empty string
  // $("#author").val("");
  // $("#chirp-box").val("");


    // code added 
  $("#firstName").val("");
  $("#lastName").val("");
  $("#lastName").val("");
  $("#email-input").val("");
  $("#address-input").val("");
  $("#address2-input").val("");
  $("#city-input").val("");
  $("#state-input").val("");
  $("#zip-input").val("");
  $("#dateOfBirth-input").val("").format("");
});
