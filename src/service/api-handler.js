
export default class ApiHandler {

    static _options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }
    }

    static async getRatedMovies(page = 1) {
        return await fetch(`https://api.themoviedb.org/3/movie/top_rated?page=${page}`, this._options)
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    return json
                })
    }

    static async getMoviesBySearch(text = 'return', page = 1) {
        return await fetch(`https://api.themoviedb.org/3/search/movie?query=${text}&page=${page}`, this._options)
                            .then((response) => {
                                return response.json();
                            })
    }

    static getPosterLink(posterPath) {
        return 'https://image.tmdb.org/t/p/w500/' + posterPath
    }

    static async getGenres() {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list`, this._options)
        return await response.json()
    }
}