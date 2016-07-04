$(document).ready(function() {
    
    
    // LAYOUT AND UI 
    
    $('.layer-panel-btn').click(function() {
        $('.layer-panel-container').toggleClass('is-active');
        $(this).toggleClass('is-active');
        
        $('.overlay-helper').addClass('hidden');
    });
    
    $('.info-panel-btn').click(function() {
        $(this).addClass('hidden');
        $('.info-panel-container').addClass('is-active');
        
        $('.overlay-helper').addClass('hidden');
    });
    
    $('.close-btn').click(function() {
        $('.info-panel-container').removeClass('is-active');
        $('.info-panel-btn').removeClass('hidden');
    });
    
    $(".layer-li").click(function() {
        $('.is-active').removeClass('is-active');
        $(this).addClass('is-active');
    });
    
    $('.user-confirm').click(function() {
        $(this).parent().addClass('hidden');
    });
    
    
    
    // D3 MAP AND VIZ
    
    var width = $('#map').width(),
        height = $('#map').height();
    
    var projection = d3.geo.mercator()
        .center([-3.994, 51.65])
        .scale(width * 110)
        .translate([width / 2, height / 2]);
    
    var geoPath = d3.geo.path()
        .projection(projection);
    
    var svg = d3.select('#map').append('svg')
        .attr({
            id: 'svg',
            width: width,
            height: height
        })
        .style({
            position: 'absolute',
            top: 0,
            left: 0
        });
    
    var g = svg.append('g')
        .attr({
            id: 'g'
        });
    
    var q = d3.queue()
        .defer(d3.json, '/data/hex_grid.json')
        .defer(d3.json, '/data/ua_regions.json')
        .defer(d3.json, '/data/swanlinx-data.json')
        .defer(d3.json, '/data/pop_places.geojson')
        .await(makeMap);
    
    
    function makeMap(error, hexTopo, regTopo, dataTopo, places) {
        
        if (error) throw error;
        
        var hexGrid = topojson.feature(hexTopo, hexTopo.objects.hex_grid);
        var regions = topojson.feature(regTopo, regTopo.objects.ua_regions);
        var data = topojson.feature(dataTopo, dataTopo.objects['swanlinx-data']);
        
        
        // SOUTH WALES UNITARY AUTHORITY BOUNDARIES
        
        var uaGroup = g.append('g')
            .attr({
                id: 'uaGroup'
            });
        
        uaGroup
            .append('path')
            .datum(regions)
            .attr({
                class: 'ua',
                d: geoPath
            })
            .style({
                fill: 'rgba(193,193,193,0.6)',
                stroke: 'rgba(84,84,84,0.6)',
                'stroke-width': '2px'
            });
        
        // HEX BASE GRID
        
        var hexGroup = g.append('g')
            .attr({
                id: 'hexGroup'
            });
        
        hexGroup
            .append('path')
            .datum(hexGrid)
            .attr({
                class: 'hex',
                d: geoPath
            })
            .style({
                fill: 'rgba(193,193,193,0.6)',
                stroke: 'rgba(255,255,255,0.6)',
                'stroke-width': '1px'
            });
        
        // PLACE LABELS
        
        var placeGroup = g.append('g')
            .attr({
                id: 'placeGroup'
            });
        
        placeGroup.selectAll('circle.place')
            .data(places.features)
            .enter().append('circle')
            .attr({
                class: 'place',
                r: function(d) {
                    var place = d.properties.place;
                    return  place === 'city' ? 6 :
                            place === 'town' ? 3 :
                            0;    
                },
                transform: function(d) {
                    return 'translate(' + projection([
                        d.geometry.coordinates[0],
                        d.geometry.coordinates[1]
                    ]) + ')'
                }
            })
            .style({
                fill: '#373a3c'
            });
        
        placeGroup.selectAll('.place-label')
            .data(places.features)
            .enter().append('text')
            .attr({
                class: 'place-label',
                dy: '.35em',
                transform: function(d) { 
                    return "translate(" + projection(d.geometry.coordinates) + ")"; 
                }
            })
            .text(function(d) {
                return d.properties.name;
            });
        
        placeGroup.selectAll(".place-label")
            .attr('x', function(d) { 
                return d.geometry.coordinates[0] > -3.9 ? 9 : -9; 
            })
            .style('text-anchor', function(d) { 
                return d.geometry.coordinates[0] > -3.9 ? 'start' : 'end'; 
            });
    
    
        // MAP SWANLINX DATA
        
        var dataGroup = g.append('g')
            .attr({
                id: 'dataGroup'
            });
    
        dataGroup.selectAll('path.hexBin')
            .data(data.features)
            .enter().append('path')
            .attr({
                class: 'hexBin',
                d: geoPath
            })
            .style({
                fill: function(d) {
                    return '#575'
                },
                opacity: .7
            });
    
    } // end makeMap function
    
    
    // RESIZE FUNCTION
    
    $(window).resize(function() {
        var w = $('#map').width(),
            h = $('#map').height();
        
        svg.attr('width', w);
        svg.attr('height', h);
        
        projection
            .translate([w / 2, h / 2])
            .scale(w * 110);
        
        d3.select('.ua').attr('d', geoPath);
        d3.select('.hex').attr('d', geoPath);
        d3.selectAll('.hexBin').attr('d', geoPath);
        d3.selectAll('.place')
            .attr({
                transform: function(d) {
                    return 'translate(' + projection([
                        d.geometry.coordinates[0],
                        d.geometry.coordinates[1]
                    ]) + ')'
                }
            });
        d3.selectAll('.place-label')
            .attr({
                transform: function(d) { 
                    return "translate(" + projection(d.geometry.coordinates) + ")"; 
                }
            });
        
    }); // end resize function
    
    
}); // end document ready function