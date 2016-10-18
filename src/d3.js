/**
 * Our local d3 build. This is so we can use it as we expect:
 * d3.scaleLinear, d3.line, d3.nest, etc.
 */
import * as array from 'd3-array';
import * as axis from 'd3-axis';
import * as collection from 'd3-collection';
import * as color from 'd3-color';
import * as format from 'd3-format';
import * as scale from 'd3-scale';
import * as selection from 'd3-selection';
import * as shape from 'd3-shape';
import * as transition from 'd3-transition';
import * as voronoi from 'd3-voronoi';

const d3 = Object.assign({},
  array,
  axis,
  collection,
  color,
  format,
  scale,
  selection,
  shape,
  transition,
  voronoi,
);

// put d3 in the global window for convenience
window.d3 = d3;

export default d3;
