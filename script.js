const quoteText = document.getElementById('text-box')
const inputText = document.getElementById('input-text')
const timerElement = document.getElementById('timer')

inputText.addEventListener('input',() =>{
  const arrayQuote = quoteText.querySelectorAll('span')
  const arrayValue = inputText.value.split('')
  let correct = true
  arrayQuote.forEach((characterSpan,index)=>{
    const character = arrayValue[index]
    if(character == null){
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    }
    else if(character === characterSpan.innerText){
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    }else{
      characterSpan.classList.add('incorrect')
      characterSpan.classList.remove('correct')
      correct = false
    }
  })
  if(correct) newQuote()
})


let apiQuotes=[]
async function getQuotes(){

    const apiUrl = "https://type.fit/api/quotes"

  try {
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
    newQuote()
  } catch (error) {
      console.log(error)
  } 
}

function newQuote(){
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)]
    console.log(quote)

   quoteText.textContent = '';
   quote.text.split('').forEach(character =>{
     const characterSpan = document.createElement('span')
     characterSpan.innerText = character
     quoteText.appendChild(characterSpan)
    })
   inputText.value = null
   startTimer()
   
}

let startTime
function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timerElement.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

getQuotes()
