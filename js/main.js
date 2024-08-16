var map;

function createMap(){
    map = L.map('mapid', {
        center: [43.068, -89.407],
        zoom: 13
    });

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
        maxZoom: 18
    }).addTo(map);

    getData(map);
};



document.addEventListener('DOMContentLoaded', createMap);