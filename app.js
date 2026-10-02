// use mock data for one card

const movie = { title: "The Matrix", year: 1999, genres: ["Action", "Sci-Fi"], rating: 8.7 };

addPage('Example', [movie]);

const favorite_movie = {
    "Title": "White Chicks",
    "Year": 2012,
    "Genre": "Comedy",
    "Rating": "6"
};

addPage('Favorite movie', [favorite_movie])

async function start()
{
// Use Database
const SQL = await initSqlJs({
    locateFile: file => `vendor/${file}`
});

// open db file
const response = await fetch(`movies.db`);
const bytes = await response.arrayBuffer();
const db = new SQL.Database(new Uint8Array(bytes));

// Problem 1
addPage ('Problem 1', db.exec
(`
    SELECT title, year 
    FROM movies 
    WHERE year = 2000 
    ORDER BY title 
    LIMIT 12
`))

addPage ('Problem 2', db.exec
(`
    SELECT title, rating 
    FROM movies 
    WHERE genres LIKE '%Comedy%'
    ORDER BY rating DESC
    LIMIT 5
`))

addPage ('Problem 3', db.exec
(`
    SELECT title, year, rating 
    FROM movies 
    WHERE genres LIKE '%Horror%'
    ORDER BY rating DESC
    LIMIT 5
`))

addPage ('Problem 4', db.exec
(`
    SELECT title, year, rating
    FROM movies 
    WHERE genres LIKE '%Comedy%'
    ORDER BY title
    LIMIT 8
`))

addPage ('Problem 5', db.exec
(`
    SELECT title, year, rating, rating_count 
    FROM movies 
    WHERE genres LIKE '%Horror%' AND year >= 2010
    ORDER BY year
    LIMIT 5
`))

addPage ('Problem 6', db.exec
(`
    SELECT title, year, rating 
    FROM movies 
    WHERE rating >= 4 AND year <= 1990 AND rating_count >= 50
    ORDER BY year
    LIMIT 10
`))

addPage ('Problem 7', db.exec
(`
    SELECT title, genres, rating 
    FROM movies 
    WHERE genres LIKE '%Comedy%' AND genres Like '%Horror%' AND rating_count >= 10
    ORDER BY rating
    LIMIT 5
`))

addPage ('Problem 8', db.exec
(`
    SELECT title, year, rating_count
    FROM movies 
    WHERE 2000 <= year AND year <= 2009 AND rating_count >= 50
    ORDER BY rating 
    LIMIT 5
`))

// Close database
db.close();
}

start().catch(showError);