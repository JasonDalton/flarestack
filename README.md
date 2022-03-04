# FlareStack

Version: 0.0.1
Additional Documentation: <https://docs.scaffoldhub.io>

```
 ssh -i "ai_deploy.pem" ubuntu@ec2-54-158-29-242.compute-1.amazonaws.com
```

## Overview

- Authentication
- API
- Storage
- Analytics
- Functions

## Setup backend/frontend

```sh
# Install backend dependencies
cd backend && npm install
# Install frontend dependencies in another terminal
cd frontend && npm install
# Run this once on the database or whenever there is a migration
docker-compose up -d mongo
cd backend && npm run db:create
```

## Starting

```
# Start the database locally in development mode

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
  frontend/{build,node_modules
```

## Building

```


aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 578568968001.dkr.ecr.us-east-1.amazonaws.com


docker build -t flarestack_backend backend
docker tag flarestack_backend 578568968001.dkr.ecr.us-east-1.amazonaws.com/flarestack_backend:latest
docker push 578568968001.dkr.ecr.us-east-1.amazonaws.com/flarestack_backend:latest


docker build -t flarestack_frontend frontend
docker tag flarestack_frontend 578568968001.dkr.ecr.us-east-1.amazonaws.com/flarestack_frontend:latest
docker push 578568968001.dkr.ecr.us-east-1.amazonaws.com/flarestack_frontend:latest

```

## Deployment

```
docker-compose -f docker-compose.prod.yml -d up
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
