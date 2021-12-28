# FlareStack

Version: 0.0.1
Additional Documentation: https://docs.scaffoldhub.io

## Overview

* Authentication
* API
* Storage
* Analytics
* Functions


## Setup & Start MongoDB locally (development)

```
# Start the database locally in development mode
docker-compose --file mongo-stack.dev.yml up -d mongo

# optionally start it with Mongo Express (http://localhost:8081 )to debug
# docker-compose --file mongo-stackyml --profile debug up mongo

```

## Setup backend/frontend

```
# Setup env files
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

# Install dependencies
(cd frontend && npm install)
(cd backend && npm install)

# Run this once on the database or whenever there is a migration
# (cd backend && npm run db:create)
```

## Start backend/frontend

```
# Install dependencies
(cd backend && npm start)
(cd frontend && npm start)
```

## Reset

```
docker-compose --file mongo-stack.yml down --volumes
rm -rf backend/node_modules
rm -rf frontend/node_modules
```

## Notes

The API interface
* A geoJSON polygon or multi-polygon
Places in s3 bucket
* A user name
Tracking userIds
* An authentication token
Already handle - The job really soesn't need to know about this side of the API
[optional] a job name
[optional] contact info to get status updates (probably just an email at first)
* this is taken care of with the Auth rules. All users will ahve an email
and get back:
A unique ID that will be the key to the job status and results
We can decide where we want authentication to happen (i.e. should that be part of the backend or frontend... if it's part of the frontend then there would just be something like a secret key that you would need to provide the backend API and we'd leave it up to the frontend code to authenticate)
