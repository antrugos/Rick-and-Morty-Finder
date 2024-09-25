import { useFetcher } from 'react-router-dom';

type Props = {}

const Favorite = (props: Props) => {
    const fetcher = useFetcher();

    return (
        <fetcher.Form method="post">
            <button
                name="favorite"
            // value={favorite ? "false" : "true"}
            // aria-label={
            //     favorite
            //         ? "Remove from favorites"
            //         : "Add to favorites"
            // }
            >
                {/* {favorite ? "★" : "☆"} */}
            </button>
        </fetcher.Form>
    );
}

export default Favorite;