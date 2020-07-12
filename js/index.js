$(function(){
    
    

});

function setChart(data){
    var maxValue = 100; 
    var barWidth = 160;
    var nameWidth = 60;

    var chart = d3.select('#chart-container')
                  .attr('class', 'horizontal-bar')
                  .append('svg')
                  .attr('height', 115)


    // Create the svg:defs element and the main gradient definition.
    var svgDefs1 = chart.append('defs');
    var svgDefs2 = chart.append('defs');
    var mainGradient1 = svgDefs1.append('linearGradient')
                            .attr('id', 'mainGradient1');
                        mainGradient1.append('stop')
                            .attr('class', 'stop-left')
                            .attr('offset', '0');
                        mainGradient1.append('stop')
                            .attr('class', 'stop-right')
                            .attr('offset', '1');
    var mainGradient2 = svgDefs2.append('linearGradient')
                            .attr('id', 'mainGradient2');
                        mainGradient2.append('stop')
                            .attr('class', 'stop-left-active')
                            .attr('offset', '0');
                        mainGradient2.append('stop')
                            .attr('class', 'stop-right-active')
                            .attr('offset', '1');

    chart.selectAll('rect')
         .data(data)
         .enter()
         .append('rect')
            .attr('x', nameWidth)
            .attr('y', function(d, i) { return i * 20 + 10; })
            .attr('width', 0)
            .attr('height', 10)     
            .attr('rx', 5)
            .attr('ry', 5)
            .attr('fill', function(d, i) { return i ? 'url(#mainGradient1)' : 'url(#mainGradient2)'; })
         .transition()
            .duration(600)
            .attr('width', function(d) { return (d.value / maxValue) * barWidth; })

    chart.selectAll('text.labels')
         .data(data)
         .enter()
         .append('text')
           .attr('x', 0)
           .attr('y', function(d, i) { return i * 20 + 20; })
           .attr('width', nameWidth)
           .attr('height', 15)
           .text(function(d) { return d.name });

    chart.selectAll('text.values')
         .data(data)
         .enter()
         .append('text')
           .attr('x', nameWidth)
           .attr('y', function(d, i) { return (i * 20) + 20; })
           .attr('width', 50)
           .attr('height', 15)
           .attr('fill', function(d, i) { return i ? '#4cb8c4' : '#dd5e89'; })
           .text(function(d) { return d3.format(',f')(d.value) + "%" })
         .transition()
           .duration(600)
           .attr('x', function(d) { return ((d.value / maxValue) * barWidth ) + nameWidth + 10; })
}