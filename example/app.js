function getURLSearchParam(name) {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(name);
}

function getAccessToken() {
    const accessToken = (getURLSearchParam('access_token') || localStorage.getItem('accessToken'));
    localStorage.setItem('accessToken', accessToken);

    return accessToken;
}

mapboxgl.accessToken = getAccessToken();
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v8',
  center: [29.898, -2.054],
  zoom: 10,
});

map.addControl(new mapboxgl.NavigationControl(), 'top-left');

const Draw = new MapboxDraw();
map.addControl(Draw, 'bottom-right');

import fnc from '/dist/lib/index.js'
fnc();