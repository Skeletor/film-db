
import { React } from 'react'
import { Avatar, Card, Flex, Rate, Tag } from 'antd'

import ColorDetector from '../service/color-detector'
import Constants from '../constants'
import './movie-card.css'
import { useState } from 'react'

const MovieCard = (props) => {
    const {
        title,
        imageSource, 
        description,
        genres,
        releaseDate,
        rate,
        displayStars,
        starRate: initialStarRate,
        onRate
    } = props

    const [starRate, setStarRate] = useState(initialStarRate)

    const genreTags = genres.map((item) => {
        return (
            <Tag key={item}>{ item }</Tag>
        )
    })

    const cardStyles = {
        body: {
            padding: '0px',
        }
    }

    const imageStyle = {
        width: '200px',
        height: '200px'
    }

    const avatarStyle = {
        backgroundColor: 'transparent',
        borderWidth: '2px',
        borderColor: ColorDetector.detectColorByRating(rate),
        borderStyle: 'solid',
        color: 'black'
    }

    const onImageLoadFailed = (event) => {
        const imgElement = event.target
        imgElement.src = Constants.DefaultImageSource
    }

    return (
        <Card styles={ cardStyles }
              style={{ overflow:'hidden' }}
              hoverable >

            <Flex >
                <img src={ imageSource }
                     style={ imageStyle }
                     onError={ onImageLoadFailed } />

                <Flex className='card-info'
                      vertical
                      style={{ flexGrow: 1 }} >

                    <Flex justify='space-between'>
                        <div>{ title }</div>
                        <Avatar style={ avatarStyle }>{ rate.toFixed(1) }</Avatar>
                    </Flex>
                    <div>{ releaseDate }</div>
                    <Flex>{ genreTags }</Flex>
                    <div>{ description }</div>
                    { displayStars ? <Rate count={ 10 }
                                           value={ starRate }
                                           allowHalf
                                           onChange={ (number) => {
                                            setStarRate(number)
                                            onRate(number)
                                           } } /> 
                                   : null }
                </Flex>
            </Flex>
        </Card>
    )
}

export default MovieCard