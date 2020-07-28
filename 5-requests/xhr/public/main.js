// NOTE: wordSmith functions from lines 4 - 39
// NOTE: byteSize functions from lines 41 - 76 (remember to add your API key!)

// information to reach API
const dataMuseUrl = 'https://api.datamuse.com/words?';
const queryParams = 'rel_jjb=';

// selecting page elements
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');

// AJAX function GET
const getSuggestions = () => {
  const wordQuery = inputField.value;
  const endPoint = dataMuseUrl + queryParams + wordQuery;

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      renderWordResponse(xhr.response);
    }
  };
  xhr.open('GET', endPoint);
  xhr.send();
}

// clear previous results and display results to webpage
const displaySuggestions = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  };
  getSuggestions();
};

submit.addEventListener('click', displaySuggestions);

// information to reach Rebrandly API
const apiKey = '208ddc17be38457487ed59e76709fd0b';
const rebrandlyUrl = 'https://api.rebrandly.com/v1/links';

// element selector
const shortenButton = document.querySelector('#shorten');

// AJAX functions POST
const shortenUrl = () => {
  const urlToShorten = inputField.value;
  const data = JSON.stringify({destination: urlToShorten});

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      renderByteResponse(xhr.response);
    }
  };
  xhr.open('POST', rebrandlyUrl);
  xhr.setRequestHeader('Content-type', 'application/json');
	xhr.setRequestHeader('apikey', apiKey);
  xhr.send(data);
}

// Clear page and call AJAX functions
const displayShortUrl = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  };
  shortenUrl();
};

shortenButton.addEventListener('click', displayShortUrl);



// JavaScript is the language of the web because of its asynchronous capabilities.
// AJAX, which stands for Asynchronous JavaScript and XML, is a set of tools
// that are used together to take advantage of JavaScript’s asynchronous capabilities.
//
// There are many HTTP request methods, two of which are GET and POST.
//
// GET requests only request information from other sources.
//
// POST methods can introduce new information to other sources in addition to requesting it.
//
// GET requests can be written using an XMLHttpRequest object and vanilla JavaScript.
//
// POST requests can also be written using an XMLHttpRequest object and vanilla JavaScript.
//
// Writing GET and POST requests with XHR objects and vanilla JavaScript requires
// constructing the XHR object using new, setting the responseType, creating a
// function that will handle the response object, and opening and sending the request.
//
// To add a query string to a URL endpoint you can use ? and include a parameter.
//
// To provide additional parameters, use & and then include a key-value pair, joined by =.
//
// Determining how to correctly write the requests and how to properly implement them
// requires carefully reading the documentation of the API with which you’re working.
