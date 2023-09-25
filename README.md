# mapbox-gl-draw-history

History plugin for [mapbox-gl-draw](https://github.com/mapbox/mapbox-gl-draw) maps.

**Requires [mapbox-gl-js](https://github.com/mapbox/mapbox-gl-js) and [mapbox-gl-draw](https://github.com/mapbox/mapbox-gl-draw)**

### Installing

```
npm install mapbox-gl-draw-history
```

Package ships with CSS, make sure you include it in your build.

### Example usage

```js
mapboxgl.accessToken = 'YOUR_ACCESS_TOKEN';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [40, -74.50],
  zoom: 9
});

var Draw = new MapboxDraw();
map.addControl(Draw, 'top-left');

const DrawHistory = new MapboxDrawHistory(Draw, { keybindings: true });
map.addControl(DrawHistory, 'top-left');

map.on('load', function() {
  // ALL YOUR APPLICATION CODE
});
```
