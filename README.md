## Setup Instructions

### 1. Clone the Repository

```bash
git clone git@github.com:Hemangshu1904/Code-Walnut.git
```

### 2. Install Dependencies

```bash
npm run dev
```

### 3.Run the Development Server: Start the development server using:

To start the development server, run:

```bash
npm run dev
```

### Approach
* Fetching Data: Utilized the PokeAPI to fetch Pokémon data. Implemented API calls using Next.js's built-in data fetching methods.

* Search Functionality: Integrated a search bar allowing users to search for Pokémon by name or ID. This feature provides instant feedback on valid or invalid searches.

* Display of Pokémon Details: After a search, the app displays the Pokémon's name, image, types, abilities, and stats (HP, Attack, etc.) in a responsive layout.

* Pagination: Implemented pagination to allow users to browse through lists of Pokémon. Used limit and offset parameters to control the displayed data.

### Challenges and Trade-offs
* Error Handling: Implementing robust error handling for invalid searches was a challenge. I had to ensure that the app provides clear feedback to the user in case of a search failure.

* Pagination Logic: Designing an efficient pagination system that allows seamless browsing of Pokémon was complex. I had to balance the number of Pokémon displayed with performance.

* Responsive Design: Ensuring the app is fully responsive required careful attention to CSS and layout considerations, especially for different screen sizes.
