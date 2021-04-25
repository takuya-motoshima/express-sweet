/*User add/edit page script*/

// Main processing.
const edit = $('#edit').val() == 1;
console.log(`Edit:${edit}`);

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
  }
});