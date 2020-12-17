

//DATA IMPORT
import {senators} from '../data/senators.js'
import {removeChildren} from '../util/index.js'


// CONST FOR BUTTONS
const senateGrid = document.querySelector('.senateGrid')
const demButton = document.querySelector('#demButton')
const repButton = document.querySelector('#repButton')
const indButton = document.querySelector('#indButton')
//const stateButton = document.querySelector('#stateButton')


//EVENT LISTENERS FOR PARTY AND STATE BUTTONS
const democrats = senators.filter((senator) => senator.party === 'D')
demButton.addEventListener('click', () => populateSenateGrid(democrats))

const republicans = senators.filter((senator) => senator.party === 'R')
repButton.addEventListener('click', () => populateSenateGrid(republicans))
  
const independents = senators.filter((senator) => senator.party === 'ID')
indButton.addEventListener('click', () => populateSenateGrid(independents))

//stateButton.addEventListener('click', () => populateSenateGrid(stateSort()))
/*const yourContactInfo = document.querySelector('#yourContactInfo')
yourContactInfo.addEventListener('click', () => {
    let yourContactInfo = prompt('What is Your Email?'))
    let newSenator = new Senator(

        id: senator.id,
        name: `${senator.first_name} ${senator.last_name} `,
        imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
        state: senator.state,
        address: senator.office,
        party: senator.party,
        twitter_account: senator.twitter_account,
        phone: senator.phone,
        contact_form: senator.contact_form,
    )
   
   populateSenDiv(newSenator)
    )*/


//CREATING THE CARD
function populateSenateGrid(senatorData) {
    removeChildren(senateGrid)
    senatorData.forEach(senator => {

    let senateScene = document.createElement('div')
    senateScene.className = 'scene'
    let senateCard = document.createElement('div')
    senateCard.className = 'card'
    senateCard.addEventListener('click', function () {
        senateCard.classList.toggle('is-flipped')
    })

    senateCard.appendChild(populateCardFront(senator))
    senateCard.appendChild(populateCardBack(senator))
    senateScene.appendChild(senateCard)
    senateGrid.appendChild(senateScene)

})
}
//FRONT ELEMENTS
   /* let senFigure = document.createElement('figure')
    let figImg = document.createElement('img')
    let figCaption = document.createElement('figcaption')
    let partyIcon = document.createElement('i')
    let senateState = document.createElement('p')
    if (senator.party === 'R') partyIcon.className = 'fas fa-republican'
    if (senator.party === 'D') partyIcon.className = 'fas fa-democrat'
    if (senator.party === 'ID') partyIcon.className = 'fas fa-star'
   
    senateState.textContent = `State: ${senator.state}`
    
    figImg.src = senator.imgURL
    figCaption.textContent = senator.name
    senateState.textContent = `State: ${senator.state}`
    
    //CARD FRONT
    figCaption.appendChild(partyIcon)
    senFigure.appendChild(figImg)
    senFigure.appendChild(figCaption)
    senDiv.appendChild(senFigure)
    senDiv.appendChild(senateState)
    senateGrid.appendChild(senDiv)
    })
}/*/

//MAP OF NEEDED PROPERTIES
function simpleSenators(senArray) {
    return senArray.map(senator => {
        return {
            id: senator.id,
            name: `${senator.first_name} ${senator.last_name} `,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
            state: senator.state,
            address: senator.office,
            party: senator.party,
            twitter_account: senator.twitter_account,
            phone: senator.phone,
            contact_form: senator.contact_form
        }
    })
}



function populateCardFront(senator) {
    let cardFront = document.createElement('div')
    cardFront.className = `card-face card-face-front`
    let frontImage = document.createElement('img')
    frontImage.src = senator.imgURL
    
    
    let senateState = document.createElement('p')

    let partyIcon = document.createElement('i')
    if (senator.party === 'R') partyIcon.className = 'fas fa-republican'
    if (senator.party === 'D') partyIcon.className = 'fas fa-democrat'
    if (senator.party === 'ID') partyIcon.className = 'fas fa-star'
   
    senateState.textContent = `State: ${senator.state}`

    cardFront.appendChild(frontImage)
    cardFront.appendChild(partyIcon)
    cardFront.appendChild(senateState)
    return cardFront
}


function populateCardBack(senator) {
    let cardBack = document.createElement('div')
    cardBack.className = `card-face card-face-back`
    let contactLabel = document.createElement('h2')
    contactLabel.textContent = `Name: ${senator.name}`
   
    let addressLabel = document.createElement('p')
    addressLabel.textContent = `Address: ${senator.address}`
    let phoneLabel = document.createElement('p')
    phoneLabel.textContent = `Phone #: ${senator.phone}`
    let twitterLabel = document.createElement('p')
    twitterLabel.textContent = `Twitter: @${senator.twitter_account}`
    let formLabel = document.createElement('p')
    formLabel.htmlContent = `<a href="${senator.contact_form}">Official Contact Form</a>` 
    
    
   

    cardBack.appendChild(contactLabel)
    cardBack.appendChild(addressLabel)
    cardBack.appendChild(phoneLabel)
    cardBack.appendChild(twitterLabel)
    cardBack.appendChild(formLabel)

    return cardBack
}

//STATE SORT IN ALPHABETICAL ORDER

/*function stateSort() {
       populateSenateGrid(senators.state.sort((a, b) => (a.state).localeCompare(b.state)))
        
       }*/


//ALL SENATORS
populateSenateGrid(simpleSenators(senators))
