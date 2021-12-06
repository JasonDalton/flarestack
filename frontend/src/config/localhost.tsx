// Place the URL here with the /api suffix.
// Ex.:`https://domain.com/api`;
const backendUrl = `http://localhost:8080/api`;

// SwaggerUI Documentation URL
// Leave black if documentation should be hidden
const apiDocumentationUrl = `http://localhost:8080/documentation`;

/**
 * Frontend Url.
 */
const frontendUrl = {
  host: 'localhost:3000',
  protocol: 'http',
};

/**
 * Tenant Mode
 * multi: Allow new users to create new tenants.
 * multi-with-subdomain: Same as multi, but enable access to the tenant via subdomain.
 * single: One tenant, the first user to register will be the admin.
 */
const tenantMode = 'single';

/**
 * Plan payments configuration.
 */
const isPlanEnabled = false;
const stripePublishableKey = '';
const mapboxAccessToken='pk.eyJ1IjoibWFwcGlza3lsZSIsImEiOiJja3Z4aDN1NTYwc3FoMm5vMXlyNGoxY2lhIn0.QTC6s5EWHcqXzHxw3s4PQQ'

export default {
  frontendUrl,
  backendUrl,
  apiDocumentationUrl,
  tenantMode,
  isPlanEnabled,
  stripePublishableKey,
  mapboxAccessToken
};
