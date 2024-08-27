document.addEventListener('DOMContentLoaded', function() {
    createMap();
    setupModal();
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

    //data fetching and GeoJSON integration
    fetch('https://18.214.48.54:8000/roadclosures')
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
    //Geocoder
    var geocoder = L.Control.geocoder({
        defaultMarkGeocode: false,
        collapsed: false
    }).on('markgeocode', function(e) {
        var bbox = e.geocode.bbox;
        L.polygon([bbox.getSouthEast(), bbox.getNorthEast(), bbox.getNorthWest(), bbox.getSouthWest()]).addTo(map);
        map.fitBounds(bbox);
    }).addTo(map);

    //Home button setup
    var homeControl = new L.Control({
        position: 'topleft'
    });

    var button = L.DomUtil.create('button', 'home-button');
    button.innerHTML = 'Home';
    button.onclick = function() {
        map.setView([43.068, -89.407], 15);
    };

    homeControl.onAdd = function() {
        return button;
    };

    homeControl.addTo(map);
}

function setupModal() {
    var modal = document.getElementById("welcomeModal");
    var closeButton = document.getElementById("closeModal");

    //display the modal by default
    modal.style.display = "block";

    //close modal when 'Explore' button is clicked
    closeButton.addEventListener('click', function() {
        modal.style.display = "none";
    });

    //close modal if clicked outside of modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}