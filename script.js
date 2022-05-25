let quoteContainer = document.getElementById('quote-container');
let quoteText = document.getElementById('quote');
let authorText = document.getElementById('author')
let twitterBtn = document.getElementById('twitter')
let newQuoteBtn = document.getElementById('new-quote')
let loader = document.getElementById('loader')

let apiQuotes = []

function newQuote() {
    let quote =  apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    if (quote.author === null) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author
    }

    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text
}

async function getQuotes() {
    loading()
    const url = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(url)       
        apiQuotes = await response.json() 
        newQuote()
    
    } catch(error) {
        console.log(error)
    }
    complete()
}

// Tweet Quote 
function  tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

// loading 
function loading() {
    quoteContainer.hidden = true
    loader.hidden = false
} 

function complete() {
    quoteContainer.hidden = false
    loader.hidden = true
}
// event listener
newQuoteBtn.addEventListener('click', getQuotes)
twitterBtn.addEventListener('click', tweetQuote)

// on Load
getQuotes()

