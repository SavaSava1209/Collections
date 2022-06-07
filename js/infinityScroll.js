const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')
// const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
let initialCount = 5
const apiKey = ''
let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`
let photosArray = []
let ready = false
let totalImage = 0
let imagesCount = 0
let isInitialLoad = true

function imagesLoaded() {
    imagesCount++    
    if (totalImage === imagesCount) {
        ready = true
        loader.hidden = true
    }
}

function updateURLWithNewCount(count) {
    url = `https://api.unsplash.com/photos/random/?client_id=lT9iqjYzUX0M51lftI9hgOsCPtpPDmV2T2I9SzLGhJk&count=${count}`
}

async function getPhotos() {
    try{
        const response = await fetch(url)
        photosArray = await response.json()
        displayPhotos()
        if (isInitialLoad) {
            updateURLWithNewCount(30)
            isInitialLoad = false
        }
        
    } catch(error) {
        console.log(error)
    }   
}

function displayPhotos() {
    imagesCount = 0
    totalImage = photosArray.length
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
        img.addEventListener('load', imagesLoaded)
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
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()
    }
})

getPhotos()