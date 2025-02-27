$(function () {
  emailjs.init({
    publicKey: "ljXqQ96bYgHvyAgYA", // Replace with your EmailJS public key
  });

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function ($form, event) {
      event.preventDefault(); // Prevent default submit behavior

      // Get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var firstName = name.split(" ")[0]; // Get first name for messages

      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable button to prevent duplicate messages

      // Send email using EmailJS
      emailjs
        .send("service_ec3t0wb", "template_g1qb1zn", {
          user_name: name,
          user_email: email,
          user_phone: phone,
          user_message: message,
        })
        .then(() => {
          // Success message
          $("#success")
            .html("<div class='alert alert-success'>")
            .find(".alert-success")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"
            )
            .append("<strong>Su mensaje ha sido enviado</strong>")
            .append("</div>");

          // Clear all fields
          $("#contactForm").trigger("reset");
        })
        .catch(() => {
          // Fail message
          $("#success")
            .html("<div class='alert alert-danger'>")
            .find(".alert-danger")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"
            )
            .append(
              $("<strong>").text(
                "Lo sentimos " +
                  firstName +
                  ", el servidor no está respondiendo. Intenta de nuevo más tarde."
              )
            )
            .append("</div>");

          // Clear all fields
          $("#contactForm").trigger("reset");
        })
        .finally(() => {
          setTimeout(function () {
            $this.prop("disabled", false); // Re-enable submit button
          }, 1000);
        });
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });

  $('a[data-toggle="tab"]').click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/* When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
  $("#success").html("");
});
