const button = document.querySelector('button');

button.addEventListener(('click'), ()=>{
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(onSuccess , onError)
    } else {
      button.innerText= "your browser does not support"
    }
});



function onSuccess(position) {
  let { latitude, longitude } = position.coords;
  let api_key = "82e0a249822e45ca9c91f6da7a4566c9";
  //
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`).then((response)=> response.json())
    .then((result)=>{
    let all_details = result.results[0].components;
//     console.log(all_details);
    let { state , postcode , country, railway, continent, road
} = all_details;
    console.log(state, postcode, country, railway, continent, road);
    button.innerText= ` ${continent},${country},${state},  ${railway}, ${postcode}, ${road},`
    })




}

function onError(error) {
// console.log(error);
if (error.code == 1) {
     button.innerHTML= "You denied the request"
} else if (error.code == 2) {
     button.innerHTML= "Location not avilable"
} else {
     button.innerHTML = "Something Went Wrong";
}
}