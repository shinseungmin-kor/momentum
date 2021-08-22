// const weather = document.querySelector("#weather span:first-child");
// const city = document.querySelector("#weather span:last-child");
// const API_KEY = "5f72db1e6bb1f1d257ab6581f800d7e8";

// function onGeoOk(position) {
//     const lat = position.coords.latitude;
//     const lng = position.coords.longitude;
//     // console.log("You live in", lat, lng);
//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
//     fetch(url)
//         .then((response) => response.json())
//         .then((data) => {
//             city.innerText = data.name;
//             weather.innerText = `${data.main.temp} °C / ${data.weather[0].main} /`;
//         });
// }

// function GeoError() {
//     alert("Can't find you. No weather for you.");
// }

// navigator.geolocation.getCurrentPosition(onGeoOk, GeoError);

const tem= document.querySelector(".temp");
const pla= document.querySelector(".place");
const API_KEY = "5f72db1e6bb1f1d257ab6581f800d7e8";
const COORDS = 'coords';

// api 에서 위도 경도를 가지로 날씨와 장소 받아오기
function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json();
        }).then(function(json){
            const temperture = json.main.temp;
            const place = json.name;
            tem.innerText = `${temperture}°`;
            pla.innerText = place;
        });
}

// 위도 경도 저장하기
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 위치청보를 얻어왔을 때 위도경도 저장하고, 날씨 가져오기
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, latitude);
}

// 위치정보 얻는거 실패했을 때 로그찍기
function handleGeoFail(positon){
    console.log('Cant access geo location');
}

// 위치정보 물어보기
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoFail);
}

// 위치정보 저장된거 불러오기
function loadCoords(){
    const loadCoords = localStorage.getItem(COORDS);
    // 저장된 위치정보가 없으면 물어보기
    if(loadCoords === null){
        askForCoords();
    }else {
        // 있으면 json 으로 파싱해서 날씨 가져오기
        const parseCoords = JSON.parse(loadCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();