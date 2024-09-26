import { useQuery } from "@apollo/client";
import { CharactersData, GET_CHARACTERS } from "../../graphql/queries";
import FavoriteCharacter from "../../components/favorite-character/FavoriteCharacter";
import CharacterCard from "../../components/character-card/CharacterCard";
import './charactersQuery.css';



type Props = {
    sortOrder: 'asc' | 'desc';
    filters: string[];
}

const CharactersQuery = ({ sortOrder, filters }: Props) => {
    const { loading, error, data } = useQuery<CharactersData>(GET_CHARACTERS);

    if (loading) return <p></p>;
    if (error) return <p>Error : {error.message}</p>;

    const characters = data?.characters?.results || [];


    const filteredCharacters = characters.filter(character => {
        return filters.length === 0 || filters.includes(character.species);
    });

    const sortedCharacters = [...characters].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
    });

    const favoriteCharacters = characters.filter(character => !character.isFavorite);

    return (
        <>
            <FavoriteCharacter />
            <ul className="content">
                <h1 className="titleCharacter">CHARACTER ({favoriteCharacters.length})</h1>
                {sortedCharacters.map((character) => (
                    <CharacterCard key={character.id} {...character} />
                ))}
            </ul>
        </>
    );
}

export default CharactersQuery;