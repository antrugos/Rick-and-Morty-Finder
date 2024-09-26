import { gql, useQuery } from "@apollo/client";
import HeartGrey from '../../assets/Heart-grey.svg';
import HeartGreen from '../../assets/Heart-green.svg';
import { Link } from "react-router-dom";
import './charactersQuery.css';

type Character = {
    id: string,
    name: string,
    image: string,
    status: string,
    species: string,
    gender: string,
    isFavorite: boolean,
}

type CharactersData = {
    characters: {
        results: Character[];
    }
}

export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
        image
        status
        species
        gender
        isFavorite @client
        isDeleted @client
      }
    }
  }
`;

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

    return (
        <ul className="content">
            {sortedCharacters.map(({ id, name, image, species, isFavorite }) => (
                <li key={id} className="card">
                    <Link to={`/character/${id}`}>
                        <div className="cardImg">
                            <img className='imgCharacter' alt={name} src={image} />
                            <div className='cardContent'>
                                <h3 className='cardTitle'>{name}</h3>
                                <p className='cardInfo'>{species}</p>
                            </div>
                            <div className="heartIcon">
                                <img src={isFavorite ? HeartGreen : HeartGrey} alt="heart-icon" />
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default CharactersQuery;