# 🚀 Rick and Morty API App - GraphQL

Welcome! This is a **TypeScript** project that uses the **Rick and Morty API** via **GraphQL** to display characters from the famous series. The characters are detailed with their image, full name, species, status, and gender.

## 🛠️ Technologies Used

- **TypeScript**: For developing the user interface.
- **GraphQL**: To fetch data from the Rick and Morty API.
- **Apollo Client**: To manage queries and GraphQL state in the frontend.
- **Vite**: For a fast development environment.

## 🚀 Features

- Fetch characters, displaying their image, full name, species, status, and gender.
- Filter characters by name, species, and gender.
- Navigate between episodes and related characters.

## 📦 Installation

Follow these steps to set up the project on your local machine:

1. Clone the repository:

   ```bash
   git clone https://github.com/antrugos/Rick-and-Morty-Finder.git
   ```
2. Navigate to the project folder:

 ```bash
   cd verifypage
```

3. Install depedencies:

 ```bash
   npm install
```

4. Start the development server:

   ```bash
   npm run dev
   ```

## 🖼️ App Preview

The app will run on http://localhost:5173/. Open your browser and start exploring the Rick and Morty universe!

## 🤖 Rick and Morty API

The Rick and Morty API is a powerful resource that allows developers to access data related to characters, episodes, and locations from the beloved animated series. By using GraphQL, you can efficiently query specific data fields, reducing the amount of data transferred and improving performance. Here’s how to get started:

1. Understanding GraphQL

GraphQL is a query language for APIs that enables you to request only the data you need. Unlike REST, which exposes multiple endpoints for different resources, GraphQL uses a single endpoint that can handle various types of queries.

2. Making Your First Query

To interact with the Rick and Morty API, you can use the following basic query structure:

```bash
{
  characters {
    results {
      id
      name
      status
      species
      gender
      image
    }
  }
}
```

This query retrieves a list of characters along with their ID, name, status, species, gender, and image URL.

3. Setting Up Apollo Client
In your TypeScript project, you can set up Apollo Client to handle GraphQL queries. Here's how:

- Install Apollo Client:

```bash
    npm install @apollo/client graphql
```
- Configure Apollo Client:

Create an instance of Apollo Client to connect to the Rick and Morty API:

```bash
    import { ApolloClient, InMemoryCache } from '@apollo/client';

    const client = new ApolloClient({
      uri: 'https://rickandmortyapi.com/graphql',
      cache: new InMemoryCache(),
    });
```

4. Executing Queries

You can execute GraphQL queries using Apollo Client’s useQuery hook in your React components. Here’s an example:

```bash
    import { useQuery, gql } from '@apollo/client';

    const GET_CHARACTERS = gql`
      {
        characters {
          results {
            id
            name
            status
            species
            gender
            image
          }
        }
      }
    `;
    
    const CharactersList = () => {
      const { loading, error, data } = useQuery(GET_CHARACTERS);
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
    
      return (
        <ul>
          {data.characters.results.map((character) => (
            <li key={character.id}>{character.name}</li>
          ))}
        </ul>
      );
    };
```

5. Filtering Data

You can also filter characters by specific criteria using arguments in your queries. For instance, to fetch characters by species, you could modify your query as follows:

```bash
    query($species: String) {
      characters(filter: { species: $species }) {
        results {
          id
          name
          image
        }
      }
    }
```

6. Exploring Further
To explore more about the available queries and mutations, refer to the [official documentation](https://rickandmortyapi.com/documentation)


## 🎯 Styling with Tailwind

This project utilizes **Tailwind CSS** to style the application efficiently and modularly. Some of the benefits of using **Tailwind** in this project include:

- **Predefined Styles**: Tailwind provides a wide range of predefined classes that simplify UI design, such as colors, typography, sizes, and more.
- **Responsive Design**: Thanks to Tailwind’s responsive utilities, the app easily adapts to different screen sizes.
- **Flexibility and Speed**: Tailwind allows you to create a clean and scalable design without needing to write custom CSS files, keeping the CSS file compact.

In addition, this project employs the `@apply` directive in a CSS script to define reusable styles, reducing the need for inline styles directly in the HTML. This keeps the code cleaner and more maintainable.

```bash
    .button {
       @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
    }
```

Using `@apply` allows us to reuse Tailwind’s utility classes while keeping the styling centralized in a CSS file.