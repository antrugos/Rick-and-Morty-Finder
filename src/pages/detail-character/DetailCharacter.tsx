import { useState } from "react";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import Favorite from "../../components/favorite/Favorite";
import { useParams } from "react-router-dom";
import './detailCharacter.css';
import Deleted from "../../components/deleted/Deleted";

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
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
`;

const DetailCharacter = () => {
    const [comments, setComments] = useState<{ [key: string]: string[] }>({});
    const [newComment, setNewComment] = useState<string>("");

    const client = useApolloClient();

    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_CHARACTER, {
        variables: { id }
    });

    if (loading) return <p></p>;
    if (error) return <p>Error: {error.message}</p>;

    const { name, image, status, species, gender, isFavorite, isDeleted } = data.character;
    const characterCommets = comments[id as string] || [];

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments({ ...comments, [id as string]: [...characterCommets, newComment] });
            setNewComment('');
        }
    }

    const handleDelete = () => {
        client.writeFragment({
            id: `Character:${id}`,
            fragment: gql`
              fragment UpdateCharacter on Character {
                isDeleted
              }
            `,
            data: {
                isDeleted: true,
            },
        });
    };

    const handleRestore = () => {
        client.writeFragment({
            id: `Character:${id}`,
            fragment: gql`
              fragment UpdateCharacter on Character {
                isDeleted
              }
            `,
            data: {
                isDeleted: false,
            },
        });
    };

    if (isDeleted) {
        return (
            <Deleted name={name} characterId={id || ''} handleRestore={handleRestore} />
        );
    }

    return (
        <main id="character">
            <div className="contentCharacter">
                <div className="characterImg">
                    <img className="img" src={image} alt={name} />
                    <Favorite characterId={id || ''} isFavorite={isFavorite} />
                </div>
                <h1 className="characterTitle">{name}</h1>
            </div>
            <section className="containerInfo">
                <p className="info">
                    <span>Specie</span>
                    <span>{species}</span>
                </p>
                <p className="info">
                    <span>Status</span>
                    <span>{status === "Dead" ? "🔴" : "🟢"} {status}</span>
                </p>
                <p className="info">
                    <span>Gender</span>
                    <span>{gender}</span>
                </p>
            </section>
            <section className="commentsSection">
                <h2>Comments</h2>
                <ul className="commentList">
                    {characterCommets.map((comment, index) => (
                        <li key={index} className="comment">{comment}</li>
                    ))}
                </ul>
                <textarea
                    className="commentInput"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button className="addCommentButton" onClick={handleAddComment}>Add Comment</button>
            </section>
            <button className="deleteButton" onClick={handleDelete}>Delete</button>
        </main>
    );
}

export default DetailCharacter;