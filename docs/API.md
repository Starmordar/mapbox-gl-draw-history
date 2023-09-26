# API Reference

To use Draw History Plugin

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
```

**Plugin only works after the Mapbox GL JS map has loaded**, so you must interact with plugin only *after* your map's `load` event:

```js
map.on('load', function() {
  draw.add({ .. });
});
```


**Parameters**

-   `draw` **[MapboxDraw](https://github.com/mapbox/mapbox-gl-draw/tree/main)** instance
-   `options` All of the following options are optional.
    -   `options.keybindings` boolean (default `false`): Whether or not to enable keyboard interactions. `Ctrl+Z` triggers **[undo](https://github.com/Starmordar/mapbox-gl-draw-history/blob/main/docs/API.md#undo-void)**, `Ctrl+Y` triggers **[redo](https://github.com/Starmordar/mapbox-gl-draw-history/blob/main/docs/API.md#redo-void)**
    -   `options.controls`, boolean (default `true`): Hide or show undo/redo controls.
    -   `options.listeners` boolean (default `true`): Whether or not to enable history changes by mapbox draw **[events](https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md#events)** 
        (Note: **If you programmatically invoke a function in the Draw API, any event that directly corresponds with that function will not be fired**)


## API Methods

`new MapboxDrawHistory()` returns an instance of DrawHistory with the following API:

### `getCurrentState(): Array<GeoJSON.Feature>`
Returns current history state as an array of geojson features.

Example: 
```js
const featureIds = draw.add({ type: 'Point', coordinates: [2, 2] });
console.log(drawHistory.getCurrentState());
```

---
### `operation(fn: (history: GeoJSON.Feature[]) => GeoJSON.Feature[]): boolean`
Push a new version to the list of history. An operation function takes a current version of data and returns a new one.

Example
```js
function addFeature(feature: GeoJSON.Feature[]) {
    drawHistory.operation(data => [...data, feature]);
}
```

---
### `undo(): void`
Triggers history undo, have no effect if we're at the beginning of the stack

Example:

```js
drawHistory.operation(data => [...data, { type: 'Point', coordinates: [0, 0] }]);
console.log(drawHistory.getCurrentState()); // [{ type: 'Point', coordinates: [0, 0] }]
drawHistory.undo();
console.log(drawHistory.getCurrentState()); // []
```

---
### `redo(): void`
Triggers history redo, have no effect if we're at the end of the stack

Example:

```js
drawHistory.operation(data => [...data, { type: 'Point', coordinates: [1, 0] }]);
drawHistory.undo();
console.log(drawHistory.getCurrentState()); // []
drawHistory.redo();
console.log(drawHistory.getCurrentState()); // [{ type: 'Point', coordinates: [1, 0] }]
```

---
### `hasUndo(): boolean`
Returns false if we're at the beginning of the stack
```js
console.log(drawHistory.hasUndo()); // false
drawHistory.operation(data => [...data, { type: 'Point', coordinates: [1, 0] }]);
console.log(drawHistory.hasUndo()); // true
```

---
### `hasRedo(): boolean`
Returns false if we're at the end of the stack
```js
drawHistory.operation(data => [...data, { type: 'Point', coordinates: [1, 0] }]);
console.log(drawHistory.hasRedo()); // false
drawHistory.undo();
console.log(drawHistory.hasRedo()); // true
```
