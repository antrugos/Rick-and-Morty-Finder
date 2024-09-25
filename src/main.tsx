import { ApolloClient, ApolloProvider, gql } from '@apollo/client';
import { createRoot } from 'react-dom/client';
import { cache } from './cache/ApolloClient.tsx'
import { RouterProvider } from 'react-router-dom';
import router from './routes/root.tsx';
import './index.css';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache,
});

client
  .query({
    query: gql`
      query GetCharacters {
        characters {
          results {
            id
            name
            image
            status
            species
            gender
          }
        }
      }
    `,
  })

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>,
)
