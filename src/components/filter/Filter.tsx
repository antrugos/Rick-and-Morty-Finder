import { useState } from "react";
import { filterData } from "../../data/filterData";
import "./filter.css";

type FilterProps = {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    onFilter: (selectedFilters: string[]) => void;
}

const Filter = ({ setIsActive, onFilter }: FilterProps) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const toggleOption = (id: string) => {
        setSelectedOptions(prev =>
            prev.includes(id) ? prev.filter(option => option !== id) : [...prev, id]
        );
    };

    const handleSearch = () => {
        onFilter(selectedOptions);
        setIsActive(false);
    }

    return (
        <main className="filterContainer">
            <div className='modalResponsive'>
                <button onClick={() => setIsActive(false)}>
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 26L10 19M10 19L17 12M10 19L28 19" stroke="#8054C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <h1 className="filterTitle">Filters</h1>
            </div>
            <div className="filtersContent">
                {filterData.map((filtDat) => (
                    <section className="filterSection" key={filtDat.id}>
                        <h2 className="filterType">{filtDat.type}</h2>
                        <div className="filterButtons">
                            {filtDat.options.map((option, index) => (
                                <button
                                    key={`${filtDat.id}-${index}`}
                                    className={`filterButton ${selectedOptions.includes(option.id.toString()) ? 'filterButton-active' : ''}`}
                                    onClick={() => toggleOption(option.id.toString())}
                                >
                                    {option.text}
                                </button>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
            <button className="filterSearch" onClick={handleSearch}>Filter</button>
        </main>
    )
}

export default Filter;