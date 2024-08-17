var map;

function createMap(){
    map = L.map('mapid', {
        center: [43.068, -89.407],
        zoom: 15
    });

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
        maxZoom: 20
    }).addTo(map);

    //add geocoder
    var geocoder = L.Control.geocoder({
        defaultMarkGeocode: false
    }).on('markgeocode', function(e) {
        var bbox = e.geocode.bbox;
        var poly = L.polygon([
             bbox.getSouthEast(),
             bbox.getNorthEast(),
             bbox.getNorthWest(),
             bbox.getSouthWest()
        ]).addTo(map);
        map.fitBounds(poly.getBounds());
    }).addTo(map);

    getData(map);
};

document.addEventListener('DOMContentLoaded', createMap);