import { gql, useQuery } from "@apollo/client";
import Favorite from "../../components/favorite/Favorite";
import { useParams } from "react-router-dom";
import './character.css';

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      species
    }
  }
`;

// export async function action({ request, params }) {
//     const formData = await request.formData();
//     return updateContact(params.contactId, {
//         favorite: formData.get("favorite") === "true",
//     });
// }

// export async function loader({ params }) {
//     const contact = await getContact(params.contactId);
//     if (!contact) {
//         throw new Response("", {
//             status: 404,
//             statusText: "Not found",
//         });
//     }
//     return { contact };
// }

const Character = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_CHARACTER, {
        variables: { id }
    });

    if (error) return <p>Error: {error.message}</p>;
    if (loading) return <p>Loading ...</p>;

    const { name, image, status, species } = data.character;

    return (
        <main id="character">
            <div className="contentCharacter">
                <div className="characterImg">
                    <img className="img" src={image} alt={name} />

                    <Favorite isFavorite={false} />
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