import {ScryfallFetch} from "./scryfallFetch.js";

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
});



const buildCardPage = async(inputCard) => {
  // console.log(inputCard)
  
  let card = {}
  if(inputCard === undefined) {
    card = await ScryfallFetch.getRandom();
  } else {
  card = await ScryfallFetch.getNamed(inputCard)
  }
  let symbols = await ScryfallFetch.getSymbols();
  console.log(card.scryfall_uri);
  console.log(symbols[0])
  let manaCost = card.mana_cost.match(/.{1,3}/g);
  
  console.log(manaCost)

  

  // for(symbol in symbols){
  // let result = symbol[0]..match()
  // }
  


let cardOracleTxt = card.oracle_text;
  let cardColors = card.colors;
  let cardImgPng = card.image_uris.png;
  let cardImgArt = card.image_uris.art_crop;
  let cardType = card.type_line;
  let cardRarity = card.rarity;
  let cardFlavorText = card.flavor_text;
  let cardArtist = card.artist;
  let cardName = card.name;
  // console.log(card)

  document.querySelector("#bg-image").style.backgroundImage = `url(${cardImgArt})`;
  
  let pageHtml = `
<div class="main-content">
  <div class="card-image">
    <img src=${cardImgPng} alt="card image" class="responsive" id="cardImg">
  </div>
  <div class="text-box" id="testBox">
    ${cardName}: ${cardColors}<br>
    <hr class="solid">
    Type: ${cardType}, Rarity: ${cardRarity}<br>
    <hr class="solid">
    ${cardOracleTxt}<br>
    <hr class="solid">
    <i>${cardFlavorText}</i><br>
    <hr class="dotted">
    Artist: ${cardArtist}
  </div>
</div>`;

    document.getElementById('main-content').innerHTML = (pageHtml);
} 

// buildCardPage('make your mark');
buildCardPage()



//  TESTING PURPOSES //////////////////////////////////////////////////////////////////////////////
// const getSearchCard = async() => {
//   let creatureCard = await ScryfallFetch.getSearch('creature');
//   console.log(creatureCard);

// }

// getSearchCard();

// const getNamedCard = async() => {
//   let creatureCard = await ScryfallFetch.getNamed('infer reck');
//   console.log(creatureCard);

// }
// getNamedCard();

// const getSymbol = async() => {
//   let symbols = await ScryfallFetch.getSymbols();
//   console.log(symbols);
// }
// getSymbol();


