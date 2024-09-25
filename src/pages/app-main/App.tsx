import CharactersQuery from '../../components/CharactersQuery/CharactersQuery';
import { Form, Outlet } from 'react-router-dom';
import LoupeImg from '../../assets/Search_New.svg';
import FilterImg from '../../assets/Filter.svg';
import './App.css';

function App() {
  // const navigation = useNavigation();
  // const submit = useSubmit();

  // const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");

  // useEffect(() => {
  //   document.getElementById("q").value = q;
  // }, [q])

  return (
    <>
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
            <button className='filter'>
              <img src={FilterImg} alt="filter-img" />
            </button>
          </Form>
        </div>
        <nav>
          <CharactersQuery />
        </nav>
      </div>
      <div id="detail" className={"loading"} >
        <Outlet />
      </div >
    </>
  )
}

export default App
