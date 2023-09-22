function getURLSearchParam(name) {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(name);
}

function getAccessToken() {
  const accessToken = getURLSearchParam('access_token') || localStorage.getItem('accessToken');
  localStorage.setItem('accessToken', accessToken);

  return accessToken;
}

const mapboxgl = window.mapboxgl;
mapboxgl.accessToken = getAccessToken();
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v8',
  center: [29.898, -2.054],
  zoom: 10,
});

map.addControl(new mapboxgl.NavigationControl(), 'top-left');

const Draw = new window.MapboxDraw();
map.addControl(Draw, 'top-right');
console.log('Draw :>> ', Draw);

const DrawHistory = new window.MapboxDrawHistory();
map.addControl(DrawHistory, 'top-right');

console.log('DrawHistory :>> ', DrawHistory.history.history);
