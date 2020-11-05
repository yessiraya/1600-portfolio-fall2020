import { starships } from '../data/starships.js'
import { removeChildren, getLastNumber } from '../util/index.js'

const nav = document.querySelector('.nav')
const navList = document.querySelector('.navList')
const shipView = document.querySelector('.main')

function populateNav(starships) {
    starships.forEach(starship => {
        let anchorWrap = document.createElement('a')
        anchorWrap.href = '#'
        anchorWrap.addEventListener('click', event => {
            let shipName = event.target.textContent
            const foundShip = starships.find(ship => ship.name === shipName)
            populateShipView(foundShip)
        })

        let listItem = document.createElement('li')
        listItem.textContent = starship.name

        anchorWrap.appendChild(listItem)
        navList.appendChild(anchorWrap)
        nav.appendChild(navList)
    })
}


function populateShipView(shipData) {
    console.log(shipData)
    // use createElement to create new img elements
    let shipImage = document.createElement('img')
    let shipNum = getLastNumber(shipData.url)
    //set their source to the url below
    shipImage.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`
    //make Shipnum act like charnum from the characters page
    shipImage.addEventListener('error', () => shipImage.hidden = true)
    //append the image to the shipView element
    shipView.appendChild(shipImage)
}

populateNav(starships)