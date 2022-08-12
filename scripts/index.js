import {ScryfallFetch} from "./scryfallFetch.js";


window.onload = () => {
  if ('URLSearchParams' in window) {
    let searchParams = new URLSearchParams(window.location.search);

    if(searchParams.has('q')) {
        console.log(document.querySelector(".main-content"))
      if(searchParams.has('load')) {
        return;
      } else {  
        const cardQuery = searchParams.get('q')
        buildCardPage(cardQuery);
      }

    } else {
      buildHomePage();
    }
  }
}

///////////////////////// Navigation event triggers //////////////////////////////
document.querySelector("#Homepage").addEventListener("click", (event) => {
  event.preventDefault();
  var searchParams = new URLSearchParams(window.location.search);
  if(searchParams.has('q')) {
    searchParams.delete('q')
    window.location.search = searchParams.toString();
  }
  buildHomePage();
});

document.querySelector("#Random-Card").addEventListener("click", (event) => {
  event.preventDefault();
  var searchParams = new URLSearchParams(window.location.search);
  if(searchParams.has('q')) {
    searchParams.delete('q')
    window.location.search = searchParams.toString();
  }
  document.querySelector(".searchBar").value = document.querySelector(".searchBar").defaultValue;
  buildCardPage();
});

// document.querySelector("#Advanced-Search").addEventListener("click", (event) => {
//   event.preventDefault();
//   document.querySelector(".searchBar").value = document.querySelector(".searchBar").defaultValue;
//   buildAdvancedSearchPage();
// });

// document.querySelector("#about").addEventListener("click", (event) => {
//   event.preventDefault();
//   document.querySelector(".searchBar").value = document.querySelector(".searchBar").defaultValue;
//   buildAboutPage();
// });

const buildHomePage = async () => {

  let landingImage1 = await ScryfallFetch.getRandom();
  let landingImage2 = await ScryfallFetch.getRandom();
  let landingImage3 = await ScryfallFetch.getRandom();

  document.getElementById("bg-image").style.backgroundImage = `none`;
  var content = ``;
  var landing = `
  <div class="center-search">
  <h1>MagiDex</h1>
  <p> This Game Will Ruin Your Life</p>
  <input id="searchBar" class = "search-bar long" type="text" placeholder="Search..." autocomplete="off" maxlength="100" minlength="0">
  </div>
  <div class="search-buttons">
  <button id="searchButton" class = "search-buttons-long">Search</button>
  <button id="advanced-search" class="search-buttons-long" type="button">Advanced Search</button>
  <button id="random-search" class = "search-buttons-long" type="button">Random Search</button>
  </div>
  <div class="bottom-image"> 
  <a href="">
    <img id = "${landingImage1.name}" src="${landingImage1.image_uris.small}" height=300px>
  </a>
  <a href="">
    <img id = "${landingImage2.name}" src="${landingImage2.image_uris.small}" height=300px>
  </a>
  <a href="">
    <img id = "${landingImage3.name}" src="${landingImage3.image_uris.small}" height=300px>
  </a>
  </div>`;

  document.querySelector("#content-container").innerHTML = landing;
  
  document.querySelector(".bottom-image").addEventListener("click", (event) => {
    if(event.target){
      buildCardPage(event.target.id)
    }
  });
  
  //Deals with generating the search result page when using the navigation bar's search bar in the middle of the screen////////
  document.querySelector(".searchButton").addEventListener("click", async (event) => {
    event.preventDefault();
    if (document.querySelector(".searchBar").value !== "") {
      let search = document.querySelector(".searchBar").value;
      document.getElementById("bg-image").style.backgroundImage = `none`;
      document.querySelector("#content-container").innerHTML = ` 
          <div class="search-result-box">
          </div>`;

      let data = await ScryfallFetch.getSearch(search);
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].image_uris) {
          content = `
                  <div class="search-result-item">
                      <a href="">
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
      });
    }
  });

  //Deals with generating the search result page when using the landing page's search bar in the middle of the screen////////
  document.querySelector("#content-container").addEventListener("click", async (event) => {
    if (event.target && event.target.id === "searchButton") {
      if (document.querySelector("#searchBar").value !== "") {
        let search = document.querySelector("#searchBar").value;
        document.querySelector("#content-container").innerHTML = ` 
        <div class="search-result-box">
        </div>`;
        let data = await ScryfallFetch.getSearch(search);
        for (let i = 0; i < data.data.length; i++) {
          for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].image_uris) {
              content = `
                  <div class="search-result-item">
                      <a href="">
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
        }
      } 
    } else if (event.target && event.target.id === "random-search"){
      buildCardPage();
    }
  });

}

const buildCardPage = async(inputCard) => {

  document.querySelector("#content-container").innerHTML = `<div class="main-content"></div>`;

  // console.log(inputCard)
  
  let card = {}
  if(inputCard === undefined) {
    card = await ScryfallFetch.getRandom();
  } else {
  card = await ScryfallFetch.getNamed(inputCard)
  }

  //should set url query to equal the current card displayed if not passed in to use
  if ('URLSearchParams' in window) {
    let searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has('q')) {
      card = await ScryfallFetch.getNamed(searchParams.get('q')) 
    } 
  } else {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.append("q", card.name);
    window.location.search = searchParams.toString();
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
