import csv

# 3 Stages to the script:
## 1. Obtain general movie info w/ streaming platforms
## 2. Obtain movie imdb rating/link info from metadata csv
## 3. Output data into sql script

# movieName --> {id, year, on_netflix/hulu/prime/disney, genres, imdb_id, poster_url, synopsis}
movies = {}
# genreName --> genreId
genre_id = 1
genres = {}

with open('./archived/movies_streaming_platform_data.csv', encoding='utf-8') as stream_file:
    stream_reader = csv.reader(stream_file,delimiter=',')

    # Store general movie info (this CSV doesn't have imdb/pic info)
    for row in stream_reader:
        movies[row[2].replace("'", "''")] = {
            'id': row[1],
            'year': row[3],
            'imdb_rating': row[5] or 0.0,
            'on_n': bool(row[7]),
            'on_h': bool(row[8]),
            'on_p': bool(row[9]),
            'on_d': bool(row[10]),
            'genres': row[13].split(',')
        }

        # Store genres separately (used for genres/movie_genres table)
        for genre in row[13].split(','):
            if genre not in genres and genre != "":
                print("Found new genre: {} ({}) at {}".format(genre, genre_id, row[1]))
                genres[genre] = genre_id
                genre_id += 1
                
with open('./archived/movies_metadata.csv', encoding='utf-8') as metadata_file:
    metadata_reader = csv.reader(metadata_file)

    # Fill in missing data... Exclude movies found in this CSV and not last CSV
    for row in metadata_reader:
        # Only add movies that are in the dict already
        if row[20].replace("'", "''") in movies:
            movies[row[20].replace("'", "''")]['imdb_id'] = row[6]
            movies[row[20].replace("'", "''")]['desc'] = row[9].replace("'", "''")
            movies[row[20].replace("'", "''")]['plink'] = row[11]


# Write SQL queries out to file
sql_output = open('init_full_movie_data.sql', 'w', encoding='utf8')
print("Number of movies: {}".format(len(movies)))
print("Number of genres: {}".format(len(genres)))
sql_output.write("-- Movies\n")
for name, movie in movies.items():
    # Only include movies that appear in both streaming platforms and metadata CSVs
    if 'desc' not in movie:
        continue

    # SQL query to insert into movies table
    sql_output.write("insert into movies (mid, name, on_netflix, on_prime, on_disney, on_hulu, year, rating, overview, imdb_id, poster_path) values ({}, '{}', {}, {}, {}, {}, {}, {}, '{}', '{}', '{}');\n".format(movie['id'], name, movie['on_n'], movie['on_p'], movie['on_d'], movie['on_h'], movie['year'], movie['imdb_rating'], movie['desc'], movie['imdb_id'], movie['plink']))

sql_output.write("\n-- Genres\n")
for name, gid in genres.items():
    # SQL query to insert into genres table
    sql_output.write("insert into genres (genre_id, name) values ({}, '{}');\n".format(gid, name))

sql_output.write("\n-- Movies to Genres\n")
for name, movie in movies.items():
    for genre in movie['genres']:
        # Exclude movies with no genres (Shows up as single '' element in list)
        if genre not in genres or 'desc' not in movie:
            continue
        
        # SQL query to insert into movie_genres table
        sql_output.write("insert into movie_genres (mid, genre_id) values ({}, {});\n".format(movie['id'], genres[genre]))
sql_output.close()

