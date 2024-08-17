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
            var button = L.DomUtil.create('button');
            button.innerHTML = 'Home'; //text on the button
            button.className = 'home-button';

            L.DomEvent.on(button, 'click', function () {
                map.setView([43.068, -89.407], 15); //coordinates and zoom level of Madison, WI
            });

            return button;
        },

        onRemove: function(map) {
    
        }
    });

    L.control.homeButton = function(opts) {
        return new L.Control.HomeButton(opts);
    }

     //add the home button control to the map
     L.control.homeButton({ position: 'topleft' }).addTo(map);


    getData(map);
};

document.addEventListener('DOMContentLoaded', createMap);

document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("welcomeModal");
    var closeButton = document.getElementById("closeModal");

    //open the modal
    modal.style.display = "block";

    //close the modal when the 'Explore' button is clicked
    closeButton.addEventListener('click', function() {
        modal.style.display = "none";
    });

    //close the modal if the user clicks outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});