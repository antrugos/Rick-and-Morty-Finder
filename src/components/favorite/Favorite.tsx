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

    const toogleFavorite = () => {
        client.mutate({
            mutation: TOGGLE_FAVORITE,
            variables: { id: characterId },
            update: (cache) => {
                const currentFavorites = favoritesVar();
                if (currentFavorites.includes(characterId)) {
                    favoritesVar(currentFavorites.filter(favId => favId !== characterId));
                } else {
                    favoritesVar([...currentFavorites, characterId]);
                }
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