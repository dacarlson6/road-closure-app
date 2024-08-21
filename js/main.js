document.addEventListener('DOMContentLoaded', function() {
    createMap();
});

function createMap() {
    var map = L.map('mapid', {
        center: [43.068, -89.407],
        zoom: 15
    });

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
        maxZoom: 20
    }).addTo(map);

    // Data fetching and GeoJSON integration
    fetch('http://18.214.48.54:8000/roadclosures')
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: function(feature) {
                    return {color: "#FF0000"};
                },
                onEachFeature: function(feature, layer) {
                    layer.bindPopup('Closure Info: ' + feature.properties.description);
                }
            }).addTo(map);
        })
        .catch(error => console.error('Error loading the road closures data:', error));

    setupControls(map);
}

function setupControls(map) {
    // Geocoder and Home button setup
    var geocoder = L.Control.geocoder({
        defaultMarkGeocode: false,
        collapsed: false
    }).on('markgeocode', function(e) {
        var bbox = e.geocode.bbox;
        L.polygon([bbox.getSouthEast(), bbox.getNorthEast(), bbox.getNorthWest(), bbox.getSouthWest()]).addTo(map);
        map.fitBounds(bbox);
    }).addTo(map);

    geocoder.getContainer().querySelector('.leaflet-control-geocoder-icon').click();

    var homeControl = new L.Control.HomeButton({
        position: 'topleft'
    }).addTo(map);
    homeControl.addTo(map);

    setupModal();
}

function setupModal() {
    var modal = document.getElementById("welcomeModal");
    var closeButton = document.getElementById("closeModal");

    modal.style.display = "block";

    closeButton.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}
