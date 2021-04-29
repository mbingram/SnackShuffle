const apiURL = "http://localhost:3000/middleman"
const mapURL = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
const mymap = L.map('mapid').setView([39.7392, -104.9903], 13);

L.tileLayer(mapURL, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibGltaXR0b2luZmluaXR5IiwiYSI6ImNrYmJzamt3dDA0YnQzMG1vbWh3NGIzaTEifQ.r2cKsjXwwnn6UiRRb_LHUA'
}).addTo(mymap);

const displayDiv = document.querySelector('#display-restaurant')

function randomRestaurant() {
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        displayDiv.innerHTML = ""
        const businessesObject = data["businesses"]
        console.log(businessesObject)
        const randomIndex = Math.floor(Math.random() * businessesObject.length);
        const place = businessesObject[randomIndex];

        const imgURL = document.createElement('img')
        imgURL.src = place.image_url

        const ul = document.createElement('ul')
        const restaurantName = document.createElement('h2')
        restaurantName.textContent = place.name

        const rating = document.createElement('li')
        rating.textContent = `Rating: ${place.rating} /5`

        const phone = document.createElement('li')
        phone.textContent = place.display_phone

        const address = document.createElement('li')
        const location = place.location
        address.textContent = location["address1"]

        const categoryItem = document.createElement('li')
        const category = place["categories"]
        categoryItem.textContent = `Category: ${category["0"].title}`

        const link = document.createElement('p')
        link.innerHTML = `<a href="${place.url}">Reviews and More</a>`

        ul.append(restaurantName, address, categoryItem, rating, phone, link)
        displayDiv.append(imgURL, ul)

        const coordinates = place["coordinates"]
        const latitude = coordinates["latitude"]
        const longitude = coordinates["longitude"]
        const marker = L.marker([latitude, longitude]).addTo(mymap)
        marker.bindPopup(`${place.name}`).openPopup();
    })
}

const shuffleButton = document.querySelector('#random-button')
shuffleButton.addEventListener('click', (event) => {
    randomRestaurant()
})

