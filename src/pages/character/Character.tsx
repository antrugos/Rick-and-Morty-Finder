import { gql, useQuery } from "@apollo/client";
import Favorite from "../../components/favorite/Favorite";
import { useParams } from "react-router-dom";
import './character.css';
import { favoritesVar } from "../../cache/ApolloClient";

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      species
      isFavorite @client
    }
  }
`;

const Character = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_CHARACTER, {
        variables: { id }
    });

    if (error) return <p>Error: {error.message}</p>;
    if (loading) return <p>Loading ...</p>;

    const { name, image, status, species } = data.character;
    const isFavorite = favoritesVar().includes(id);

    return (
        <main id="character">
            <div className="contentCharacter">
                <div className="characterImg">
                    <img className="img" src={image} alt={name} />
                    <Favorite characterId={id} isFavorite={isFavorite} />
                </div>
                <h1 className="characterTitle">{name}</h1>
            </div>
            <div className="containerInfo">
                <p className="info">
                    <span>Specie</span>
                    <span>{species}</span>
                </p>
                <p className="info">
                    <span>Status</span>
                    <span>{status}</span>
                </p>
                <p className="info">
                    <span>Occupation</span>
                    <span>Princess</span>
                </p>
            </div>
        </main>
    );
}

export default Character;