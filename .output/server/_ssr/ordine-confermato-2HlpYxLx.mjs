import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as CircleCheck } from "../_libs/lucide-react.mjs";
import { r as Route$1 } from "./router-D4QClDsP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ordine-confermato-2HlpYxLx.js
var import_jsx_runtime = require_jsx_runtime();
function Confermato() {
	const { numero } = Route$1.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto size-12 text-primary" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 text-4xl",
				children: "Grazie per il tuo ordine!"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-muted-foreground",
				children: [
					"Numero ordine ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: numero
					}),
					". Ti abbiamo inviato una email di conferma con i dettagli della spedizione."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/catalogo",
				className: "btn-base btn-primary mt-8",
				children: "Continua lo shopping"
			})
		]
	});
}
//#endregion
export { Confermato as component };
