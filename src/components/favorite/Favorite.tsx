import { gql, useApolloClient } from '@apollo/client';
import { favoritesVar } from '../../cache/ApolloClient';
import HeartGrey from '../../assets/Heart-grey.svg';
import HeartGreen from '../../assets/Heart-green.svg';

type Props = {
    characterId: string;
    isFavorite: boolean;
}

const Favorite = ({ characterId, isFavorite }: Props) => {
    const client = useApolloClient();;

    const TOGGLE_FAVORITE = gql`
        mutation ToggleFavorite($id: ID!) {
            toggleFavorite(id: $id) @client
        }
    `;

    console.log(isFavorite)

    const toogleFavorite = () => {
        client.mutate({
            mutation: TOGGLE_FAVORITE,
            variables: { id: characterId },
            update: () => {
                const currentFavorites = favoritesVar();
                let updatedFavorites;

                if (currentFavorites.includes(characterId)) {
                    updatedFavorites = currentFavorites.filter(favId => favId !== characterId);
                } else {
                    updatedFavorites = [...currentFavorites, characterId];
                }
                favoritesVar(updatedFavorites);
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            }
        });
    }

    return (
        <button
            onClick={toogleFavorite}
            className={`favoriteButton ${isFavorite ? 'favorite-active' : ''}`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
            <img
                src={isFavorite ? HeartGreen : HeartGrey}
                alt={isFavorite ? "Remove from favorites" : "Add to favorites"}
            />
        </button>
    );
}

export default Favorite;