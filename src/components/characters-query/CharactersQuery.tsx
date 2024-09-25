import { gql, useQuery } from "@apollo/client";
import HeartIcon from '../../assets/Heart-grey.svg';
import { Link } from "react-router-dom";
import './charactersQuery.css';

type Character = {
    id: string,
    name: string,
    image: string,
    status: string,
    species: string,
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
      }
    }
  }
`;

const CharactersQuery = () => {
    const { loading, error, data } = useQuery<CharactersData>(GET_CHARACTERS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <ul className="content">
            {data?.characters.results.map(({ id, name, image, species }) => (
                <li key={id} className="card">
                    <Link to={`/character/${id}`}>
                        <div className="cardImg">
                            <img className='img' alt={name} src={image} />
                            <div className='cardContent'>
                                <h3 className='cardTitle'>{name}</h3>
                                <p className='cardInfo'>{species}</p>
                            </div>
                            <div className="heartIcon">
                                <img src={HeartIcon} alt="heart-icon" />
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default CharactersQuery;