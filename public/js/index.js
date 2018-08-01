
  

{/* <script type="text/javascript">

    $(".submit").on("click", function () {

        // Here we grab the form elements
        var newReservation = {
            customerName: $('#reserve_name').val().trim(),
            phoneNumber: $('#reserve_phone').val().trim(),
            customerinputEmail4: $('#reserve_inputEmail4').val().trim()

            onclick="javascript:NewCssCal ('demo1','MMddyyyy','dropdown',true,'24',true)"
        };

        console.log(newReservation);


        var currentURL = window.location.origin;

        $.post(currentURL + "/api/tables", newReservation,
            function (data) {


                if (data == true) {
                    alert("Succefully Confirmed!")
                }


                if (data == false) {
                    alert("Sorry you are on the wait list")
                }


                $('#reserve_name').val("");
                $('#reserve_phone').val("");
                $('#reserve_inputEmail4').val("");


            });

        return false;

    });

</script> */}

// <!-- jQuery -->
<script src="https://code.jquery.com/jquery.js">

<script type="text/javascript">

    $(".submit").on("click", function () {

        // Here we grab the form elements
        var newAccount = {
            firstName: $("#firstName").val().trim();
            lastName: $("#lastName").val().trim();
            email4: $("#inputEmail4").val().trim();
            address: $("#inputAddress").val().trim();
            address2: $("#inputAddress2").val().trim();
            city: $("#inputCity").val().trim();
            state: $("#inputState").val().trim();
            zip: $("#inputZip").val().trim();
            dateOfBirth: $("#inputDateOfBirth").val().trim();
            timeZone: $("#inputTimeZone").val().trim();

            onclick="javascript:NewCssCal ('demo1','MMddyyyy','dropdown',true,'24',true)"
        };
        </script>

        console.log(newAccount);
        // Console log each of the user inputs to confirm we are receiving them
        console.log(firstName);
        console.log(lastName);
        console.log(email4);
        console.log(address);
        console.log(address2);
        console.log(city);
        console.log(state);
        console.log(zip);
        console.log(dateOfBirth);
        console.log(timeZone);


        var currentURL = window.location.origin;

        $.post(currentURL + "/api/tables", newReservation,
            function (data) {


                if (data == true) {
                    alert("Succefully Confirmed!")
                }


                if (data == false) {
                    alert("Please fillout form!")
                }

                $("#firstName").val("");
                $("#lastName").val("");
                $("#inputEmail4").val("");
                $("#inputAddress").val("");
                $("#inputAddress2").val("");
                $("#inputCity").val("");
                $("#inputState").val("");
                $("#inputZip").val("");
                $("#inputDateOfBirth").val("");
                $("#inputTimeZone").val("");


            });

        return false;

    });

    </script>