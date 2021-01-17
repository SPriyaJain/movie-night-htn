# Flock Backend

Express.js server to provide data to app frontend. Connects with CockroachDB for data. Currently hosted at http://htn2020.appspot.com/

## Endpoints:
- `/movies`
  - `/movies/`
    - [GET] Grabs a list of 10 movies
  - `/movies/user/{userid}`
    - [GET] Grabs 10 movies recommended for the specified user
  - `/movies/like`
    - [POST] Likes/Dislikes a specified movie for a user (Input: {uid, mid, is_liked})
- `/users`
  - `/users/`
    - [GET] Returns all users (uid/name/join date)
  - `/users/{userId}/genres/{genreId}`
    - [GET] Likes a specific genre for a user
  - `/users/{userId}/genres`
    - [GET] Returns the liked genres of a user
  - `/users/create`
    - [POST] Creates new user (Input: {name})
- `/groups`
  - `/groups/`
    - [GET] Returns all groups
  - `/groups/{groupId}`
    - [GET] Returns all members in the group
  - `/groups/create`
    - [POST] Creates new group containing the user that posted (Input: {uid})
  - `/groups/join`
    - [POST] Joins the specified group if pin is valid (Input: {pin, uid})
- `/matches`
  - `/matches/group/{groupId}`
    - [GET] Grabs all matches by specified group
  - `/matches/user/view/{userId}`
    - [GET] Grabs matches (by specified user) that have not been accepted/deleted
  - `/matches/user/viewnew/{userId}`
    - [GET] Grabs all matches by specified user
  - `/matches/user/{userId}`
    - [GET] Finds new matches for a user and inserts into 

## Steps to run
1. Copy CockroachDB's cc-ca.crt certificate to backend-app directory
2. Change [db password in backend-app/app.js](https://github.com/SPriyaJain/movie-night-htn/blob/main/backend-app/app.js#L11) to actual password
3. Run:
```bash
# Assuming you're in backend-app directory
npm i
npm start
```

## Steps to deploy to GCP App Engine
1. Make sure you have [Google Cloud SDK](https://cloud.google.com/sdk) installed
2. Run: `gcloud app deploy`
