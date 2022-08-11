
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

    
}