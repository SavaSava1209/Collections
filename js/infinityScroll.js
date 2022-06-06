const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')
// const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const url = `https://api.unsplash.com/photos/random/?client_id=lT9iqjYzUX0M51lftI9hgOsCPtpPDmV2T2I9SzLGhJk&count=10`
let photosArray = []

async function getPhotos() {
    try{
        const response = await fetch(url)
        photosArray = await response.json()
        displayPhotos()
        
    } catch(error) {
        console.log(error)
    }   
}

function displayPhotos() {
    photosArray.forEach((photo) => {
        const item = document.createElement('a')
        // item.setAttribute('href', photo.links.html)
        // item.setAttribute('target', '_blank')
        setAttributes(item, {
            'href': photo.links.html,
            'target': '_blank'
        })
        const img = document.createElement('img')
        // img.setAttribute('src', photo.urls.regular)
        // img.setAttribute('alt', photo.alt_description)
        // img.setAttribute('title', photo.alt_description)
        setAttributes(img, {
            'src': photo.urls.regular,
            'alt': photo.alt_description,
            'title': photo.alt_description
        })

        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// keep loading more photos if scroll to the bottom
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        getPhotos()
    }
})

getPhotos()