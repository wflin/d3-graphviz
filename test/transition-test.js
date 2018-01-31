var tape = require("tape");
var jsdom = require("./jsdom");
var d3 = require("d3-selection");
var d3_transition = require("d3-transition");
var d3_graphviz = require("../");

tape("graphviz().render() adds and removes SVG elements after transition delay.", function(test) {

    var window = global.window = jsdom('<div id="graph"></div>');
    var document = global.document = window.document;

    function transition_test(transition1, next_test) {

        var graphviz = d3_graphviz.graphviz("#graph");

        graphviz
            .tweenShapes(false)
            .zoom(false)
            .transition(transition1)
            .dot('digraph {a -> b; c}')
            .render()
            .on("end", part1_end);

        function part1_end() {
            test.equal(d3.selectAll('.node').size(), 3, 'Number of initial nodes');
            test.equal(d3.selectAll('.edge').size(), 1, 'Number of initial edges');
            test.equal(d3.selectAll('polygon').size(), 2, 'Number of initial polygons');
            test.equal(d3.selectAll('ellipse').size(), 3, 'Number of initial ellipses');
            test.equal(d3.selectAll('path').size(), 1, 'Number of initial paths');

            graphviz
                .dot('digraph {a -> b; b -> a}')
                .transition(transition1)
                .fade(false)
                .tweenPaths(false)
                .on("renderEnd", part2_end)
                .on("end", part3_end)
                .render();
        }

        function part2_end() {
            test.equal(d3.selectAll('.node').size(), 3, 'Number of nodes immediately after rendering');
            test.equal(d3.selectAll('.edge').size(), 1, 'Number of edges immediately after rendering');
            test.equal(d3.selectAll('polygon').size(), 3, 'Number of polygons immediately after rendering');
            test.equal(d3.selectAll('ellipse').size(), 3, 'Number of ellipses immediately after rendering');
            test.equal(d3.selectAll('path').size(), 2, 'Number of paths immediately after rendering');
        }

        function part3_end() {

            test.equal(d3.selectAll('.node').size(), 2, 'Number of nodes after transition');
            test.equal(d3.selectAll('.edge').size(), 2, 'Number of edges after transition');
            test.equal(d3.selectAll('polygon').size(), 3, 'Number of polygons after transition');
            test.equal(d3.selectAll('ellipse').size(), 2, 'Number of ellipses after transition');
            test.equal(d3.selectAll('path').size(), 2, 'Number of paths after transition');

            if (next_test) {
                next_test();
            } else {
                test.end();
            }
        }
    }

    function transition_instance_test() {
        transition1 = d3_transition.transition().duration(0);
        transition_test(transition1, transition_function_test);
    }

    function transition_function_test() {
        transition_test(function() {
            return d3_transition.transition().duration(0);
        });
    }

    transition_instance_test();
});
