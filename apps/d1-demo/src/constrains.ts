import { Context } from 'hono';

export interface Env {
	DB: D1Database;
}

export type IHono = Context<{ Bindings: Env }>;
