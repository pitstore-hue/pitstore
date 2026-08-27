import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as ProductCard } from "./product-card-Bk2jR1I7.mjs";
import { o as products } from "./router-D4QClDsP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalogo-DwUKIsVO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var categories = ["Tutte", ...Array.from(new Set(products.filter((p) => !p.soon).map((p) => p.category)))];
function Catalogo() {
	const [active, setActive] = (0, import_react.useState)("Tutte");
	const list = active === "Tutte" ? products : products.filter((p) => !p.soon && p.category === active);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl",
				children: "Catalogo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-lg text-muted-foreground",
				children: "Tre prodotti selezionati per la luce della notte. Scegli la variante che preferisci direttamente dalla scheda."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setActive(c),
					className: active === c ? "btn-base btn-primary !px-4 !py-1.5 !text-xs" : "btn-base btn-outline !px-4 !py-1.5 !text-xs",
					children: c
				}, c))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.slug))
			})
		]
	});
}
//#endregion
export { Catalogo as component };
