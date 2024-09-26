import { useState } from 'react';
import { Form, Outlet, useLocation, useNavigate } from 'react-router-dom';
import CharactersQuery from '../characters-query/CharactersQuery';
import Filter from '../../components/filter/Filter';
import LoupeImg from '../../assets/Search_New.svg';
import FilterImg from '../../assets/Filter.svg';
import './App.css';

function App() {
  const [isActive, setIsActive] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCount, setFilterCount] = useState<number>(0);
  const [resultsCount, setResultsCount] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  const openFilter = () => {
    setIsActive(!isActive);
  }

  const handleSort = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc')
  }

  const handleFilter = (filters: string[]) => {
    setSelectedFilters(filters);
    setFilterCount(filters.length);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const rootPath = location.pathname === '/';

  return (
    <main className='main'>
      <div id="sidebar">
        <h1 className='title'>Rick and Morty List</h1>
        <div className='searcher'>
          <Form id="search-form" role="search" className='searchForm'>
            <div>
              <img src={LoupeImg} alt="loupe-img" />
            </div>
            <input
              id="q"
              className={"inputSearch"}
              aria-label="Search characters"
              placeholder="Search or filter results"
              type="search"
              name="q"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              className={`filter ${isActive ? 'filterActive' : ''}`}
              type='button'
              onClick={openFilter}
            >
              <img src={FilterImg} alt="filter-img" />
            </button>
          </Form>
          <button className='sortButton' onClick={handleSort}>
            {sortOrder === 'asc' ? '🔼' : '🔽'}
          </button>
        </div>
        {isActive && (
          <div className='modal'>
            <Filter setIsActive={setIsActive} onFilter={handleFilter} />
          </div>
        )}
        <nav className='navCharacters'>
          {filterCount > 0 && (
            <div className="filterInfo">
              <p className='filterResults'>{resultsCount} results</p>
              <div className='filterContainerResults'>
                {filterCount} Filter{filterCount > 1 ? 's' : ''}
              </div>
            </div>
          )}
          <CharactersQuery
            sortOrder={sortOrder}
            filters={selectedFilters}
            searchTerm={searchTerm}
            onFilterCount={setFilterCount}
            onResultsCount={setResultsCount}
          />
        </nav>
      </div>
      {!rootPath && (
        <div id="detail">
          <button className="backButton" onClick={() => navigate("/")}>
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 26L10 19M10 19L17 12M10 19L28 19" stroke="#8054C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <Outlet />
        </div >)}
    </main>
  )
}

export default App
