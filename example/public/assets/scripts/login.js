/*Login page script*/

// Main processing.
// Form validation.
$('#form').validate({
  validClass: 'is-valid', 
  errorClass: 'is-invalid',
  errorElement: "div",
  errorPlacement: (error, element) => {
    $(element).after($(error).addClass('invalid-feedback'));
  },
  submitHandler: async (form, event) => {
    event.preventDefault();

    // Send an authentication request.
    const res = await $.ajax({
      type: 'POST',
      url: '/api/users/login',
      data: new FormData(form),
      contentType: false,
      processData: false
    });

    // If login fails.
    if (!res)
      return void alert('The user name or password is incorrect.');

    // After logging in successfully, you will be taken to the top page.
    location.href = '/';
  }
});