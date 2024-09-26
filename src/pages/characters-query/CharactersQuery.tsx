import { useQuery } from "@apollo/client";
import { CharactersData, GET_CHARACTERS } from "../../graphql/queries";
import FavoriteCharacter from "../../components/favorite-character/FavoriteCharacter";
import CharacterCard from "../../components/character-card/CharacterCard";
import './charactersQuery.css';
import { filterData } from "../../data/filterData";

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
}

const CharactersQuery: React.FC<CharactersQueryProps> = ({ sortOrder, filters, searchTerm }) => {
    const { loading, error, data } = useQuery<CharactersData>(GET_CHARACTERS);

    if (loading) return <p></p>;
    if (error) return <p>Error : {error.message}</p>;

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

    const sortedCharacters = [...characters].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
    });

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