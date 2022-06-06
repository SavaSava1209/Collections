const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

const url = `https://api.unsplash.com/photos/?client_id=lT9iqjYzUX0M51lftI9hgOsCPtpPDmV2T2I9SzLGhJk`

async function getPhotos() {
    try{
        const response = await fetch(url)
        let photosArray = await response.json()
        console.log(photosArray) 
    } catch(error) {
        console.log(error)
    }   
}

getPhotos()