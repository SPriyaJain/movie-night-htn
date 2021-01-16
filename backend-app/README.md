
# Steps to run
1. Copy CockroachDB's cc-ca.crt certificate to backend-app directory
2. Change [db password in backend-app/app.js](https://github.com/SPriyaJain/movie-night-htn/blob/main/backend-app/app.js#L11) to actual password
3. Run:
```bash
# Assuming you're in backend-app directory
npm i
npm start
```

# Steps to deploy to GCP App Engine
1. Make sure you have [Google Cloud SDK](https://cloud.google.com/sdk) installed
2. Run: `gcloud app deploy`
