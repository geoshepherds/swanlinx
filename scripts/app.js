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
        
        updateData($(this).attr('id'));
        
    });
    
    $('.user-confirm').click(function() {
        $(this).parent().addClass('hidden');
    });
    
    // GET COLOR FUNCTION 
    
    var bgColor = 'rgb(193,193,193)',
        white = 'rgb(250,250,250)',
        bgOpacity = .4,
        whiteOpacity = .4
    
    function getColor(data, layer) {
        
        updateLegend(data, layer);
        
        if(layer === 'bmi_male') {
            
            return  data === null ? bgColor :
                    data <= 14 ? colorbrewer.RdYlGn[3][1] :
                    data > 14 && data <= 19 ? colorbrewer.RdYlGn[4][3] :
                    data > 19 && data <= 22 ? colorbrewer.RdYlGn[4][1] :
                    data > 22 ? colorbrewer.RdYlGn[4][0] :
                    bgColor
            
        } else if(layer === 'bmi_female') {
            
            return  data === null ? bgColor :
                    data <= 14 ? colorbrewer.RdYlGn[3][1] :
                    data > 14 && data <= 20 ? colorbrewer.RdYlGn[4][3] :
                    data > 20 && data <= 24 ? colorbrewer.RdYlGn[4][1] :
                    data > 24 ? colorbrewer.RdYlGn[4][0] :
                    bgColor
            
        } else if(layer === 'grip_male' || layer === 'grip_female') {
            
            if(data != null) {
                
                var colorScale = d3.scale.threshold()
                    .domain([3, 9, 15, 21])
                    .range(colorbrewer.RdYlGn[5]);
            
                return colorScale(data);
                
            } else {
                
                return bgColor;
                
            }
                      
            
        } else if(layer === 'fitness' || layer === 'health') {
            
            if(data != null) {
                
                var colorScale = d3.scale.threshold()
                    .domain([1, 2, 3, 4])
                    .range(colorbrewer.RdYlGn[5]);
            
                return colorScale(data); 
                
            } else {
                
                return bgColor;
                
            }
                     
            
        } else if(layer === 'bleep_male') {
            
            if(data != null) {
                
                var colorScale = d3.scale.threshold()
                    .domain([12, 32, 52])
                    .range(colorbrewer.RdYlGn[4]);
            
                return colorScale(data);  
                
            } else {
                
                return bgColor;
                
            }
            
                    
            
        } else if(layer === 'bleep_female') {
            
            if(data != null) {
                
                var colorScale = d3.scale.threshold()
                    .domain([7, 24, 44])
                    .range(colorbrewer.RdYlGn[4]);

                return colorScale(data); 
                
            } else {
                
                return bgColor;
                
            }
                     
            
        } else if(layer === 'sleep_time') {
            
            return  data === null ? bgColor :
                    data <= 5.5 ? colorbrewer.RdYlGn[4][0] :
                    data > 5.5 && data <= 6.5 ? colorbrewer.RdYlGn[4][1] :
                    data > 6.5 && data <= 7.5 ? colorbrewer.RdYlGn[4][2] :
                    data > 7.5 && data <= 10.5 ? colorbrewer.RdYlGn[4][3] :
                    data > 10.5 && data <= 12 ? colorbrewer.RdYlGn[4][2] :
                    data > 12 && data <= 13 ? colorbrewer.RdYlGn[4][1] :
                    data > 13 && data <= 14.5 ? colorbrewer.RdYlGn[4][0] :
                    bgColor
            
        } else if(layer === 'fruit_avg') {
            
            if(data != null) {
                
               var colorScale = d3.scale.threshold()
                    .domain([1, 3, 6])
                    .range(colorbrewer.RdYlGn[4]);
            
                return colorScale(data); 
                
            } else {
                
                return bgColor;
                
            }
            
        } else if(layer === 'fizzy_drinks') {
            
            return  data === null ? bgColor :
                    data < 1.5 ? colorbrewer.RdYlGn[4][0] :
                    data >= 1.5 ? colorbrewer.RdYlGn[4][3] :
                    bgColor            
            
        } 
        
    } //end getColor function
    
    // D3 MAP AND VIZ
    
    var width = $('#map').width(),
        height = $('#map').height();
    
    var projection = d3.geo.mercator()
        .center([-3.994, 51.70])
        .translate([width / 2, height / 2]);
    
    if(width < 768) {
        projection.scale(width * 85);
    } else {
        projection.scale(width * 65);
    }
    
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
        .defer(d3.json, '/data/swanlinx-data.geojson')
        .defer(d3.json, '/data/pop_places.geojson')
        .await(makeMap);
    
    
    function makeMap(error, hexTopo, regTopo, data, places) {
        
        if (error) throw error;
        
        var hexGrid = topojson.feature(hexTopo, hexTopo.objects.hex_grid);
        var regions = topojson.feature(regTopo, regTopo.objects.ua_regions);
        
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
                fill: bgColor,
                opacity: bgOpacity,
                stroke: 'rgb(84,84,84)',
                strokeOpacity: bgOpacity,
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
                fill: bgColor,
                opacity: bgOpacity,
                stroke: white,
                strokeOpacity: whiteOpacity,
                'stroke-width': '1px'
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
                    return getColor(d.properties.bmi_male, 'bmi_male');
                },
                stroke: white,
                'stroke-width': '1px',
                strokeOpacity: whiteOpacity
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
        
        
        // MAP LEGEND/ANNOTATION 
    
        
       
        
    } // end makeMap function
    
    function updateData(layerID) {
          
        d3.selectAll('.hexBin')
            .transition()
            .duration(600)
            .ease('quad-in-out')
            .style({
                fill: function(d) {
                    return getColor(d.properties[layerID], layerID);
                }        
            });
        
    } // end updateData function
   
    function updateLegend(data, layer) {
            
            var legendGroup = g.append('g')
                .attr({
                    class: 'legend'
                });
//            legendGroup.selectAll('rect.legend')
//                .data(data)
//                .enter().append('rect')
//                .attr({
//                    class: 'legend',
//                    x: 24,
//                    y: function(d, i){ 
//                        return i *  20;
//                    },
//                    width: 10,
//                    height: 10
//                })
//                .style({
//                   fill: function(d) {
//                       return getColor(d.properties.bmi_male, 'bmi_male');
//                   } 
//                });
            
            
    }
    
    
    // RESIZE FUNCTION
    
    $(window).resize(function() {
        var w = $('#map').width(),
            h = $('#map').height();
        
        svg.attr('width', w);
        svg.attr('height', h);
        
        projection.translate([w / 2, h / 2])
        
        if(w < 768) {
            projection.scale(w * 85);
        } else {
            projection.scale(w * 65);
        }
        
        
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