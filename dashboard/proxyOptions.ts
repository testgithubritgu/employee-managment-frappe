import { readFileSync } from 'node:fs';
import { IncomingMessage } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ProxyOptions } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commonSiteConfigPath = path.resolve(__dirname, '../../../sites/common_site_config.json');
const commonSiteConfig = JSON.parse(readFileSync(commonSiteConfigPath, 'utf-8')) as {
	webserver_port: number;
};
const { webserver_port } = commonSiteConfig;

type BenchProxyOptions = ProxyOptions & {
	router?: (req: IncomingMessage) => string;
};

const proxyOptions: Record<string, string | BenchProxyOptions> = {
	'^/(app|api|assets|files|private)': {
		target: `http://127.0.0.1:${webserver_port}`,
		ws: true,
		router(req: IncomingMessage) {
			const hostHeader = req.headers.host ?? '';
			const siteName = hostHeader.split(':')[0];
			return `http://${siteName}:${webserver_port}`;
		}
	}
};

export default proxyOptions;
