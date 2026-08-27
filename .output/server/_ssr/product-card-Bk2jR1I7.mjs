import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as priceOf, i as formatPrice, s as useCart } from "./router-D4QClDsP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product-card-Bk2jR1I7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product }) {
	const { add, setOpen } = useCart();
	const [variantId, setVariantId] = (0, import_react.useState)(product.variants?.[0]?.id);
	if (product.soon) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "surface-card flex min-h-[320px] flex-col items-center justify-center gap-2 border-dashed p-8 text-center opacity-70",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground",
				children: "In arrivo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-2 text-lg",
				children: product.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: product.tagline
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "surface-card group flex flex-col overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/prodotto/$slug",
			params: { slug: product.slug },
			className: "block overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-square overflow-hidden bg-secondary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.image,
					alt: product.name,
					loading: "lazy",
					width: 900,
					height: 900,
					className: "size-full object-cover transition-transform duration-700 group-hover:scale-105"
				}), product.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground",
					children: product.badge
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-muted-foreground",
					children: product.category
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 text-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/prodotto/$slug",
						params: { slug: product.slug },
						children: product.name
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: product.tagline
				}),
				product.variants && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: product.variantLabel ?? "Variante"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: product.variants.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setVariantId(v.id),
							"aria-pressed": variantId === v.id,
							className: variantId === v.id ? "btn-base btn-primary !px-3 !py-1 !text-xs" : "btn-base btn-outline !px-3 !py-1 !text-xs",
							children: v.label
						}, v.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-center justify-between gap-3 pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl",
						children: formatPrice(priceOf(product, variantId))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-base btn-primary",
						onClick: () => {
							add(product.slug, 1, variantId);
							setOpen(true);
							toast.success(`${product.name} aggiunto al carrello`);
						},
						children: "Aggiungi"
					})]
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
