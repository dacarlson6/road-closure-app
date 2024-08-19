var map;

function createMap() {
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
        defaultMarkGeocode: false,
        collapsed: false
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

    //automatically expand the geocoder search bar
    geocoder.getContainer().querySelector('.leaflet-control-geocoder-icon').click();

    //define a control for the home button
    L.Control.HomeButton = L.Control.extend({
        onAdd: function(map) {
            var button = L.DomUtil.create('button', 'home-button');
            button.innerHTML = 'Home';
            button.onclick = function() {
                map.setView([43.068, -89.407], 15);
            };
            return button;
        },
        onRemove: function(map) {
            //clean up when the control is removed
        }
    });

    L.control.homeButton = function(opts) {
        return new L.Control.HomeButton(opts);
    }

    //add the home button control to the map
    L.control.homeButton({ position: 'topleft' }).addTo(map);
};

document.addEventListener('DOMContentLoaded', function() {
    createMap();

    var modal = document.getElementById("welcomeModal");
    var closeButton = document.getElementById("closeModal");

    //ensure the modal is displayed upon loading
    modal.style.display = "block";

    //close the modal when the 'Explore' button is clicked
    closeButton.addEventListener('click', function(event) {
        modal.style.display = "none";
        event.stopPropagation(); // Stop the click from propagating to the modal
    });

    //close the modal if the user clicks outside of the modal content
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
