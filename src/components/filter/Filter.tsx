import { filterData } from "../../data/filterData";
import "./filter.css";

type Props = {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filter = ({ setIsActive }: Props) => {
    return (
        <main className="filterContainer">
            <div className='modalResponsive'>
                <button onClick={() => setIsActive(false)}>
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 26L10 19M10 19L17 12M10 19L28 19" stroke="#8054C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <h1 className="filterTitle">Filters</h1>
            </div>
            <div className="filtersContent">
                {filterData.map((filtDat) => (
                    <section className="filterSection" key={filtDat.id}>
                        <h2 className="filterType">{filtDat.type}</h2>
                        <div className="filterButtons">
                            {filtDat.options.map((option) => (
                                <button key={option.id} className="filterButton">
                                    {option.text}
                                </button>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
            <button className="filterSearch">Filter</button>
        </main>
    )
}

export default Filter;