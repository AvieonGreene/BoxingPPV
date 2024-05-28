const form = document.querySelector("form");

async function sendData() {
  // Associate the FormData object with the form element
  const formData = new FormData(form);

  try {
    const response = await fetch("https://example.org/post", {
      method: "POST",
      // Set the FormData instance as the request body
      body: formData,
    });
    console.log(await response.json());
  } catch (e) {
    console.error(e);
  }
}

/* Take over form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});

/*







/*
const numb = document.getElementById('numb');
const form = document.getElementById('form');
const error = document.getElementById('error')

form.addEventListener('submit', (e) => {
    e.preventDefault()

let messages = []
if (numb.value === '' || numb.value == null) {
    messages.push('number is required')
}


if (messages.length > 0) {
    e.preventDefault()
    errorElement.innerText = messages.join(', ')
}
})
*/

$.ajax({
  type: "post",
  url: "send.php",
  data: {name: $('#name').val(), email: $('#email').val(), message: $('#msg').val()},
  success: function(result) {
alert("mail sent!");
  }
});