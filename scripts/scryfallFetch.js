
export class ScryfallFetch {
  constructor(){

  }
  static async getRandom() {
    let response = await fetch(`https://api.scryfall.com/cards/random`)
    let data = await response.json()
    //console.log(data)
    return data;
  }
  static async getSearch(userSearch) {
    console.log(userSearch);
    let response = await fetch(`https://api.scryfall.com/cards/search?q=${userSearch}`)
    let data = await response.json()
    //console.log(data)
    return data;
  }
  static async getNamed(userSearch) {
    let searchQuery = userSearch.split(" ").join('+')
    let response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${searchQuery}`)
    let data = await response.json()
    return data;
  }
  static async getSymbols() {
    let response = await fetch(`https://api.scryfall.com/symbology`)
    let data = await response.json()
    let symbolArr = []

    data.data.forEach(element => {
      let symbolObj = {};
      let symbolName = element.symbol;
      let symbolUrl = element.svg_uri;
      symbolObj.name = symbolName;
      symbolObj.url = symbolUrl;
      symbolArr.push(symbolObj);
    });
    return symbolArr;
    }
      
}