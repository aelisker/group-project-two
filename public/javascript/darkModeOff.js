async function darkModeOff(event) {
  // event.preventDefault();

  const response = await fetch('/api/user/dmoff', {
    method: 'PUT',
    body: JSON.stringify({
      dark_mode: false
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

document.querySelector('#dark-mode-off').addEventListener('click', darkModeOff);
