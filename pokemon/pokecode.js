//Reusable async function to fetch data from URL

async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch(error) {
        console.error(error)
    }
}


//now, use async getAPIData function

function loadPage() {
    getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=25`).then
    (async (data) => {
        for (const pokemon of data.results) {
            await getAPIData(pokemon.url).then((pokeData) => {
                console.log(pokeData)
                populatePokeCard(pokeData)
            })
        }
    })
}

const pokemonGrid = document.querySelector('.pokemonGrid')
const loadButton = document.querySelector('button')

loadButton.addEventListener('click', () => {
    loadPage()
    loadButton.disabled = true
})




function populatePokeCard(pokemon) {
    let pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    let pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () => {
        pokeCard.classList.toggle('is-flipped')
    })
    pokeCard.appendChild(populateCardFront(pokemon))
    pokeCard.appendChild(populateCardBack(pokemon))
    pokeScene.appendChild(pokeCard)
    pokemonGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
    let cardFront = document.createElement('div')
    cardFront.className = `card-face card-face-front`
    let frontLabel = document.createElement('p')
    let frontImage = document.createElement('img')
    frontLabel.textContent = pokemon.name
    frontImage.src = `../images/pokemon/${getImageFileName(pokemon)}.png`
    cardFront.appendChild(frontImage)
    cardFront.appendChild(frontLabel)
    return cardFront
}

function populateCardBack(pokemon) {
    let cardBack = document.createElement('div')
    cardBack.className = `card-face card-face-back`
    let backLabel = document.createElement('h3')
    backLabel.textContent = `Abilities:`
    let abilityList = document.createElement('ul')
    pokemon.abilities.forEach(ability => {
        let abilityName = document.createElement('li')
        abilityName.textContent = ability.ability.name
        abilityList.appendChild(abilityName)
    })
    let movesLabel = document.createElement('h3')
    movesLabel.textContent = 'Most Accurate Moves:'
    let moveAccuracy = document.createElement('h4')
    const mmostAccurateMove = getBestAccuracy(pokemon.moves)
   // moveAccuracy.textContent = `${mostAccurateMove.move.name}`
    cardBack.appendChild(backLabel)
    cardBack.appendChild(abilityList)
    cardBack.appendChild(movesLabel)
    cardBack.appendChild(moveAccuracy)
    return cardBack
}

function getBestAccuracy(pokemoves) {
    return pokemoves.reduce((mostAccurate, move) => {
        getAPIData(move.move.url).then
        (async (data) => {
            console.log(data.accuracy, data.power)
        })
    }, {});
}

function getImageFileName(pokemon) {
    if (pokemon.id < 10) {
        return `00${pokemon.id}`
    } else if (pokemon.id > 9 && pokemon.id <99) {
        return `0${pokemon.id}`
    }
}

function Pokemon(name, height, weight, abilities) {
    this.name = name
    this.height = height
    this.weight = weight
    this.abilities = abilities
    this.id = 900
}





/* function Pokemon(name, height, weight, abilities) {
    this.name = name
    this.height = height
    this.weight = weight
    this.abilities = abilities
    this.id = 900
}

let yessimon = new Pokemon('Yessimon', 450, 200, ['cry', 'sleep'])
console.log(yessimon) /* */