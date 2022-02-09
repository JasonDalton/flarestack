# Backend

## Run tests in Docker

```sh
docker build -t backend . -f Dockerfile
docker run -e CI=true -p 3001:3001 backend
```

## Example .env file

```sh
# Connection URL for Mongoose
# See https://mongoosejs.com/docs/index.html
DATABASE_CONNECTION=mongodb://localhost:27017/dev

# In case you want to use ACID transactions, follow this doc:
# https://mongoosejs.com/docs/transactions.html
DATABASE_TRANSACTIONS=false

# Enable/Disable Swagger UI API Documentation
API_DOCUMENTATION_ENABLED=true

# Tenant Mode
# multi: Allow new users to create new tenants.
# multi-with-subdomain: Same as multi, but enable access to the tenant via subdomain.
# single: One tenant, the first user to register will be the admin.
TENANT_MODE=single

# Secret used to Sign the JWT (Authentication) tokens.
AUTH_JWT_SECRET=dsoijfs90pfusjcd09sd90sd

# How long the JWT (Authentication) token takes to expire.
AUTH_JWT_EXPIRES_IN=7 days

# Configuration to allow email sending used on:
# backend/src/services/emailSender.js
SENDGRID_EMAIL_FROM=
SENDGRID_KEY=
SENDGRID_TEMPLATE_EMAIL_ADDRESS_VERIFICATION=
SENDGRID_TEMPLATE_INVITATION=
SENDGRID_TEMPLATE_PASSWORD_RESET=

# Frontend Url.
# Ex.: http://localhost:<port>
FRONTEND_URL=http://localhost:3000

# Frontend URL with the subdomain for tenants.
# Works only for tenantMode=multi-with-subdomain
# Please use the variable [subdomain] on this URL.
FRONTEND_URL_WITH_SUBDOMAIN=http://[subdomain].localhost:3000

# Backend URL with /api
# Ex.: http://localhost:3001/api
BACKEND_URL=http://localhost:3001/api

# File Storage Provider
# localhost
# gcp (Google Cloud Platform)
# aws (Amazon Web Services)
FILE_STORAGE_PROVIDER=aws

# Bucket used for file storage
# Only for GCP and AWS
FILE_STORAGE_BUCKET=flarestack-dev

# Only needed if using gcp as the File storage provider
# If you are deploying on Google Cloud environment, you don't need to set this variable,
# because the configs will be fetch from the platform
GOOGLE_CLOUD_PLATFORM_CREDENTIALS=

# Only needed if using aws as the File storage provider
AWS_ACCESS_KEY_ID=**
AWS_SECRET_ACCESS_KEY=**
AWS_REGION=us-east-1

# OAuth Social Sign-in/Sign-up
AUTH_SOCIAL_GOOGLE_CLIENT_ID=***.apps.googleusercontent.com
AUTH_SOCIAL_GOOGLE_CLIENT_SECRET=***
AUTH_SOCIAL_GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/social/google/callback

```
