import { useState } from 'react';
import { useFetcher } from 'react-router-dom';
import HeartGrey from '../../assets/Heart-grey.svg';
import HeartGreen from '../../assets/Heart-green.svg';


type Props = {
    isFavorite: boolean;
}

const Favorite = ({ isFavorite }: Props) => {
    const fetcher = useFetcher();
    const [favorite, setFavorite] = useState(isFavorite);

    const toogleFavorite = () => {
        setFavorite(!favorite);
    }

    return (
        <fetcher.Form method="post">
            <button
                onClick={toogleFavorite}
                className={`favoriteButton ${favorite ? 'favorite-active' : ''}`}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                <img
                    src={favorite ? HeartGreen : HeartGrey}
                    alt={favorite ? "Remove from favorites" : "Add to favorites"}
                />
            </button>
        </fetcher.Form>
    );
}

export default Favorite;