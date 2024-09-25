import { InMemoryCache, makeVar, gql } from "@apollo/client";

export const favoritesVar = makeVar<String[]>([]);

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                favorites: {
                    read() {
                        return favoritesVar();
                    },
                },
            },
        },
        Character: {
            fields: {
                isFavorite: {
                    read(_, { readField }) {
                        const id = readField('id');
                        return favoritesVar().includes(id as string);
                    },
                },
            },
        },
    },
});

export const typeDefs = gql`
  extend type Mutation {
    toggleFavorite(id: ID!): [ID!]!
  }
`;

export const resolvers = {
    Mutation: {
        toggleFavorite: (_, { id }) => {
            const currentFavorites = favoritesVar();
            if (currentFavorites.includes(id)) {
                favoritesVar(currentFavorites.filter(favId => favId !== id));
            } else {
                favoritesVar([...currentFavorites, id]);
            }
            return favoritesVar();
        },
    },
};