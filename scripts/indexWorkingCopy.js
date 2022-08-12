import {ScryfallFetch} from "./scryfallFetch.js";


var content = ``;
var landing = `
<div class="center-search">
<h1>MagiDex</h1>
<p> This Game Will Ruin Your Life</p>
<input id="searchBar" class = "search-bar long" type="text" placeholder="Search..." autocomplete="off" maxlength="100" minlength="0">
</div>
<div class="search-buttons">
<button id = "searchButton" class = "search-buttons-long">Search</button>
<button class = "search-buttons-long" type="button">Advanced Search</button>
<button class = "search-buttons-long" type="button">Random Search</button>
</div>
<div class="bottom-image"> 
<img src="" height=300px>
</div>`;


window.onload = () => {
  document.querySelector("#content-container").innerHTML = landing;
};
// document.addEventListener("DOMContentLoaded", ()=>{
//     document.querySelector(".content-container").innerHTML = landing;
// })

//Navigation event triggers ////////////////////////////////////////////////////////////////
document.querySelector("#Homepage").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#content-container").innerHTML = landing;
  document.querySelector(".searchBar").value = document.querySelector(".searchBar").defaultValue;
  document.getElementById("bg-image").style.backgroundImage = `none`;
});

document.querySelector("#Random-Card").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector(".searchBar").value = document.querySelector(".searchBar").defaultValue;
  buildCardPage();
});



//Deals with generating the search result page when using the navigation bar's search bar in the middle of the screen////////
document.querySelector(".searchButton").addEventListener("click", (event) => {
  event.preventDefault();
  if (document.querySelector(".searchBar").value !== "") {
    let search = document.querySelector(".searchBar").value;
    document.querySelector("#content-container").innerHTML = ` 
        <div class="search-result-box">
        </div>`;

    let fetchURL = `https://api.scryfall.com/cards/search?q=` + search;
    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        //grab needed data
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].image_uris) {
            content = `
                    <div class="search-result-item">
                        <a href="#">
                            <img id="${data.data[i].name}" src="${data.data[i].image_uris.small}" height="300px" >
                        </a>
                    </div>`;
            document.querySelector(".search-result-box").innerHTML += content;
          }
        }
        document.querySelector(".search-result-box").addEventListener("click", (event) => {
          if(event.target){
            buildCardPage(event.target.id)
          }
        })
      });
  }
});


//Deals with generating the search result page when using the landing page's search bar in the middle of the screen////////
document.querySelector("#content-container")
  .addEventListener("click", (event) => {
    if (event.target && event.target.id === "searchButton") {
      if (document.querySelector("#searchBar").value !== "") {
        let search = document.querySelector("#searchBar").value;
        document.querySelector("#content-container").innerHTML = ` 
        <div class="search-result-box">
        </div>`;


        let fetchURL = `https://api.scryfall.com/cards/search?q=` + search;
        fetch(fetchURL)
          .then((response) => response.json())
          .then((data) => {
            //grab needed data
            for (let i = 0; i < data.data.length; i++) {
              if (data.data[i].image_uris) {
                content = `
                    <div class="search-result-item">
                        <a href="#">
                            <img id="${data.data[i].name}" src="${data.data[i].image_uris.small}" height="300px" >
                        </a>
                    </div>`;
                document.querySelector(".search-result-box").innerHTML += content;
              }
            }
            document.querySelector(".search-result-box").addEventListener("click", (event) => {
              if(event.target){
                buildCardPage(event.target.id)
              }
            })
          });
      }
    }
  
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
    
    document.getElementById("bg-image").style.backgroundImage = `url(${cardImgArt})`;
    
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
  
    document.querySelector("#content-container").innerHTML = pageHtml;
  } 
  
  // buildCardPage('make your mark');
  // buildCardPage()
