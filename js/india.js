   var dayMap = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
      key: 'BC9A493B41014CAABB98F0471D759707',
      styleId: 102230});
      
var nightMap = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
      key: 'BC9A493B41014CAABB98F0471D759707',
      styleId: 33332});   

    var cloudmade = L.tileLayer('http://{s}.tile.cloudmade.com/915fd2f6a59f42fd95d40925b7a8ee2c/118624/256/{z}/{x}/{y}.png', {
                attribution :'Map data &copy 2011 OpenStreetMap contributors, Imagery &copy 2011 CloudMade',
                key : '915fd2f6a59f42fd95d40925b7a8ee2c',
                styleId: 120528,
                maxZoom:19
            });
     var dayMap1 = L.tileLayer('http://{s}.tile.cloudmade.com/915fd2f6a59f42fd95d40925b7a8ee2c/66332/256/{z}/{x}/{y}.png', {
                attribution :'Map data &copy 2011 OpenStreetMap contributors, Imagery &copy 2011 CloudMade',
                key : '915fd2f6a59f42fd95d40925b7a8ee2c',
                styleId: 120528,
                maxZoom:19
            });
    
    var map = L.map('map',{
      layers: [cloudmade]
    }).setView([21.0000,78.0000], 4);
    
    var baseLayers = {
    "Day View": dayMap,
    "Night View": nightMap,
    "Base Map": cloudmade     };

  
    var year;
        $("[data-slider]")
                .each(function () {
      var input = $(this);
       $("<span>").addClass("output").insertAfter($(this));
        })
        .bind("slider:ready slider:changed", 
        function (event, data)
 {      $(this)
        .nextAll(".output:first")
          .html("Showing Population density for : " + data.value.toFixed(0));

         year= data.value.toFixed(0);

         year=year-1994;
                       
        function getColor(d) {
        return d>6000? '#081d58':
                d > 600 ? '#bd0026' :
               d > 450 ? '#e31a1c' :
               d > 385 ? '#fc4e2a' :
               d > 315? '#fd8d3c' :
               d > 250   ? '#feb24c' :
               d > 150   ? '#fed976' :
               d > 50   ? '#ffeda0' :
                         '#ffffcc';
                }

        function style(feature) {
        return {
            fillColor: getColor(feature.properties.population[year]),
            weight: 2,
            opacity: 1,
            color: 'black',
            dashArray: '3',
            dashArray: '3',
            fillOpacity: 0.7
        };
        }
        var geojson;
        function highlightFeature(e) {
        var layer = e.target;
        info.update(layer.feature.properties);
        layer.setStyle({
            weight: 5,
            color: 'green ',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
        }
        function resetHighlight(e) {
        geojson.resetStyle(e.target);
          info.update();
        }
        
        function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
        }
        
        function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
        }

        geojson = L.geoJson(statesData, {
        style: style,
        onEachFeature: onEachFeature
        }).addTo(map);
    });
        
        var info = L.control();

        info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
        };

        // method that we will use to update the control based on feature properties passed
        info.update = function (props) {
        this._div.innerHTML = '<h4>Indian states Population Density</h4>' +  (props ?
            '<b>' + props.name + '</b><br />' +props.population[year]+' persons per sq. km'
            : 'Hover over a state');
        };
            

        function getColor(d) {
        return d>6000? '#081d58':
                d > 600 ? '#bd0026' :
               d > 450 ? '#e31a1c' :
               d > 385 ? '#fc4e2a' :
               d > 315? '#fd8d3c' :
               d > 250   ? '#feb24c' :
               d > 150   ? '#fed976' :
               d > 50   ? '#ffeda0' :
                         '#ffffcc';
                }

        info.addTo(map);
        var legend = L.control({position: 'bottomleft'});

        legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0,50, 150, 175, 225,270, 400, 600],
            labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map);
    //ADD BASE LAYER CONTROL TO MAPS
         var layersControl = L.control.layers();
          layersControl.addTo(map); 
