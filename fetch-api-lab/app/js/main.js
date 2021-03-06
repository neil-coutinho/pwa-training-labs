/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// helper functions ----------

function logResult(result) {
  console.log(result);
}

function logError(error) {
  console.log('Looks like there was a problem:', error);
}


// Fetch JSON ----------

function fetchJSON() {
  // TODO
  fetch('examples/animals.json')
  .then(validateResponse)
  .then(readResponseAsJSON)
  .then(logResult)
  .catch(logError)
}
const jsonButton = document.getElementById('json-btn');
jsonButton.addEventListener('click', fetchJSON);


// Fetch Image ----------

function fetchImage() {
  fetch('examples/fetching.jpg')
  .then(validateResponse)
  .then(readResponseAsBlob)
  .then(showImage)
  .catch(logError)
}
const imgButton = document.getElementById('img-btn');
imgButton.addEventListener('click', fetchImage);


// Fetch text ----------

function fetchText() {
  fetch('examples/words.txt')
  .then(validateResponse)
  .then(getText)
  .then(showText)
  .catch(logError)
}
const textButton = document.getElementById('text-btn');
textButton.addEventListener('click', fetchText);


// HEAD request ----------

function headRequest() {
  fetch('examples/words.txt', {
    method: 'HEAD'
  })
  .then(validateResponse)
  .then(getText)
  .then(showText)
  .catch(logError)
}
const headButton = document.getElementById('head-btn');
headButton.addEventListener('click', headRequest);


// POST request ----------

/* NOTE: Never send unencrypted user credentials in production! */
function postRequest() {

  let formData = new FormData(document.getElementById('msg-form'));
  console.log({formData});
  
  fetch('http://localhost:5001/', {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  })
 // .then(validateResponse)
  //.then(getText)
  //.then(showText)
  .then(logResult)
  .catch(logError)






}
const postButton = document.getElementById('post-btn');
postButton.addEventListener('click', postRequest);

function validateResponse(response) {
  if(!response.ok) {
    throw Error(response.statusText);
  }

  return response
}

function readResponseAsJSON(response) {
  return response.json();
}

function readResponseAsBlob(response) {
  return response.blob();
}

function showImage(blob) {
  const imgContainer = document.querySelector('#img-container');
  
  const img = document.createElement('img');

  imgContainer.appendChild(img);

  console.log({blob})
  const src = URL.createObjectURL(blob)

  console.log(src);

  img.src = src;
}

function getText(response) {
  console.log(response.headers)
  return response.text()
}

function showText(text) {
  console.log(text);
  const pTag = document.querySelector('#message');
 
  pTag.textContent = text;
  return

}