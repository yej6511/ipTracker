'use stricts';

let mymap; //지도
const ip = "192.212.174.101"; //초기 ip
const api_key = "at_oG9blD1X6BKQcENOB8FHVws1pOg2c"; 

$(function () { // html 문서가 로딩이 되어 준비가 되면 이 구문을 실행.
        
    //아이디를 각각 변수에 담기 --> $('#ip') = document.elementBtId('#ip');
    const $ip = $('#ip'); //ip주소 
    const $location = $('#location'); //위치
    const $time = $('#time'); //시간
    const $isp = $('#isp'); //ISP
    const $lat = $('#lat'); //경도
    const $lng = $('#lng'); //위도

       $.ajax({ 
           url: "https://geo.ipify.org/api/v1", //json 데이터들을 받아오기 위한 url주소
           data: {apiKey: api_key, ipAddress: ip}, //url에서 받아올 데이터 값을 변수에 담음.
           success: function(data) { //데이터 전송이 성공하면
               //console.log(data);
               //console.log(data.location.city);
               $ip.append(data.ip);
               $location.append(data.location.city);
               $time.append(data.location.timezone);
               $isp.append(data.isp);               
               $lat.append(data.location.lat);
               $lng.append(data.location.lng);

               console.log(data);
               console.log(data.location.lat);
               console.log(data.location.lng);
               //$("body").append("<pre>"+ JSON.stringify(data,"",2)+"</pre>");
               
               
                mymap = L.map('mapid').setView([data.location.lat, data.location.lng], 13);
               console.log(mymap);
               L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                   maxZoom: 18,
                   id: 'mapbox/streets-v11',
                   tileSize: 512,
                   zoomOffset: -1,
                   accessToken: 'pk.eyJ1IjoieWFlamkiLCJhIjoiY2txMGdnZ3JqMDRpdzJubzRlbWQ0c3FuciJ9.-050y-cVrZIgQNmq50J2RA'
               }).addTo(mymap);
               
           }
       });

    
    //버튼을 클릭했을 때 데이터를 불러와주는 코드.
    $('.btn').on('click', function() { 
        let $input = $('.input').val(); //ip입력란에 넣은 값.
        $.ajax({
            type: 'GET', //get방식으로 데이터를 전송
            url: 'https://geo.ipify.org/api/v1', //데이터를 받아올 URL
            data: {apiKey: api_key, ipAddress: $input}, //api_key와 전송할 ip주소 값을 담음.
            success: function(data) { //데이터 전송이 성공하면
                //객체 안에 존재하던 데이터들을 비우고, 입력한 값을 추가함.
                $ip.empty().append(data.ip); 
                $location.empty().append(data.location.city);
                $time.empty().append('UTC '+data.location.timezone);
                $isp.empty().append(data.isp);
                //console.log(data);
                // console.log($input);
                // console.log(data);
                console.log(data.location.lat);
                console.log(data.location.lng);
                
                //기존에 있던 지도를 삭제하고 입력한 위치(정보)의 지도를 다시 넣음.
                if (mymap != undefined) mymap.remove(); //지도가 존재한다면 삭제.
                mymap = L.map('mapid').setView([data.location.lat, data.location.lng], 13);
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'pk.eyJ1IjoieWFlamkiLCJhIjoiY2txMGdnZ3JqMDRpdzJubzRlbWQ0c3FuciJ9.-050y-cVrZIgQNmq50J2RA'
                }).addTo(mymap); // 해당 정보의 경도와 위도를 기준으로 한 지도를 추가.
                

                //지도에 원형, 표시 마커 추가하는 코드.
                let marker = L.marker([data.location.lat, data.location.lng]).addTo(mymap);
                var circle = L.circle([51.508, -0.11], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 500
                }).addTo(mymap);
                var polygon = L.polygon([
                    [51.509, -0.08],
                    [51.503, -0.06],
                    [51.51, -0.047]
                ]).addTo(mymap); 

                //위치 마커를 클릭했을 경우 뜨는 정보.
                marker.bindPopup("<b>lat:"+data.location.lat+"</b><br><b>lon:"+data.location.lng+"</b>").openPopup();
                circle.bindPopup("I am a circle.");
                polygon.bindPopup("I am a polygon.");


                function onMapClick(e) {
                    alert("You clicked the map at " + e.latlng);
                }
                
                mymap.on('click', onMapClick);

                var popup = L.popup();
  
                function onMapClick(e) {
                    popup
                        .setLatLng(e.latlng)
                        .setContent("You clicked the map at " + e.latlng.toString())
                        .openOn(mymap);
                }
                mymap.on('click', onMapClick);
            }
        })
    });
        
       
});
