/*Login page script*/

/**
 * Login request.
 */
async function login(form) {
  const res = await $.ajax({
    type: 'POST',
    url: '/api/users/login',
    data: new FormData(form),
    contentType: false,
    processData: false
  });
  // Login failed.
  if (!res)
    return void alert('The user name or password is incorrect.');
  // Login successful.
  location.href = '/';
}

// Main processing.
$('[on-login]').on('submit', async event => {
  // Click the login button.
  event.preventDefault();
  await login(event.currentTarget);
});