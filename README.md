<a href="https://www.npmjs.com/package/mapbox-gl-draw-history">
  <img src="https://badgen.net/npm/v/mapbox-gl-draw-history" alt="npm package">
</a>

# mapbox-gl-draw-history

History plugin for [mapbox-gl-draw](https://github.com/mapbox/mapbox-gl-draw).

![screen-capture](https://github.com/Starmordar/mapbox-gl-draw-history/assets/31778230/6974eaa8-e301-4b0f-b2eb-b34d4a8bc912)


**Requires [mapbox-gl-js](https://github.com/mapbox/mapbox-gl-js) and [mapbox-gl-draw](https://github.com/mapbox/mapbox-gl-draw)**

### Installing

```
npm install mapbox-gl-draw-history
```

Package ships with CSS, make sure you include it in your build.


### Usage in your application

#### JavaScript
```js
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import MapboxDrawHistory from "mapbox-gl-draw-history";
```

#### CSS

 ```js
import "mapbox-gl-draw-history/dist/mapbox-gl-draw-history.css";
 ```



### Example usage

```js
mapboxgl.accessToken = 'YOUR_ACCESS_TOKEN';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [40, -74.50],
  zoom: 9
});

const Draw = new MapboxDraw();
map.addControl(Draw, 'top-left');

const DrawHistory = new MapboxDrawHistory(Draw, { keybindings: true });
map.addControl(DrawHistory, 'top-left');

map.on('load', function() {
  // ALL YOUR APPLICATION CODE
});
```

### See [API.md](https://github.com/Starmordar/mapbox-gl-draw-history/blob/main/docs/API.md) for complete reference.

### Developing and testing

Install dependencies, build the source files and crank up a server via:

```
git clone git@github.com:Starmordar/mapbox-gl-draw-history.git
npm install
npm run start-server & open "http://localhost:3000/example/?access_token=<token>"
```

### Publishing

To GitHub and NPM:

```
npm version (major|minor|patch)
git push --tags
git push
npm publish
```

