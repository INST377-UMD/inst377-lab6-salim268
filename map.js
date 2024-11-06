const map = L.map('map').setView([37.0902, -95.7129], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to generate random coordinates within a range
function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const coordinates = [
  { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) },
  { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) },
  { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) }
];

const markersInfo = document.getElementById('markers-info');

coordinates.forEach((coord, index) => {
  const marker = L.marker([coord.lat, coord.lng]).addTo(map);

  const markerText = document.createElement('div');
  markerText.classList.add('marker-info');
  markerText.innerHTML = `<strong>Marker ${index + 1}: Latitude: ${coord.lat}, Longitude: ${coord.lng}</strong>`;

  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coord.lat}&longitude=${coord.lng}&localityLanguage=en`)
    .then(response => response.json())
    .then(data => {
      const localityText = document.createElement('p');
      localityText.innerText = `Locality: ${data.locality || 'Unknown'}`;
      markerText.appendChild(localityText);
      markersInfo.appendChild(markerText);
    })
    .catch(error => console.error('Error fetching locality:', error));
});
