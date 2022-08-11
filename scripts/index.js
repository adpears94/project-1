var content = `
<div class="center-search">
<h1>MagiDex</h1>
<p> This Game Will Ruin Your Life</p>
<input class = "search-bar long" type="text" placeholder="Search..." autocomplete="off" maxlength="100" minlength="0">
</div>
<div class="search-buttons">
<input class = "search-buttons-long" type="button" value="Search">
<input class = "search-buttons-long" type="button" value="Advanced Search">
<input class = "search-buttons-long" type="button" value="Random Search">
</div>
<div class="bottom-image"> 
<img src="/images/DSC_9651.jpg" width="15%" height="25%">
</div>`

document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelector(".content").innerHTML += content;
})

document.querySelector("#Homepage").addEventListener("click", (event)=>{
    event.preventDefault();
    document.querySelector(".content").innerHTML += content;
})