async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="note-title"]').value;
  const note_content = document.querySelector('textarea[name="note-content"]').value;

  const response = await fetch(`/api/note`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      note_content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);