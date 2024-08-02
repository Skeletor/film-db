
import { Input } from 'antd'
import debounce from 'lodash.debounce'

const SearchInput = (props) => {
    const { onSearch } = props

    const searchDelay = 750
    const search = debounce((input) => {
        const text = input.currentTarget.value.trim()
        onSearch(text ? text : undefined)
    }, searchDelay)
    
    const inputStyle = {
        marginBottom: '20px',
    }

    return (
        <Input placeholder='Поиск по названию...' 
               onChange={ search }
               style={ inputStyle } />
    )
}

export default SearchInput