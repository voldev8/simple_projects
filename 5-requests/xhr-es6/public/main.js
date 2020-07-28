// NOTE: wordSmith functions from lines 4 - 39
// NOTE: byteSize functions from lines 48 - 81 (remember to add your API key!)

// information to reach API
const dataMuseUrl = 'https://api.datamuse.com/words?';
const queryParams = 'rel_jjb=';

// selecting page elements
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');

// AJAX function GET
const getSuggestions = async () => {
  const wordQuery = inputField.value;
  const endpoint = dataMuseUrl + queryParams + wordQuery;

  try{
    const response =  await fetch(endpoint);
    if(response.ok){
      let jsonResponse = await response.json();
			renderWordResponse(jsonResponse);
    }
  }
  catch(error){
    console.log(error);
  }
}

// clear previous results and display results to webpage
const displaySuggestions = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  }
  getSuggestions();
}

submit.addEventListener('click', displaySuggestions);

// information to reach Rebrandly API
const apiKey = '208ddc17be38457487ed59e76709fd0b';
const rebrandlyEndpoint = 'https://api.rebrandly.com/v1/links';

// element selector
const shortenButton = document.querySelector('#shorten');

// AJAX functions POST
const shortenUrl = async () =>{
  const urlToShorten = inputField.value;
  const data = JSON.stringify({destination: urlToShorten});

  try{
    const response =  await fetch(rebrandlyEndpoint, {
      method: 'POST',
      body: data,
      headers: {
        "Content-type": "application/json",
        'apikey': apiKey
      }
    })
    if(response.ok){
      const jsonResponse = await response.json();
			renderByteResponse(jsonResponse);
    }
  }
  catch(error){
    console.log(error);
  }
}

// Clear page and call AJAX functions
const displayShortUrl = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  }
  shortenUrl();
}

shortenButton.addEventListener('click', displayShortUrl);


// GET and POST requests can be created a variety of ways.
//
// Use AJAX to asynchronously request data from APIs. fetch() and async/await are new functionalities developed in ES6 (promises) and ES8 respectively.
//
// Promises are a new type of JavaScript object that represent data that will eventually be returned from a request.
//
// fetch() is a web API that can be used to create requests. fetch() will return promises.
//
// We can chain .then() methods to handle promises returned by fetch().
//
// The .json() method converts a returned promise to a JSON object.
//
// async is a keyword that is used to create functions that will return promises.
//
// await is a keyword that is used to tell a program to continue moving through the message queue while a promise resolves.
//
// await can only be used within functions declared with async.
