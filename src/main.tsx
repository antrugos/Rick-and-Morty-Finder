import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes/root.tsx';
import './index.css';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
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
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>,
)
