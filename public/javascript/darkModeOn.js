async function darkModeOn(event) {
  // event.preventDefault();

  const response = await fetch('/api/user/dmon', {
    method: 'PUT',
    body: JSON.stringify({
      dark_mode: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // check response status
  if (response.ok) {
    console.log('success');
    document.location.reload();
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#dark-mode-on').addEventListener('click', darkModeOn);
