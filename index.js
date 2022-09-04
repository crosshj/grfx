import Layout from './layout/layout.js';
import { host } from './shared/messages.js';

const layout = await Layout();
host();
