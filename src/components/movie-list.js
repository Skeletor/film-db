
import React from "react"
import { Row, Col } from "antd"

import MovieCard from "./movie-card"
import Loader from "./loader"
import MessageBox from "./message-box"

import ApiHandler from "../service/api-handler"
import LocalStorageHandler from "../service/local-storage-handler"
import TextFormatter from "../service/text-formatter"
import Constants from "../constants"

import GenresContext from "../service/context/genres-context"

const MovieList = (props) => {
    return <GenresContext.Consumer>
        { genres => {
            const {
                films, 
                totalFilms, 
                displayStars, 
                isLoading 
            } = props;
        
            if (isLoading)
                return <Loader />
        
            if (totalFilms === 0)
                return <MessageBox message={ Constants.NoFilmsFound } />
        
            const columns = films.map((item) => {
                const strGenres = item.genre_ids.map((id) => {
                    const genre = genres.find(genre => genre.id === id)
                    return genre ? genre.name : id
                })
        
                return (
                    <MovieCard key={ item.id }
                               title={ item.title }
                               imageSource={ ApiHandler.getPosterLink(item.backdrop_path) } 
                               genres={ strGenres } 
                               description={ TextFormatter.cropText(item.overview) }
                               releaseDate={ TextFormatter.formatTextDate(item.release_date) }
                               rate={ item.vote_average }
                               displayStars={ displayStars }
                               starRate={ LocalStorageHandler.get(item.id) }
                               onRate={ (number) => {
                                LocalStorageHandler.set(item.id, number)
                               } } />
                )
            }).map((movieCard, index) => {
                return (
                    <Col key={ index } xs={{ span: 24 }} lg={{ span: 12 }}>
                        { movieCard }
                    </Col>
                )
            })
        
            return (
                <Row gutter={ [16, 16] }>
                    { columns }
                </Row> 
            )
        }}
    </GenresContext.Consumer>
}

export default MovieList