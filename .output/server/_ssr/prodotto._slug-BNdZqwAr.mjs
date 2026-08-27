import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as priceOf, i as formatPrice, n as Route, s as useCart } from "./router-D4QClDsP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prodotto._slug-BNdZqwAr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { product } = Route.useLoaderData();
	const { add, setOpen } = useCart();
	const [variantId, setVariantId] = (0, import_react.useState)(product.variants?.[0]?.id);
	const [qty, setQty] = (0, import_react.useState)(1);
	const addToCart = () => {
		add(product.slug, qty, variantId);
		setOpen(true);
		toast.success(`${product.name} aggiunto al carrello`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/catalogo",
			className: "text-sm text-muted-foreground hover:text-foreground",
			children: "← Torna al catalogo"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-10 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: product.image,
				alt: product.name,
				width: 900,
				height: 900,
				className: "w-full rounded-3xl object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.25em] text-primary",
					children: product.category
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-4xl",
					children: product.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: product.tagline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 font-display text-3xl",
					children: formatPrice(priceOf(product, variantId))
				}),
				product.variants && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: product.variantLabel ?? "Variante"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4",
						children: product.variants.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setVariantId(v.id),
							"aria-pressed": variantId === v.id,
							className: `rounded-xl border p-3 text-left text-sm transition-colors ${variantId === v.id ? "border-primary bg-secondary" : "border-border"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-semibold",
									children: v.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs text-muted-foreground",
									children: formatPrice(v.price)
								}),
								v.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-[11px] text-primary",
									children: v.note
								})
							]
						}, v.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground",
						children: "Quantità"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-xl border border-border px-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": "Diminuisci",
								onClick: () => setQty((q) => Math.max(1, q - 1)),
								children: "−"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-6 text-center text-sm",
								children: qty
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": "Aumenta",
								onClick: () => setQty((q) => Math.min(99, q + 1)),
								children: "+"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm leading-relaxed text-muted-foreground",
					children: product.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 space-y-2 text-sm",
					children: product.specs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "•"
						}), s]
					}, s))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-base btn-primary",
						onClick: addToCart,
						children: "Aggiungi al carrello"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/checkout",
						className: "btn-base btn-outline",
						onClick: () => add(product.slug, qty, variantId),
						children: "Compra ora"
					})]
				})
			] })]
		})]
	});
}
//#endregion
export { ProductPage as component };
