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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.charactersByIds.map(({ id, name, image }) => (
        <li key={id}>
          <img src={image} alt={name} />
          <p>{name}</p>
        </li>
      ))}
    </ul>
  );
};

export default FavoritesList;