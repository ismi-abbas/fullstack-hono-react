import { hc } from 'hono/client';
import { AppType } from '@server/index';

export const client = hc<AppType>('http://localhost:8080');
