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
/*jshint esversion: 6*/

const app = (() => {

  function getImageName(country='') {

    // create and return a promise
    let name = country.toLowerCase();
    let imagePromise = new Promise((resolve, reject) => {
      if(name == 'spain' || name == 'chile' || name == 'peru') {
        resolve(`${name}.png`);
      } else {
        reject(`Country not found`);
      }
    });

    console.log(imagePromise);

    return imagePromise;

  }

  function isSpain(country) {
    let booleanPromise = new Promise((resolve, reject) => {
      if(country.toLowerCase() == 'spain') {
        resolve(true);
      } else {
        reject(false);
      }
    });
    // Optional - create and return a promise that resolves if input is "Spain"

    return booleanPromise;
  }

  function flagChain(country) {

    return getImageName(country)
    .then(fetchFlag)
    .then(processFlag)
    .then(appendFlag)
    .catch(logError); 

  }

  let promises = [
    getImageName('Spain'),
    getImageName('Chile'),
    getImageName('Peru')
  ];

  function allFlags(promiseList) {

    // use promise.all
    return Promise.all(promiseList);

  }

  allFlags(promises).then(logSuccess).catch(logError)

  


  // call the allFlags function


  // use Promise.race


  /* Helper functions */

  function logSuccess(result) {
    console.log('Success!:\n' + result);
  }

  function logError(err) {
    console.log('Oh no!:\n' + err);
  }

  function returnFalse() {
    return false;
  }

  function fetchFlag(imageName) {
    return fetch('flags/' + imageName); // fetch returns a promise
  }

  function processFlag(flagResponse) {
    if (!flagResponse.ok) {
      throw Error('Bad response for flag request!'); // This will implicitly reject
    }
    return flagResponse.blob(); // blob() returns a promise
  }

  function appendFlag(flagBlob) {
    const flagImage = document.createElement('img');
    const flagDataURL = URL.createObjectURL(flagBlob);
    flagImage.src = flagDataURL;
    const imgContainer = document.getElementById('img-container');
    imgContainer.appendChild(flagImage);
    imgContainer.style.visibility = 'visible';
  }

  function fallbackName() {
    return 'chile.png';
  }


  

  // Don't worry if you don't understand this, it's not part of Promises.
  // We are using the JavaScript Module Pattern to enable unit testing of
  // our functions.
  return {
    getImageName: (getImageName),
    flagChain: (flagChain),
    isSpain: (isSpain),
    fetchFlag: (fetchFlag),
    processFlag: (processFlag),
    appendFlag: (appendFlag),
    allFlags: (allFlags)
  };

})();
