import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as ProductCard } from "./product-card-Bk2jR1I7.mjs";
import { a as ShieldCheck, c as Moon, n as Truck } from "../_libs/lucide-react.mjs";
import { o as products } from "./router-D4QClDsP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BmMR4Chp.js
var import_jsx_runtime = require_jsx_runtime();
var hero_lamp_default = "/assets/hero-lamp-C1P1qkW8.jpg";
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page grid items-center gap-12 py-16 md:grid-cols-2 md:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.3em] text-primary",
						children: "Collezione 2026"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-4 text-5xl leading-[1.05] md:text-6xl",
						children: [
							"La luce giusta",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"per addormentarsi."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-md text-muted-foreground",
						children: "Lampade da comodino con luce calda dimmerabile, materiali naturali e forme essenziali. Disegnate e assemblate in Italia."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/catalogo",
							className: "btn-base btn-primary",
							children: "Scopri il catalogo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contatti",
							className: "btn-base btn-outline",
							children: "Parla con noi"
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_lamp_default,
						alt: "Lampada da comodino accesa in una camera da letto",
						width: 1600,
						height: 1104,
						className: "w-full rounded-3xl object-cover shadow-[var(--shadow-card)]"
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "container-page grid gap-4 sm:grid-cols-3",
			children: [
				{
					icon: Truck,
					title: "Spedizione gratuita",
					text: "Per ordini sopra i 100 €"
				},
				{
					icon: ShieldCheck,
					title: "Garanzia 2 anni",
					text: "Reso gratuito entro 14 giorni"
				},
				{
					icon: Moon,
					title: "Luce 2700K",
					text: "Non disturba il sonno"
				}
			].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card flex items-start gap-3 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "mt-0.5 size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold",
					children: f.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: f.text
				})] })]
			}, f.title))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-page mt-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl",
					children: "I più amati"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/catalogo",
					className: "text-sm text-primary hover:underline",
					children: "Vedi tutto"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: products.slice(0, 3).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.slug))
			})]
		})
	] });
}
//#endregion
export { Home as component };
