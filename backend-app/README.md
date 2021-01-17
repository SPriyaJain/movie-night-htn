# Flock Backend

Express.js server to provide data to app frontend. Connects with CockroachDB for data. Currently hosted at http://htn2020.appspot.com/

## Endpoints:
- /movies
  - /movies/ 
  - /movies/user/{userid}
  - /movies/like
- /users
  - /users/
  - /users/{userId}/genres/{genreId}
  - /users/{userId}/genres
  - /users/create
- /groups
  - /groups/
  - /groups/{groupId}
  - /groups/create
  - /groups/join
- /matches
  - /matches/group/{groupId}
  - /matches/user/view/{userId}
  - /matches/user/viewnew/{userId}
  - /matches/user/{userId}

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
