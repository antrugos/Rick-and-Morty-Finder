import { gql, useQuery } from "@apollo/client";
import HeartIcon from '../../assets/Heart-grey.svg';
import { Link } from "react-router-dom";
import './charactersQuery.css';
import Favorite from "../favorite/Favorite";

type Character = {
    id: string,
    name: string,
    image: string,
    status: string,
    species: string,
    gender: string,
}

type CharactersData = {
    characters: {
        results: Character[];
    }
}

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
        image
        status
        species
        gender
      }
    }
  }
`;

type Props = {
    sortOrder: 'asc' | 'desc';
}

const CharactersQuery = ({ sortOrder }: Props) => {
    const { loading, error, data } = useQuery<CharactersData>(GET_CHARACTERS);

    if (loading) return <p></p>;
    if (error) return <p>Error : {error.message}</p>;

    const characters = data?.characters?.results || [];

    const sortedCharacters = [...characters].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
    });

    return (
        <ul className="content">
            {sortedCharacters.map(({ id, name, image, species }) => (
                <li key={id} className="card">
                    <Link to={`/character/${id}`}>
                        <div className="cardImg">
                            <img className='imgCharacter' alt={name} src={image} />
                            <div className='cardContent'>
                                <h3 className='cardTitle'>{name}</h3>
                                <p className='cardInfo'>{species}</p>
                            </div>
                            <div className="heartIcon">
                                <Favorite />
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default CharactersQuery;