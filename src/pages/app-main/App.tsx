import { useState } from 'react';
import { Form, Outlet } from 'react-router-dom';
import CharactersQuery from '../../components/characters-query/CharactersQuery';
import Filter from '../../components/filter/Filter';
import LoupeImg from '../../assets/Search_New.svg';
import FilterImg from '../../assets/Filter.svg';
import './App.css';

function App() {
  const [isActive, setIsActive] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const openFilter = () => {
    setIsActive(!isActive);
  }

  const handleSort = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc')
  }

  const handleFilter = (filters: string[]) => {
    setSelectedFilters(filters);
    console.log('Selected Filters:', filters);
  };

  return (
    <main className='main'>
      <div id="sidebar">
        <h1 className='title'>Rick and Morty List</h1>
        <div className='searcher'>
          <Form id="search-form" role="search" className='searchForm'>
            <div
              id="search-spinner"
              aria-hidden
            // hidden={!searching}
            >
              <img src={LoupeImg} alt="loupe-img" />
            </div>
            <input
              id="q"
              className={"inputSearch"}
              aria-label="Search characters"
              placeholder="Search or filter results"
              type="search"
              name="q"
            // defaultValue={q}
            // onChange={(e) => {
            //   const isFirstSearch = q == null;
            //   submit(e.currentTarget.form, { replace: !isFirstSearch });
            // }}
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
          <CharactersQuery sortOrder={sortOrder} filters={selectedFilters} />
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div >
    </main>
  )
}

export default App
