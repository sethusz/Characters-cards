class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=fe0e8ca4e40111d278e95e2423938695'

    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`HTTP error ${res.status}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = ()  => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
    }

    getCharacter = (id)  => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
    }
}

export default MarvelService