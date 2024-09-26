import { useQuery } from "@apollo/client";
import { CharactersData, GET_CHARACTERS } from "../../graphql/queries";
import FavoriteCharacter from "../../components/favorite-character/FavoriteCharacter";
import CharacterCard from "../../components/character-card/CharacterCard";
import { filterData } from "../../data/filterData";
import './charactersQuery.css';
import { useState } from "react";

type Character = {
    id: string;
    image: string;
    name: string;
    status: string;
    species: string;
    gender: string;
    isFavorite: boolean;
};

type CharactersQueryProps = {
    sortOrder: 'asc' | 'desc';
    filters: string[];
    searchTerm: string;
    onFilterCount: (count: number) => void;
    onResultsCount: (count: number) => void;
}

const CharactersQuery: React.FC<CharactersQueryProps> = ({ sortOrder, filters, searchTerm, onFilterCount, onResultsCount }) => {
    const { loading, error, data } = useQuery<CharactersData>(GET_CHARACTERS);
    const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);


    let characters: Character[] = data?.characters?.results || [];

    if (searchTerm) {
        characters = characters.filter((character) =>
            character.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    const filterHandlers: Record<string, (character: Character, optionText: string) => boolean> = {
        Species: (character, optionText) =>
            optionText === "All" || character.species.toLowerCase() === optionText.toLowerCase(),
        Gender: (character, optionText) =>
            optionText === "All" || character.gender.toLowerCase() === optionText.toLowerCase(),
        Character: (character, optionText) => {
            if (optionText === "Starred") return character.isFavorite;
            if (optionText === "Others") return !character.isFavorite;
            return true;
        }
    };

    if (filters.length > 0) {
        characters = characters.filter((character) => {
            return filterData.every((filterSection) => {
                const selectedOption = filters.find((filterId) =>
                    filterSection.options.some((option) => option.id.toString() === filterId)
                );

                if (selectedOption) {
                    const optionData = filterSection.options.find(option => option.id.toString() === selectedOption);
                    const filterHandler = filterHandlers[filterSection.type];

                    return filterHandler ? filterHandler(character, optionData!.text) : true;
                }

                return true;
            });
        });

    }

    const sortedCharacters = [...characters].sort((a, b) =>
        sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    if (loading) return <p></p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <>
            <FavoriteCharacter />
            <ul className="content">
                <h1 className="titleCharacter">CHARACTER ({sortedCharacters.length})</h1>
                {sortedCharacters.length > 0 ? (
                    sortedCharacters.map((character) => (
                        <CharacterCard key={character.id} {...character} />
                    ))
                ) : (
                    <p className="notFound">No characters found</p>
                )}
            </ul>
        </>
    );
}

export default CharactersQuery;