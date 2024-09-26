import { useQuery, gql, useReactiveVar } from '@apollo/client';
import { favoritesVar } from '../../cache/ApolloClient';

const GET_FAVORITES = gql`
  query GetFavorites($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      image
      species
      gender
    }
  }
`;

const FavoritesList = () => {
  const favoriteIds = useReactiveVar(favoritesVar);
  const { loading, error, data } = useQuery(GET_FAVORITES, {
    variables: { ids: favoriteIds },
    skip: favoriteIds.length === 0,
  });

  if (loading) return <p></p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.charactersByIds.map((charactersById: []) => (
        <li key={charactersById.id}>
          <img src={charactersById.image} alt={charactersById.name} />
          <p>{charactersById.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default FavoritesList;