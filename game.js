// @ts-check

let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let playAgainButton = document.querySelector('#play-again')

let worldBankUrl = "https://api.worldbank.org/v2/country/"

// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array of country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files as one big file, o
// organized in the order of the script tags so the countriesAndCodes array is available to this script.

console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available

let country
let code 
let newQuiz = true


// TODO when the page loads, select an element at random from the countriesAndCodes array
function randomizeCountry(){
    let countryObj = countriesAndCodes[Math.floor(Math.random()*countriesAndCodes.length)]
    country = countryObj["name"]
    code = countryObj["alpha-2"]
    
}
// TODO display the country's name in the randomCountryElement

function refreshDisplay(newQuiz){
    randomizeCountry()
    if (newQuiz == true){
        randomCountryElement.innerHTML = country
        resultTextElement.innerHTML = `What's the capital of ${country}?`
        userAnswerElement.value = ""
        console.log(country, code, newQuiz )


    }
}

refreshDisplay(newQuiz)

// TODO add a click event handler to the submitButton.  When the user clicks the button,
//  * read the text from the userAnswerElement 
//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message. 
//  * If the API call was successful, extract the capital city from the World Bank API response.
//  * Compare it to the user's answer. 
//      You can decide how correct you require the user to be. At the minimum, the user's answer should be the same
//      as the World Bank data - make the comparison case insensitive.
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein 
//  * Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong. 
//      For example "Correct! The capital of Germany is Berlin" or "Wrong - the capital of Germany is not G, it is Berlin"

submitButton.addEventListener("click",checkAnswer)

function checkAnswer() {
    let answer = userAnswerElement.value
      
    fetch(worldBankUrl+code+"?format=json")
    .then( response => response.json() )
    .then( wbCountry => {

        console.log(wbCountry)
        let wbCountryCapital = wbCountry[1][0].capitalCity

        let levDistance = Levenshtein.get(answer,wbCountryCapital)
        console.log(wbCountryCapital, answer, levDistance)

        if (levDistance <3){
            resultTextElement.innerHTML = `Correct! The capital of ${country} is ${wbCountryCapital}`
        } else {
            resultTextElement.innerHTML = `Incorrect! The capital of ${country} is ${wbCountryCapital}, not ${answer}`
        }
        
    }).catch( error => {
        alert('oops! something went wrong')  // user friendly - most users can't do anything about a stack trace
        console.log(error)  // for the developer to debug the app
    })
}
// TODO finally, connect the play again button. Clear the user's answer, select a new random country, 
// display the country's name, handle the user's guess. If you didn't use functions in the code you've 
// already written, you should refactor your code to use functions to avoid writing very similar code twice.
playAgainButton.addEventListener("click", function() {refreshDisplay(newQuiz)})
