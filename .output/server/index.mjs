globalThis.__nitro_main__ = import.meta.url;
import { i as serve, r as NodeResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
import { a as toEventHandler, i as defineLazyEventHandler, n as HTTPError, r as defineHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots (1).txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-08T12:33:08.828Z",
		"size": 160,
		"path": "../public/robots (1).txt"
	},
	"/assets/cart-D0LrTtOV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b5a-5kQ3ytPJcUtcrk7uAOGAetD983s\"",
		"mtime": "2026-08-08T16:45:55.160Z",
		"size": 2906,
		"path": "../public/assets/cart-D0LrTtOV.js"
	},
	"/assets/catalogo-C19m--D_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"414-3A4WaCONiES5ajdMLKtKLajrv5k\"",
		"mtime": "2026-08-08T16:45:55.161Z",
		"size": 1044,
		"path": "../public/assets/catalogo-C19m--D_.js"
	},
	"/assets/checkout-HYSXUjfx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1841-BQlu/DW9Es6DmyHRJS/Xp172hZw\"",
		"mtime": "2026-08-08T16:45:55.163Z",
		"size": 6209,
		"path": "../public/assets/checkout-HYSXUjfx.js"
	},
	"/assets/contatti-D6Ow6s7c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d3a-cGFlVlGdmcVBkPrO7JJ0zHKJr8A\"",
		"mtime": "2026-08-08T16:45:55.174Z",
		"size": 3386,
		"path": "../public/assets/contatti-D6Ow6s7c.js"
	},
	"/assets/hero-lamp-C1P1qkW8.jpg": {
		"type": "image/jpeg",
		"etag": "\"2535d-pa818D4Draqaxzn1Qz4mIKXoILc\"",
		"mtime": "2026-08-08T16:45:55.199Z",
		"size": 152413,
		"path": "../public/assets/hero-lamp-C1P1qkW8.jpg"
	},
	"/assets/index-CjriJjlT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54873-8+dAD8p236OgUNzx5pOJVK9ctf0\"",
		"mtime": "2026-08-08T16:45:55.159Z",
		"size": 346227,
		"path": "../public/assets/index-CjriJjlT.js"
	},
	"/assets/jsx-runtime-BvwiM1Ak.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e8b-5g2rN7XwUOmylPQT2ibWGF3irBE\"",
		"mtime": "2026-08-08T16:45:55.193Z",
		"size": 11915,
		"path": "../public/assets/jsx-runtime-BvwiM1Ak.js"
	},
	"/assets/link-TE5HIzhu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54cc-SjBaDiy+FoIG2cI1As36CZdBCc0\"",
		"mtime": "2026-08-08T16:45:55.193Z",
		"size": 21708,
		"path": "../public/assets/link-TE5HIzhu.js"
	},
	"/assets/ordine-confermato-B85_wIT8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"357-FFhITA6VMZ29CigkRrplitU7yPA\"",
		"mtime": "2026-08-08T16:45:55.194Z",
		"size": 855,
		"path": "../public/assets/ordine-confermato-B85_wIT8.js"
	},
	"/assets/preload-helper-CHxGdf4X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1740-qLHlfSxp0Rw7GDgTvStcsc3PUpw\"",
		"mtime": "2026-08-08T16:45:55.195Z",
		"size": 5952,
		"path": "../public/assets/preload-helper-CHxGdf4X.js"
	},
	"/assets/prodotto._slug-BUoXyCXE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc3-jXYPhrBCkdapS2/IsiNZLC75tR0\"",
		"mtime": "2026-08-08T16:45:55.195Z",
		"size": 3011,
		"path": "../public/assets/prodotto._slug-BUoXyCXE.js"
	},
	"/assets/prodotto._slug-DQA7Q5eh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42f-R1Fj5HYDdRmCTU6g7LVH2SuQO58\"",
		"mtime": "2026-08-08T16:45:55.196Z",
		"size": 1071,
		"path": "../public/assets/prodotto._slug-DQA7Q5eh.js"
	},
	"/assets/product-card-DCkGA3i7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f3-gwQKQ/YQm7pQsAnfysWV1+lIdHM\"",
		"mtime": "2026-08-08T16:45:55.196Z",
		"size": 2547,
		"path": "../public/assets/product-card-DCkGA3i7.js"
	},
	"/assets/routes-DHt0il9T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cba-wrzJdWgsCy7g40QvedCs5cN0kXM\"",
		"mtime": "2026-08-08T16:45:55.197Z",
		"size": 3258,
		"path": "../public/assets/routes-DHt0il9T.js"
	},
	"/assets/proiettore-cielo-stellato-CtwA3uVH.png": {
		"type": "image/png",
		"etag": "\"1e1f0-V7LCqSoVfAh/aRiTjAu3dEseuvQ\"",
		"mtime": "2026-08-08T16:45:55.199Z",
		"size": 123376,
		"path": "../public/assets/proiettore-cielo-stellato-CtwA3uVH.png"
	},
	"/assets/styles-BiDqVUnz.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"132d4-4YQ80+EEpuYvTz8zM7Y3URYqJIs\"",
		"mtime": "2026-08-08T16:45:55.260Z",
		"size": 78548,
		"path": "../public/assets/styles-BiDqVUnz.css"
	},
	"/assets/types-D5HJHnXB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dbd7-Fhc2zMa2QzeDvZPYVWL9vtm53DA\"",
		"mtime": "2026-08-08T16:45:55.197Z",
		"size": 56279,
		"path": "../public/assets/types-D5HJHnXB.js"
	},
	"/assets/useNavigate-D2YWeT57.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df-9tziDfUQ1EOWhqlce9tRTv8IQJE\"",
		"mtime": "2026-08-08T16:45:55.198Z",
		"size": 223,
		"path": "../public/assets/useNavigate-D2YWeT57.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_MMcwi_ = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_MMcwi_
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
