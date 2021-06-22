'use stricts';
var infowindow;
let map; //지도
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
               console.log(data);
               //console.log(data.location.city);
               $ip.append(data.ip);
               $location.append(data.location.city);
               $time.append(data.location.timezone);
               $isp.append(data.isp);               
               $lat.append(data.location.lat);
               $lng.append(data.location.lng);
              
               const uluru = { lat: data.location.lat, lng: data.location.lng};
              
               map = new google.maps.Map(document.getElementById('map'), {
                center: uluru,
                zoom: 8,
                styles: [
                    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                    {
                      featureType: "administrative.locality",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#d59563" }],
                    },
                    {
                      featureType: "poi",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#d59563" }],
                    },
                    {
                      featureType: "poi.park",
                      elementType: "geometry",
                      stylers: [{ color: "#263c3f" }],
                    },
                    {
                      featureType: "poi.park",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#6b9a76" }],
                    },
                    {
                      featureType: "road",
                      elementType: "geometry",
                      stylers: [{ color: "#38414e" }],
                    },
                    {
                      featureType: "road",
                      elementType: "geometry.stroke",
                      stylers: [{ color: "#212a37" }],
                    },
                    {
                      featureType: "road",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#9ca5b3" }],
                    },
                    {
                      featureType: "road.highway",
                      elementType: "geometry",
                      stylers: [{ color: "#746855" }],
                    },
                    {
                      featureType: "road.highway",
                      elementType: "geometry.stroke",
                      stylers: [{ color: "#1f2835" }],
                    },
                    {
                      featureType: "road.highway",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#f3d19c" }],
                    },
                    {
                      featureType: "transit",
                      elementType: "geometry",
                      stylers: [{ color: "#2f3948" }],
                    },
                    {
                      featureType: "transit.station",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#d59563" }],
                    },
                    {
                      featureType: "water",
                      elementType: "geometry",
                      stylers: [{ color: "#17263c" }],
                    },
                    {
                      featureType: "water",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#515c6d" }],
                    },
                    {
                      featureType: "water",
                      elementType: "labels.text.stroke",
                      stylers: [{ color: "#17263c" }],
                    },
                  ],
                
              });
              const marker = new google.maps.Marker({
                position: uluru,
                map: map,
                title: "Click to zoom",
              });

              const infowindow = new google.maps.InfoWindow({
                content: "<p>Marker Location: " + marker.getPosition() + "</p>",
              });
              google.maps.event.addListener(marker, "click", () => {
                map.setZoom(15);
                infowindow.open(map, marker);
              });
        
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
                console.log(data);
                // console.log($input);
                // console.log(data);
                console.log(data.location.lat);
                console.log(data.location.lng);
                
                uluru = { lat: data.location.lat, lng: data.location.lng };
                
                //기존에 있던 지도를 삭제하고 입력한 위치(정보)의 지도를 다시 넣음.
                // if (map != undefined) map.remove(); //지도가 존재한다면 삭제.
                map = new google.maps.Map(document.getElementById('map'), {
                    center: uluru,

                    zoom: 8,
                    styles: [
                        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                        {
                          featureType: "administrative.locality",
                          elementType: "labels.text.fill",
                          stylers: [{ color: "#d59563" }],
                        },
                        {
                          featureType: "poi",
                          elementType: "labels.text.fill",
                          stylers: [{ color: "#d59563" }],
                        },
                        {
                          featureType: "poi.park",
                          elementType: "geometry",
                          stylers: [{ color: "#263c3f" }],
                        },
                        {
                          featureType: "poi.park",
                          elementType: "labels.text.fill",
                          stylers: [{ color: "#6b9a76" }],
                        },
                        {
                          featureType: "road",
                          elementType: "geometry",
                          stylers: [{ color: "#38414e" }],
                        },
                        {
                          featureType: "road",
                          elementType: "geometry.stroke",
                          stylers: [{ color: "#212a37" }],
                        },
                        {
                          featureType: "road",
                          elementType: "labels.text.fill",
                          stylers: [{ color: "#9ca5b3" }],
                        },
                        {
                          featureType: "road.highway",
                          elementType: "geometry",
                          stylers: [{ color: "#746855" }],
                        },
                        {
                          featureType: "road.highway",
                          elementType: "geometry.stroke",
                          stylers: [{ color: "#1f2835" }],
                        },
                        {
                          featureType: "road.highway",
                          elementType: "labels.text.fill",
                          stylers: [{ color: "#f3d19c" }],
                        },
                        {
                          featureType: "transit",
                          elementType: "geometry",
                          stylers: [{ color: "#2f3948" }],
                        },
                        {
                          featureType: "transit.station",
                          elementType: "labels.text.fill",
                          stylers: [{ color: "#d59563" }],
                        },
                        {
                          featureType: "water",
                          elementType: "geometry",
                          stylers: [{ color: "#17263c" }],
                        },
                        {
                          featureType: "water",
                          elementType: "labels.text.fill",
                          stylers: [{ color: "#515c6d" }],
                        },
                        {
                          featureType: "water",
                          elementType: "labels.text.stroke",
                          stylers: [{ color: "#17263c" }],
                        },
                      ],
                  });
                const marker = new google.maps.Marker({
                    position: uluru,
                    map: map,
                    title: "Click to zoom",
                });  
     
                const infowindow = new google.maps.InfoWindow({
                    content: "<p>Marker Location: " + marker.getPosition() + "</p>",
                  });
                  google.maps.event.addListener(marker, "click", () => {
                    map.setZoom(15);
                    infowindow.open(map, marker);
                  });


           
            }
        })
    });
        
       
});
