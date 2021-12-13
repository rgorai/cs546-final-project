# cs546-final-project

## MediaHub

With a plethora of streaming services one tends to waste time in searching for a platform to stream their favorite movies and TV shows.
Our website is a one stop hub for all the movies and shows of various genres

Built using HTML, CSS, Javascript, React.js, Node.js, Express and MongoDB.

## Getting Started

### How to Setup
/server
- Run 'npm install' to install the required dependencies for our project
- Then run 'npm run seed' to run the task of seeding the database
- Run 'npm start'
- Run 'npm run seed' to seed the database
- If seeding fails (due to TMDB error), please follow prompts or re-execute seed script

/client
- Run 'yarn install' to install the required dependencies for our project
- Run 'yarn start'

### Notes:
- Please run client on Chrome
- Seeding the database may yield explicit results

### Testing:
 - run with server off
 - run with empty collections
 - run with less/more data in collections
 - can sign in with email or username
 - try every combination of routes
 - try accessing protected content when not authorized / vice versa
 - invalid inputs on all forms
 - accessibilty (look at slides)
 - try incorrect querystrings for sorting
 - redirect to login redirects back to review
 - test adding/removing to/from watchlist
 - test creating, editing, deleting review -> check trending updates
 - tool tips on cards/images

### Code Style:
 - use single-quotes except in html
 - use arrow functions
 - no semicolons
 - no brackets for one-line clauses (if/for/while)
 - try to use regex for input checking patterns (urls, phone numbers, etc)
 - try to use ternary operators

### Core Features:
- Landing Page
    * Explain the purpose of the website
    * Sign in option for the users
- Movies/TV Shows Page
    * List of all the TV shows and movies sorted by genres/ streaming service
- Search bar
- Individual Movie/ TV show page:
    * Information about the movie/ TV show
    * Streaming options
    * User can give ratings/ comments
    * Youtube Trailer of the movie/ TV show
- Signed in User can create a watchlist
- Signed in User can see all their ratings and comments in their account
- Top 5 trending in each genre based on number of likes
- Like/ Dislike option

### Extra Features:
- User can give requests to add a movie/ TV show
- Autocomplete/ smart search


### GitHub Link:
https://github.com/rgorai/cs546-final-project