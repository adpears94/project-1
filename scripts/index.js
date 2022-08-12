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
<img src="/images/DSC_9651.jpg" height=300px>
</div>`;

window.onload = () => {
  document.querySelector("#content-container").innerHTML = landing;
};
// document.addEventListener("DOMContentLoaded", ()=>{
//     document.querySelector(".content-container").innerHTML = landing;
// })

document.querySelector("#Homepage").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#content-container").innerHTML = landing;
  document.querySelector(".searchBar").value =
    document.querySelector(".searchBar").defaultValue;
});

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
                        <a href="SearchResult.html">
                            <img src="${data.data[i].image_uris.small}" height="300px" >
                        </a>
                    </div>`;
            document.querySelector(".search-result-box").innerHTML += content;
          }
        }
      });
  }
});

document
  .querySelector("#content-container")
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
                        <a href="SearchResult.html">
                            <img src="${data.data[i].image_uris.small}" height="300px" >
                        </a>
                    </div>`;
                document.querySelector(".search-result-box").innerHTML +=
                  content;
              }
            }
          });
      }
    }
  });
