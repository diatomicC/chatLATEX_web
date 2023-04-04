function convert() {
  const input = document.querySelector('#input').value;
  if (input.trim() === '') {
    return;
  }

  // Call GPT API to convert input text into LaTeX
  const latex = getLatex(input);

  // Call Math API to convert LaTeX into an image file
  const url = 'https://api.mathpix.com/v3/text';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY_HERE'
  };
  const body = JSON.stringify({
    "format": "png",
    "data": latex,
    "transforms": ["mathml"]
  });
  fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
  }).then(response => {
    return response.json();
  }).then(data => {
    const image_url = data?.images?.[0]?.url;
    if (image_url) {
      // Display the image and download button
      const output = document.querySelector('#output');
      output.innerHTML = `<img src="${image_url}" alt="Mathematical expression image"><br><button onclick="download()">Download</button>`;
      output.style.display = 'block';
    } else {
      alert('Image conversion failed.');
    }
  }).catch(error => {
    console.error(error);
    alert('Error occurred while converting image.');
  });
}

function getLatex(input) {
  // Call GPT API to convert input text into LaTeX
  // Replace YOUR_GPT_API_ENDPOINT_HERE with the URL of your GPT API endpoint
  const url = 'YOUR_GPT_API_ENDPOINT_HERE';
  const headers = {
    'Content-Type': 'application/json'
  };
  const body = JSON.stringify({
    "text": input,
    "model": "YOUR_GPT_MODEL_NAME_HERE"
  });
  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
  }).then(response => {
    return response.json();
  }).then(data => {
    return data?.latex;
  }).catch(error => {
    console.error(error);
    alert('Error occurred while converting LaTeX.');
  });
}

function download() {
  const image = document.querySelector('#output img');
  const link = document.createElement('a');
  link.href = image.src;
  link.download = 'math_expression.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}