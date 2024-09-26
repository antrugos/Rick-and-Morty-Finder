import { makeVar, InMemoryCache, ApolloClient } from '@apollo/client';

export const favoritesVar = makeVar<string[]>([]);
const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
favoritesVar(storedFavorites);

export const cache = new InMemoryCache({
    typePolicies: {
        Character: {
            fields: {
                isFavorite: {
                    read(_, { readField }) {
                        const id = readField<string>('id');
                        return favoritesVar().includes(id || '');
                    },
                },
            },
        },
    },
});

const client = new ApolloClient({
    cache,
    uri: 'https://rickandmortyapi.com/graphql',
});

export default client;