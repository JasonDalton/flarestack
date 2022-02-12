# FlareStack

Version: 0.0.1
Additional Documentation: <https://docs.scaffoldhub.io>

## Overview

- Authentication
- API
- Storage
- Analytics
- Functions

## Setup backend/frontend

```sh

# Setup env files
cp env/frontend.env.example frontend/.env
cp env/backend.env.example backend/.env

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies in another terminal
cd frontend && npm install

# Run this once on the database or whenever there is a migration
cd backend && npm run db:create
```

## Starting

```
# Start the database locally in development mode
docker-compose up -f services.yml -d mongo

# Start backend
cd backend && npm start

# Start frontend in another terminal
cd frontend && npm start
```

## Reset

```
docker-compose down --volumes
rm -rf \
  backend/{dist,node_modules} \
  frontend/{build,node_modules} \
  db/mongo_data
```

## Building

```


docker build -t flarestack_backend backend
docker build -t flarestack_frontend frontend

docker tag flarestack_backend:latest 578568968001.dkr.ecr.us-east-1.amazonaws.com/flarestack_backend:latest

docker tag flarestack_frontend:latest 578568968001.dkr.ecr.us-east-1.amazonaws.com/flarestack_frontend:latest

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 578568968001.dkr.ecr.us-east-1.amazonaws.com

docker push 578568968001.dkr.ecr.us-east-1.amazonaws.com/flarestack_frontend:latest
docker push 578568968001.dkr.ecr.us-east-1.amazonaws.com/flarestack_backend:latest

```

## Deployment

```

docker-compose \
  -f docker-compose.yml \
  -f docker-compose.production.yml \
  up -d

```

## Notes

The API interface

- A geoJSON polygon or multi-polygon
  Places in s3 bucket
- A user name
  Tracking userIds
- An authentication token
  Already handle - The job really soesn't need to know about this side of the API
  [optional] a job name
  [optional] contact info to get status updates (probably just an email at first)
- this is taken care of with the Auth rules. All users will ahve an email
  and get back:
  A unique ID that will be the key to the job status and results
  We can decide where we want authentication to happen (i.e. should that be part of the backend or frontend... if it's part of the frontend then there would just be something like a secret key that you would need to provide the backend API and we'd leave it up to the frontend code to authenticate)
