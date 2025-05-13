import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { Env } from './constrains';
import { ROUTES } from './route';
import d1DemoRoute from './routers/router';

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors());

app.route(ROUTES.controller, d1DemoRoute);

export default { fetch: app.fetch };
