import './SearchBar.css'

const SearchBar = () => {
  return (
    <div className='search-wrapper'>
        <div id="wrapper">
            <i className='fa-solid fa-search'></i>
            <input type='text' placeholder='Search shorts' />
        </div>
    </div>
  )
}

export default SearchBar