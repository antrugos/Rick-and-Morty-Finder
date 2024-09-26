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

This project uses the Rick and Morty API through GraphQL. You can view the official documentation here: Rick and Morty API GraphQL.

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