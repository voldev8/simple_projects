let quote = document.getElementById('quote');
let xhrBtn = document.getElementById('xhrBtn');
let axiosBtn = document.getElementById('axiosBtn');
let fetchBtn = document.getElementById('fetchBtn');

const url = "http://ron-swanson-quotes.herokuapp.com/v2/quotes";

//xhr
xhrBtn.addEventListener('click', ()=>{
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = function() { //instead of onload onreadystatechange
    if(xhr.status != 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      quote.innerHTML = JSON.parse((xhr.responseText));
    }
  }
});

//fetch
fetchBtn.addEventListener('click', ()=>{
  fetch(url)
  .then((res)=>{
    res.json().then((data)=>{
      quote.innerHTML = data;
    })    
  })
  .catch((err)=>{
    console.log(err);
  })
});

//jQuery
$(document).ready(()=> {
  $('#jQuerybtn').click(()=>{
    $.getJSON(url)
    .done((data)=> {
      $(quote).html(data);
    })
    .fail(()=>{
      console.log("fail");
    })
  });
});

//axios
axiosBtn.addEventListener('click',()=>{
  axios.get(url)
  .then((res)=>{
    quote.innerHTML = res.data;
  })
  .catch((err)=>{
    console.log(err);
  })
});
