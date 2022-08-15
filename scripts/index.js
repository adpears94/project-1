import {ScryfallFetch} from "./scryfallFetch.js";

window.onload = () => {
  if ('URLSearchParams' in window) {
    let searchParams = new URLSearchParams(window.location.search); 
    if(searchParams.has('q')) {
        buildCardPage(searchParams.get('q'));
    } else{
      buildHomePage();
    } 
  } else {
    buildHomePage();
  }
}


///////////////////////// Navigation event triggers //////////////////////////////
document.querySelector("#Homepage").addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("bg-image").style.backgroundImage = `none`;
  document.querySelector("body").style.backgroundImage = '';
  let searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('q')){
    window.history.pushState({}, document.title, "/" + '' );
  }
  document.querySelector(".searchBar").value = document.querySelector(".searchBar").defaultValue;
  buildHomePage();
});

document.querySelector("#Random-Card").addEventListener("click", (event) => {
  event.preventDefault();
  // document.getElementById("bg-image").style.backgroundImage = `none`;
  document.querySelector("body").style.backgroundImage = '';
  let searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('q')){
    window.history.pushState({}, document.title, "/" + '' );
  }
  document.querySelector(".searchBar").value = document.querySelector(".searchBar").defaultValue;
  buildCardPage();
});

document.querySelector("#Advanced-Search").addEventListener("click", (event) => {
  event.preventDefault();
  // document.getElementById("bg-image").style.backgroundImage = `none`;
  document.querySelector("body").style.backgroundImage = '';
  let searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('q')){
    window.history.pushState({}, document.title, "/" + '' );
  }
  document.querySelector(".searchBar").value = document.querySelector(".searchBar").defaultValue;
  buildAdvancedPage();
});

document.querySelector("#About").addEventListener("click", (event) => {
  event.preventDefault();
  // document.getElementById("bg-image").style.backgroundImage = `none`;
  document.querySelector("body").style.backgroundImage = '';
  document.querySelector(".searchBar").value = document.querySelector(".searchBar").defaultValue;
  let searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('q')){
    window.history.pushState({}, document.title, "/" + '' );
  }
  buildAboutPage();
});

/////////////// Navigation Search function //////////////////////////////
let content = ``
document.querySelector(".searchButton").addEventListener("click", async (event) => {
  event.preventDefault();
  console.log(event.target);
  console.log(event.target.id);
  // document.getElementById("bg-image").style.backgroundImage = `none`;
  document.querySelector("body").style.backgroundImage = '';
  if (document.querySelector(".searchBar").value !== "") {
    let search = document.querySelector(".searchBar").value;
    document.querySelector("#content-container").innerHTML = ` 
        <div class="search-result-box">
        </div>`;

    let data = await ScryfallFetch.getSearch(search);
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
      if(event.target.id !== "search-result-box" && event.target.id !== null) {
        let searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('q')){
          window.history.pushState({}, document.title, "/" + '' );
        }
        buildCardPage(event.target.id)
      }
    });
  }
});

///////////////////////// Home Page //////////////////////////////
const buildHomePage = async () => {

  //pass query string for random card to just fetch image [https://scryfall.com/docs/api/cards/random]
  let getQuery = '?format=image&version=small'

  let landingImage1 = await ScryfallFetch.getRandom();
  while (!landingImage1.image_uris){
    landingImage1 = await ScryfallFetch.getRandom();
  }
  let landingImage2 = await ScryfallFetch.getRandom();
  while (!landingImage2.image_uris){
    landingImage2 = await ScryfallFetch.getRandom();
  }
  let landingImage3 = await ScryfallFetch.getRandom();
  while (!landingImage3.image_uris){
    landingImage3 = await ScryfallFetch.getRandom();
  }
  // let landingImage2 = await ScryfallFetch.getRandom();
  // let landingImage3 = await ScryfallFetch.getRandom();

  document.querySelector("body").style.backgroundImage = 'none';
  document.getElementById("bg-image").style.backgroundImage = `url(${landingImage1.image_uris.art_crop})`;
  
  let content = ``;
  let landing = `
  <div class="center-search"></div>
  <h1>MagiDex</h1>
  <p> “Stay strapped or get clapped” -Sun Tzu "The Art of War"</p>
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
      //console.log(event.target.id)
      buildCardPage(event.target.id);
      
    }
    
  });
  
//Deals with generating the search result page when using the landing page's search bar in the middle of the screen////////
  document.querySelector("#content-container").addEventListener("click", async (event) => {
    event.preventDefault();
    if (event.target && event.target.id === "searchButton") {
      if (document.querySelector("#searchBar").value !== "") {
        let search = document.querySelector("#searchBar").value;
        document.querySelector("#content-container").innerHTML = ` 
        <div class="search-result-box">
        </div>`;
        let data = await ScryfallFetch.getSearch(search);
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
            let searchParams = new URLSearchParams(window.location.search);
            if (searchParams.has('q')){
              window.history.pushState({}, document.title, "/" + '' );
            }
            buildCardPage(event.target.id)
          }
        });
      }
    }
    if (event.target && event.target.id === "advanced-search") {
      event.preventDefault();
      let searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has('q')){
        window.history.pushState({}, document.title, "/" + '' );
      }
      document.querySelector(".searchBar").value = document.querySelector(".searchBar").defaultValue;
      buildAdvancedPage();
    }
    if (event.target && event.target.id === "random-search") {
      event.preventDefault();
      let searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has('q')){
        window.history.pushState({}, document.title, "/" + '' );
      }
      document.querySelector(".searchBar").value = document.querySelector(".searchBar").defaultValue;
      buildCardPage();
    }
  });
}


///////////////////////// Card Page //////////////////////////////
const buildCardPage = async(inputCard) => {
  
  document.querySelector("body").style.backgroundImage = 'none';
  document.querySelector("#content-container").innerHTML = `<div class="main-content"></div>`;

  let card
  if ('URLSearchParams' in window) {
    let searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has('q')) {
      card = await ScryfallFetch.getNamed(searchParams.get('q'))
    } else if (inputCard){
      card = await ScryfallFetch.getNamed(inputCard)
      searchParams.append("q", card.name);
      window.location.search = searchParams.toString();
    } else {
      card = await ScryfallFetch.getRandom();
      searchParams.append("q", card.name);
      window.location.search = searchParams.toString();
    }
  }
  
  // grab symbols then rip out only what the card uses into array
  let symbols = await ScryfallFetch.getSymbols();
  console.log(card.scryfall_uri);
  let manaCost = []
  let manaString = card.mana_cost

  for (let obj of symbols){
    while (manaString.indexOf(obj.name) >= 0){
      let startIndex = manaString.indexOf(obj.name);
      manaCost.push(manaString.slice(startIndex, (startIndex + obj.name.length)))
      manaString = manaString.replace(obj.name, '')
    }
  }

  // change oracle text to have images for the symbols
  let cardCMC = ''
  for (let item of manaCost){
    for (let obj of symbols){
      if(obj.name === item){
        let currentItem = `<img src="${obj.url}" alt="${item}" width="30" height="30">`
        cardCMC += currentItem;
      }
    }
  }
  //console.log(cardCMC)
  //console.log(card.oracle_text)

  let cardOracleTxt = card.oracle_text

  for (let item of symbols) {
    let replacement = `<img src="${item.url}" alt="${item}" width="20" height="20">`;
    cardOracleTxt = cardOracleTxt.replaceAll(item.name, replacement)
  }
  cardOracleTxt = cardOracleTxt.replaceAll('\n', '<br>')
  //console.log(card.oracle_text)


  let cardImgPng = card.image_uris.png;
  let cardImgArt = card.image_uris.art_crop;
  let cardType = card.type_line;
  let cardRarity = card.rarity;
  let cardFlavorText
  if (card.flavor_text){
    cardFlavorText = card.flavor_text;
  } else {
    cardFlavorText = ''
  }
  let cardArtist = card.artist;
  let cardName = card.name;
  let cardHealth
  if(card.power){
    cardHealth = `${card.power}/${card.toughness}`
  } else {
    cardHealth = ''
  }
  // console.log(card)
  
  document.getElementById("bg-image").style.backgroundImage = `url(${cardImgArt})`;


  let pageHtml = `
<div class="main-content">
  <div class="card-image">
    <img src=${cardImgPng} alt="card image" class="responsive" id="cardImg">
  </div>
  <div class="text-box" id="testBox">
    <h2>Card Information</h2>
    ${cardName}  ${cardCMC}<br> 
    <hr class="rounded">
    Type: ${cardType} | Rarity: ${cardRarity}<br>
    <hr class="solid">
    ${cardOracleTxt}<br>
    <p class="alignright"><strong>${cardHealth}</strong></p>
    <hr class="solid">
    <i>${cardFlavorText}</i><br>
    <hr class="dotted">
    Artist: ${cardArtist}<br>
    <hr class="rounded">
      <h2>Download/Links</h2>
      <p><a id="full-card-dl" href="" target="_blank">Full Card Art</a>|| 
      <a id="card-art-dl" href="" target="_blank">Card Art</a></p>
      <a id="gatherer" href="" target="_blank">View on official MTG Site</a>

    </div>
    <div class="text-box2"></div>
    <div class="text-box3"></div>
</div>`;

  document.querySelector("#content-container").innerHTML = pageHtml;

  document.querySelector("#full-card-dl").addEventListener("click", (event) => {
    console.log(event);
    window.open(cardImgPng, "_blank");
  });

  document.querySelector("#card-art-dl").addEventListener("click", (event) => {
    console.log(event);
    window.open(cardImgArt, "_blank");
  });

  document.querySelector("#gatherer").addEventListener("click", (event) => {
    console.log(event);
    window.open(card.related_uris.gatherer, "_blank");
  });

} 


///////////////////////// About Page //////////////////////////////
const buildAboutPage = () => {
  let aboutHtml = `
<div class="about">
  <h1>MagiDex Story</h1>
  
  <h2 class="we-are">Who We Are</h2>
  <div class="about-page">
    
      We are a team of 5 developers, by the names of Alex, Michel, Tristan,
      Avery and Eric. Our journey into this space started in a classroom only
      a few weeks ago as students and we’ve been rapidly involving into true
      professionals. We have a variation of knowledge and backgrounds and have
      worked a number of projects and continue enhance our abilities. We all
      have one true combined goal and that's to provide you with the best
      product possible and continue to build it from there. You won’t find a
      better team of gentlemen out there, guaranteed!!
    
  </div>

  <h2 class="different">Why We Are Different</h2>
  <div class="about-page">
   
      In August 2022, after noticing a problem, we started MagiDex to help our
      fellow Magic users to find a simpler way to enter the Magic the
      Gathering scene and learn in a more user-friendly way. We saw firsthand
      how difficult is was to accomplish so, since Monday 8 August 2022 we’ve
      poured every ounce of our blood, sweat, and tears into MagiDex and
      making it simple but enjoyable experience for our users.  We’ve tackled
      big challenges for our users and are constantly making it better. We
      created solutions for learning how to play, getting access/details about
      every card you can imagine, linking our users to the Magi community and
      much more. All so that Magic the Gathering enthusiast like yourself can
      better understand the ins and outs of game and also provide an
      environment where beginners will not feel overwhelmed when stepping into
      scene.  As a result, our work has been recognized by Galvanize as one of
      the best web applications they've ever seen, EVER! We couldn’t be
      prouder to offer you MagiDex and it’s user-friendly interface. We look
      forward to bringing you some high-quality features for years to come!
   
  </div>

  <h2 class="mission">Our Mission</h2>
  <div class="about-page">
  
      MagiDex is an entertainment company focused on providing high-quality
      content and service to our MagiDex users.  As a company, they wanted to
      change the way entering into the Magic the Gathering scene was done and
      make it more appealing to the audience. In 2022, through research and
      customer feedback they determined that Magic the Gathering is an
      incredibly complex and difficult to learn game and current resources do
      not allow for players looking to enter the scene to have a tool they can
      learn and discover new cards/deck archetypes that is intuitive or
      user-friendly which discourages people from trying in the first place. In
      that moment realized that we had an opportunity to make some major
      enhancements in this space. They decided to create MagiDex to help those
      users and other sites that had the same issues. We believe in MagiDex and
      our commitment to excellence and providing a more pleasant environment for
      the Magic the Gathering community.
 
  </div>

  <br>
  <h2>Resources</h2><br>
    <a id="about-link1" href="https://magic.wizards.com/en/how-to-play" target="_blank">How To Play</a>
    <!-- <a id="about-link" href="#" target="_blank">FAQs</a> -->
    <!-- <a id="about-link" href="#" target="_blank">Twitter</a> -->
    <a id="about-link2" href="https://github.com/adpears94/sdi-blended-project1-scaffold" target="_blank">GitHub</a><br>
    <button id="about-link3" href= "https://www.youtube.com/watch?v=a3Z7zEc7AXQ" target="_blank">Contact Us</button>

</div>`;

  document.querySelector("#content-container").innerHTML = aboutHtml;

  document.querySelector("#about-link1").addEventListener("click", (event) => {
    console.log(event);
    window.open("https://magic.wizards.com/en/how-to-play", "_blank");
  });
  document.querySelector("#about-link2").addEventListener("click", (event) => {
    console.log(event);
    window.open("https://github.com/adpears94/sdi-blended-project1-scaffold", "_blank");
  });
  document.querySelector("#about-link3").addEventListener("click", (event) => {
    console.log(event);
    window.open("https://www.youtube.com/watch?v=a3Z7zEc7AXQ", "_blank");
  });
}

///////////////////////// Advanced Page //////////////////////////////

const buildAdvancedPage = () => {
  let advancedHtml = `
    <div class="container">
      <h1>Searching for something different?</h1>
    </div>

  <div class="about-page">
    <div class="advanced-filtering">
      <div class="form-row">
        <label class="form-row-label" for="name"><h2>Card Name:</h2></label>  
        <input id="nameSearch" class="nav-item active search-bar" type="search" placeholder="Any words in the name, e.g. 'Fire'" autocomplete="off" maxlength="100" minlength="0">
        <label class="form-row-label" for="name"><h2>Text:</h2></label> 
        <input id="textSearch" class="nav-item active search-bar" type="search" placeholder="Any test, e.g. 'draw a card'" autocomplete="off" maxlength="100" minlength="0">
        <label class="form-row-label" for="name"><h2>Type:</h2></label> 
        <input id="typeLineSearch" class="nav-item active search-bar" type="search" placeholder="Enter a type or choose from the list" autocomplete="off" maxlength="100" minlength="0">
      </div>             

      <div class="form-row">
        <label class="form-row-label" for="artist"><h2>Mana Cost:</h2></label> 
        <input id="manaSearch" class="nav-item active search-bar" type="search" placeholder="mana cost, '{W}{W}'" autocomplete="off" maxlength="100" minlength="0">
        <label class="form-row-label" for="artist"><h2>Artist:</h2></label> 
        <input id="artistSearch" class="nav-item active search-bar" type="search" placeholder="Any artist name, e.g. 'Magali'" autocomplete="off" maxlength="100" minlength="0">
        <label class="form-row-label" for="flavor-text"><h2>Flavor Text:</h2></label> 
        <input id="flavorSearch" class="nav-item active search-bar" type="search" placeholder="Any text, especially names. e.g. 'Kjerldoran'" autocomplete="off" maxlength="100" minlength="0">
      </div>

      <div class="form-row">
        <h2>Colors Included:</h2>
        <label class="container">White
          <input type="checkbox" id="White-box">
          <label class="checkmark"></label>
        </label>
        <label class="container">Blue
          <input type="checkbox" id="Blue-box">
          <label class="checkmark"></label>
        </label>
        <label class="container">Black
          <input type="checkbox" id="Black-box">
          <label class="checkmark"></label>
        </label>
        <label class="container">Red
          <input type="checkbox" id="Red-box">
          <label class="checkmark"></label>
        </label>
        <label class="container">Green
          <input type="checkbox" id="Green-box">
          <label class="checkmark"></label>
        </label>
        <label class="container">Colorless
          <input type="checkbox" id="Colorless-box">
          <label class="checkmark"></label>
        </label>
      </div>    

      <div class="form-row">
        <form>
          <h2>Choose a rarity:</h2>
          <select name="rarity" id="rarity">
            <option value="common">Common</option>
            <option value="uncommon">Uncommon</option>
            <option value="rare">Rare</option>
            <option value="mythicRare">Mythic Rare</option>
          </select>
        </form>
      </div>
      
      <div class="search-buttons">
        <div class="search-buttons">   
          <button id="searchOptionsButton" class="search-buttons-long">Search using these options</button>
          <br>
          <button  id="clearButton"  class="search-buttons-long" >Clear Filters</button>
        </div>
      </div>
    </div>
  </div>`;

  document.querySelector("#content-container").innerHTML = advancedHtml;

  document.querySelector("#content-container").addEventListener("click", async event => {
    let querystr = ""
    let query = []
    if (event.target && event.target.id === "searchOptionsButton" ) {
        if (document.getElementById("nameSearch").value !== '') query.push(document.getElementById("nameSearch").value)
        if (document.getElementById("textSearch").value !== '') query.push('oracle%3A' + document.getElementById("textSearch").value)
        if (document.getElementById("typeLineSearch").value !== '') query.push('type%3A' + document.getElementById("typeLineSearch").value)
        if (document.getElementById("manaSearch").value !== '') query.push('mana%3A' + document.getElementById("manaSearch").value)
        if (document.getElementById("artistSearch").value !== '') query.push('artist%3A' + document.getElementById("artistSearch").value)
        if (document.getElementById("flavorSearch").value !== '') query.push('flavor%3A' + document.getElementById("flavorSearch").value)

        let rarityDropdown = document.getElementById("rarity")
        let rarityValue = rarityDropdown.options[rarityDropdown.selectedIndex].value
        query.push('rarity>%3D' + rarityValue)

        
        let colorsChecked = ''
        if(document.getElementById("White-box").checked) colorsChecked += 'w'
        if(document.getElementById("Blue-box").checked) colorsChecked += 'u'
        if(document.getElementById("Black-box").checked) colorsChecked += 'b'
        if(document.getElementById("Red-box").checked) colorsChecked += 'r'
        if(document.getElementById("Green-box").checked) colorsChecked += 'g'
        if(document.getElementById("Colorless-box").checked) colorsChecked += 'c'


        query.push('color>%3D' + colorsChecked)


        querystr = query.join("+");
        console.log(querystr)
        
      event.preventDefault();
      let searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has('q')){
        window.history.pushState({}, document.title, "/" + '' );
      }
      document.querySelector(".searchBar").value = document.querySelector(".searchBar").defaultValue;
      document.querySelector("#content-container").innerHTML = ` 
        <div class="search-result-box">
        </div>`;
        let data = await ScryfallFetch.getSearch(querystr);
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
            let searchParams = new URLSearchParams(window.location.search);
            if (searchParams.has('q')){
              window.history.pushState({}, document.title, "/" + '' );
            }
            buildCardPage(event.target.id)
          }
        });
    }
    if (event.target && event.target.id === "clearButton" ) {
      document.getElementById("nameSearch").value = ''
      document.getElementById("textSearch").value = ''
      document.getElementById("typeLineSearch").value = ''
      document.getElementById("manaSearch").value = ''
      document.getElementById("artistSearch").value = ''
      document.getElementById("flavorSearch").value = ''
      document.getElementById("White-box").checked = false
      document.getElementById("Blue-box").checked = false
      document.getElementById("Black-box").checked  = false
      document.getElementById("Green-box").checked  = false
      document.getElementById("Red-box").checked = false
      document.getElementById("Colorless-box").checked  = false
      document.getElementById("rarity").value = document.getElementById("rarity").options[0].value
      document.getElementById("nameSearch").focus()
      
    }
 });

}