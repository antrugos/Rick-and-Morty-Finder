import { gql } from '@apollo/client';

export type Character = {
    id: string;
    name: string;
    image: string;
    status: string;
    species: string;
    gender: string;
    isFavorite: boolean;
};

export type CharactersData = {
    characters: {
        results: Character[];
    };
};

export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
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
  }
`;