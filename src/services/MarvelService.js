import {useState, useCallback} from 'react'

const  useMarvelService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback( async (url,method = 'GET', body = null, headers = {'Content-Type' : 'application/json'}) => {

    setLoading(true)

    try {
      const response = await fetch(url, {method, body, headers});

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}, status: ${response.status}`);
      }

      const data = await response.json();

      setLoading(false)
      return data;
    } catch(e) {
      setLoading(false)
      setError(e.message)
      throw e
    }


  },[])
  const clearError = useCallback(() => setError(null), [])


  const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  const _apiKey = 'apikey=fe0e8ca4e40111d278e95e2423938695'
  const _baseOffset = 0;

  const getAllCharacters = async (offset = _baseOffset, limit = 9) => {
    const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter)
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
    return _transformCharacter(res.data.results[0]);
  }

	const getAllComics = async (offset = 0, limit = 8) => {
		const res = await request(
			`${_apiBase}comics?orderBy=issueNumber&limit=${limit}&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformComics);
	};

  const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

  const _transformCharacter = (char) => {

    return {
      id: char.id,
      name: char.name,
      description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls ? char.urls[0].url : '',
      wiki: char.urls ? char.urls[1].url : '',
      comics: char.comics.items
    };
  };

  const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		};
	};

  return {loading, error, getAllCharacters, getCharacter, getAllComics, getComic, clearError}
}

export default useMarvelService