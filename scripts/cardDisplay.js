

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
});


// https://api.scryfall.com/cards/6da045f8-6278-4c84-9d39-025adf0789c1

// document.getElementById('bg-image').innerHTML = ('<div id="bg-image"></div>');





//fetch card object
fetch('https://api.scryfall.com/cards/44865244-2b9f-4734-a4da-49613b23ee4d')
  .then((response) => response.json())
  .then((data) => {
    //grab needed data
    let cardOracleTxt = data.oracle_text;
    let cardColors = data.colors;
    let cardImgPng = data.image_uris.png;
    let cardImgArt = data.image_uris.art_crop;
    let cardType = data.type_line;
    let cardRarity = data.rarity;
    let cardFlavorText = data.flavor_text;
    let cardArtist = data.artist_ids[0];
    let cardName = data.name;


    document.getElementById("bg-image").style.backgroundImage = `url(${cardImgArt})`;
    
    let pageHtml = `<div class="main-content"><div class="card-image"><img src=${cardImgPng} alt="card image" class="responsive" id="cardImg"></div><div class="text-box" id="testBox">${cardName}: ${cardColors}<br><hr class="solid">Type: ${cardType}, Rarity: ${cardRarity}<br><hr class="solid">${cardOracleTxt}<br><hr class="solid"><i>${cardFlavorText}</i><br><hr class="dotted">Artist: ${cardArtist}</div></div>`;

    document.getElementById('main-content').innerHTML = (pageHtml);
  })
  


