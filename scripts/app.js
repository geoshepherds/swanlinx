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
    
    
    
    
    // GLOBAL VARIABLES //
    
    
    var bgColor = 'rgb(193,193,193)',
        noData = 'rgb(215,215,215)',
        white = 'rgb(250,250,250)',
        bgOpacity = .4,
        whiteOpacity = .4,
        colorScale,
        legendGroup,
        legendTitle,
        legendLabel,
        legendSpacing = 4,
        legendRectSize = 18;
    
    
    var h,
        legH,
        windH,
        vertTop = 0,
        vert = 0,
        horz;
    
    
    // GET COLOR FUNCTION //
    
    
    function getColor(data, layer) {
        
        if(data != null) {
            
            if(layer === 'bmi_male') {
               
                legendLabel = ['Underweight', 'Healthy Weight', 'Overweight', 'Obese'];
                colorScale = d3.scale.threshold()
                    .domain([0, 14, 19, 22])
                    .range([
                        noData,
                        colorbrewer.RdYlGn[3][1],
                        colorbrewer.RdYlGn[4][3],
                        colorbrewer.RdYlGn[4][1],
                        colorbrewer.RdYlGn[4][0]
                    ]);

                updateLegend(); // call update legend function
                return colorScale(data);

            } else if(layer === 'bmi_female') {
                
                legendLabel = ['Underweight', 'Healthy Weight', 'Overweight', 'Obese'];
                colorScale = d3.scale.threshold()
                    .domain([0, 14, 20, 24])
                    .range([
                        noData,
                        colorbrewer.RdYlGn[3][1],
                        colorbrewer.RdYlGn[4][3],
                        colorbrewer.RdYlGn[4][1],
                        colorbrewer.RdYlGn[4][0]
                    ]);

                updateLegend(); // call update legend function
                return colorScale(data);

            } else if(layer === 'grip_male' || layer === 'grip_female') {

                legendLabel = ['< 7', '7 - 15', '15 - 21', '21 - 31', '> 31'];
                colorScale = d3.scale.threshold()
                    .domain([0, 7, 15, 21, 31])
                    .range([
                        noData,
                        colorbrewer.RdYlGn[5][0],
                        colorbrewer.RdYlGn[5][1],
                        colorbrewer.RdYlGn[5][3],
                        colorbrewer.RdYlGn[5][4],
                        colorbrewer.RdYlGn[5][5]
                    ]);

                updateLegend(); // call update legend function
                return colorScale(data);


            } else if(layer === 'fitness' || layer === 'health') {

                legendLabel = ['Very Unhappy', 'Unhappy', 'Okay', 'Happy', 'Very Happy'];
                colorScale = d3.scale.threshold()
                    .domain([0, 1.5, 2.5, 3.5, 4.5])
                    .range([
                        noData,
                        colorbrewer.RdYlGn[5][0],
                        colorbrewer.RdYlGn[5][1],
                        colorbrewer.RdYlGn[5][2],
                        colorbrewer.RdYlGn[5][3],
                        colorbrewer.RdYlGn[5][5]
                    ]);

                updateLegend(); // call update legend function
                return colorScale(data); 


            } else if(layer === 'bleep_male') {
                
                legendLabel = ['< 13', '13 - 32', '32 - 52', '52 - 72', '> 72'];
                colorScale = d3.scale.threshold()
                    .domain([0, 13, 32, 52, 72])
                    .range([
                        noData,
                        colorbrewer.RdYlGn[5][0],
                        colorbrewer.RdYlGn[5][1],
                        colorbrewer.RdYlGn[5][2],
                        colorbrewer.RdYlGn[5][3],
                        colorbrewer.RdYlGn[5][5]
                    ]);

                updateLegend(); // call update legend function    
                return colorScale(data);  

            } else if(layer === 'bleep_female') {

                legendLabel = ['< 7', '7 - 24', '24 - 44', '44 - 64', '> 64'];
                colorScale = d3.scale.threshold()
                    .domain([0, 7, 24, 44, 64])
                    .range([
                        noData,
                        colorbrewer.RdYlGn[5][0],
                        colorbrewer.RdYlGn[5][1],
                        colorbrewer.RdYlGn[5][2],
                        colorbrewer.RdYlGn[5][3],
                        colorbrewer.RdYlGn[5][5],
                    ]);

                updateLegend(); // call update legend function
                return colorScale(data);                      

            } else if(layer === 'sleep_time') {
                
                legendLabel = ['< 5.5', '5.5 - 6.5', '6.5 - 7.5', '7.5 - 10.5', '10.5 - 12', '12 - 13', '13 - 14.5'];
                colorScale = d3.scale.threshold()
                    .domain([0, 5.5, 6.5, 7.5, 10.5, 12, 13])
                    .range([
                        noData,
                        colorbrewer.RdYlGn[4][0],
                        colorbrewer.RdYlGn[4][1],
                        colorbrewer.RdYlGn[4][2],
                        colorbrewer.RdYlGn[4][3],
                        colorbrewer.RdYlGn[4][2],
                        colorbrewer.RdYlGn[4][1], 
                        colorbrewer.RdYlGn[4][0]
                    ]);

                updateLegend(); // call update legend function
                return colorScale(data); 

            } else if(layer === 'fruit_avg') {

                legendLabel = ['< 1', '1-3', '3-6', '> 6'];
                colorScale = d3.scale.threshold()
                    .domain([0, 1, 3, 6])
                    .range([
                        noData,
                        colorbrewer.RdYlGn[4][0],
                        colorbrewer.RdYlGn[4][1],
                        colorbrewer.RdYlGn[4][2],
                        colorbrewer.RdYlGn[4][3],
                    ]);

                updateLegend(); // call update legend function
                return colorScale(data); 

            } else if(layer === 'fizzy_drinks') {            

                legendLabel = ['Yes', 'No'];
                colorScale = d3.scale.ordinal()
                    .domain([1, 2])
                    .range([colorbrewer.RdYlGn[4][0], colorbrewer.RdYlGn[4][3]]);

                updateLegend(); // call update legend function
                return colorScale(data);        

            } 
            
        } else {
            
            return noData;
            
        } // end null data check
    
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
        .defer(d3.json, 'data/hex_grid.json')
        .defer(d3.json, 'data/ua_regions.json')
        .defer(d3.json, 'data/swanlinx-data.geojson')
        .defer(d3.json, 'data/pop_places.geojson')
        .await(makeMap);
    
    
    // BEGIN MAKEMAP FUNCTION //
    
    function makeMap(error, hexTopo, regTopo, data, places) {
        
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
        
        
    
        // MAP SWANLINX DATA //
        
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
        
        // PLACE LABELS //
        
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
                    return  place === 'city' ? 4 :
                            place === 'town' ? 2 :
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
                fill: '#373a3c',
                opacity: .8
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
            })
            .style({
                fill: '#373a3c',
                opacity: .8,
                'font-size': function(d) {
                    var place = d.properties.place;
                    
                    if(width > 768) {
                        return  place === 'city' ? '14px' :
                            place === 'town' ? '12px' :
                            0; 
                    } else {
                        return  place === 'city' ? '12px' :
                            place === 'town' ? '10px' :
                            0; 
                    }
                    
                }
            });
        
        placeGroup.selectAll(".place-label")
            .attr('x', function(d) { 
                return d.geometry.coordinates[0] > -3.9 ? 6 : -6; 
            })
            .style('text-anchor', function(d) { 
                return d.geometry.coordinates[0] > -3.9 ? 'start' : 'end'; 
            });
        
        
        $('.pre-loader').addClass('hidden');
        
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
    
    
    // MAP LEGEND/ANNOTATION //
   
    function updateLegend() {
    
        
        d3.selectAll('g.legend').remove();
        
        legendGroup = g.selectAll('g.legend')
            .data(colorScale.domain())
            .enter().append('g')
            .attr({
                class: 'legend',
                transform: function(d, i) {
                    
                    if (width > 768) {
                        windH = (height - 24) - legH; 
                        horz = 24;
                    } else {
                        windH = (height) - legH;
                        horz = 0;
                    }
                    
                    h = legendRectSize,
                    legH = colorScale.domain().length * h,
                    vertTop = (0 * h) + windH,    
                    vert = (i * h) + windH;    
                    
                    return 'translate(' + horz + ',' + vert + ')';
                }
            });
        
        legendGroup.append('rect')                                     
            .attr({
                width: legendRectSize,
                height: legendRectSize
            })                         
            .style({
                fill: colorScale,
                stroke: colorScale
            });                                

        legendGroup.append('text')                                     
            .attr({
                x: legendRectSize + legendSpacing,
                y: legendRectSize - legendSpacing
            })
            .text(function(d, i) { 
                return legendLabel[i]; 
            })
            .style({
                fontSize: '11px'
            }); 
        
        
        
    } // end updateLegend function
    
    
    
    // RESIZE FUNCTION //
    
    $(window).resize(function() {
        var ww = $('#map').width(),
            wh = $('#map').height();
        
        height = wh;
        
        svg.attr('width', ww);
        svg.attr('height', wh);
        
        projection.translate([ww / 2, wh / 2])
        
        if(ww < 768) {
            projection.scale(ww * 85);
        } else {
            projection.scale(ww * 65);
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
            })
            .style({
                'font-size': function(d) {
                    var place = d.properties.place;
                    
                    if(width > 768) {
                        return  place === 'city' ? '14px' :
                            place === 'town' ? '12px' :
                            0; 
                    } else {
                        return  place === 'city' ? '12px' :
                            place === 'town' ? '10px' :
                            0; 
                    }  
                }
            });
        d3.selectAll('g.legend')
            .attr({
                transform: function(d, i) {
                    
                    if (ww > 768) {
                        windH = (height - 24) - legH; 
                        horz = 24;
                    } else {
                        windH = (height) - legH;
                        horz = 0;
                    }
                    
                    h = legendRectSize,
                    legH = colorScale.domain().length * h,
                    vertTop = (0 * h) + windH,    
                    vert = (i * h) + windH;  
                    
                    return 'translate(' + horz + ',' + vert + ')';
                }
            });
        d3.select('.legTitle').attr({
            transform: 'translate(' + (horz - 24) + ',' + (vertTop - 36) + ')'
        });
        
    }); // end resize function
    
    
}); // end document ready function