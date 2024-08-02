
export default class ApiHandler {
    static _options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTE3MGE2YmI4ZTRmMDdlNGRjZmJlMTU5NGJjYmY3ZSIsIm5iZiI6MTcyMDM1OTkwNS40MDg1MjMsInN1YiI6IjY1ZTVjNDE5OTQ1MWU3MDE0YTU5ZjM0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fh3gGKSty006bpW402kqWlUayYr6Q8TQTAA1udfLqfI'
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