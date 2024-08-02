
import { Affix, Pagination } from "antd";

import './movie-pagination.css'

const MoviePagination = (props) => {
    const { total, currentPage, onPageChanged } = props

    const paginationStyle = {
        width: 'fit-content',
        margin: '0px auto',
        padding: '5px',
        backgroundColor: 'white',
        boxShadow: '0 0 20px 3px gray',
        borderRadius: '10px'
    }

    return (
        <Affix style={{ margin: '25px 0'}} offsetBottom={ 25 }>
            <Pagination className='pagination'
                        align='center'
                        defaultCurrent={ currentPage }
                        total={ total }
                        pageSize={ 20 } 
                        showSizeChanger={ false }
                        responsive
                        onChange={ onPageChanged }
                        style={ paginationStyle } />
        </Affix>
    )
}

export default MoviePagination