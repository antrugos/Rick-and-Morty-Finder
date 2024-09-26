import { useQuery } from '@apollo/client'
import CharacterCard from '../character-card/CharacterCard';
import { CharactersData, GET_CHARACTERS } from '../../graphql/queries';

const FavoriteCharacter = () => {
  const { loading, error, data } = useQuery<CharactersData>(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const characters = data?.characters?.results || [];

  const favoriteCharacters = characters.filter(character => character.isFavorite);

  return (
    <main className=''>
      <h1 className="titleCharacter">STARRED CHARACTER ({favoriteCharacters.length})</h1>
      <ul className="favoriteCharactersList">
        {favoriteCharacters.length > 0 ? (
          favoriteCharacters.map((favoriteCharacter) => (
            <CharacterCard key={favoriteCharacter.id} {...favoriteCharacter} />
          ))
        ) : (
          <p></p>
        )}
      </ul>
    </main>
  )
}

export default FavoriteCharacter;