import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as lazyRouteComponent, d as Link, h as notFound, i as HeadContent, l as createFileRoute, m as useRouter, o as createRouter, r as Scripts, s as Outlet, u as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { i as ShoppingBag, l as Minus, o as Plus, r as Trash2, t as X, u as Menu } from "../_libs/lucide-react.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-BF7TiS2n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var proiettore_cielo_stellato_default = "/assets/proiettore-cielo-stellato-CtwA3uVH.png";
var products = [
	{
		slug: "proiettore-cielo-stellato",
		name: "Proiettore di luce USB effetto cielo stellato",
		price: 37.9,
		image: proiettore_cielo_stellato_default,
		category: "Proiettori",
		tagline: "Tre effetti luce in uno, alimentazione USB",
		description: "Proiettore USB con collo flessibile che trasforma il soffitto in un cielo stellato. Tre testine intercambiabili: luce notturna calda, galassia e nebulosa blu. Si collega a qualsiasi presa USB, power bank o presa auto.",
		specs: [
			"3 testine intercambiabili incluse",
			"Collo flessibile orientabile a 360°",
			"Alimentazione USB 5V",
			"Interruttore sul cavo",
			"Ideale per camera da letto, auto e feste"
		],
		badge: "Novità",
		variantLabel: "Confezione",
		variants: [
			{
				id: "3pz",
				label: "3 pz",
				price: 37.9
			},
			{
				id: "6pz",
				label: "6 pz",
				price: 69.9,
				note: "Risparmi 5,90 €"
			},
			{
				id: "12pz",
				label: "12 pz",
				price: 129.9,
				note: "Risparmi 21,70 €"
			},
			{
				id: "24pz",
				label: "24 pz",
				price: 239.9,
				note: "Miglior prezzo"
			}
		]
	},
	{
		slug: "prodotto-2",
		name: "Secondo prodotto",
		price: 0,
		image: proiettore_cielo_stellato_default,
		category: "In arrivo",
		tagline: "Presto disponibile",
		description: "Questo prodotto sarà presto online.",
		specs: [],
		soon: true
	},
	{
		slug: "prodotto-3",
		name: "Terzo prodotto",
		price: 0,
		image: proiettore_cielo_stellato_default,
		category: "In arrivo",
		tagline: "Presto disponibile",
		description: "Questo prodotto sarà presto online.",
		specs: [],
		soon: true
	}
];
function findProduct(slug) {
	return products.find((p) => p.slug === slug);
}
function findVariant(product, variantId) {
	if (!product.variants?.length) return void 0;
	return product.variants.find((v) => v.id === variantId) ?? product.variants[0];
}
function priceOf(product, variantId) {
	return findVariant(product, variantId)?.price ?? product.price;
}
var formatPrice = (value) => new Intl.NumberFormat("it-IT", {
	style: "currency",
	currency: "EUR"
}).format(value);
var CartContext = (0, import_react.createContext)(null);
var STORAGE_KEY = "PitStore-cart";
var lineKey = (slug, variantId) => `${slug}::${variantId ?? ""}`;
function CartProvider({ children }) {
	const [lines, setLines] = (0, import_react.useState)([]);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = window.localStorage.getItem(STORAGE_KEY);
			if (raw) setLines(JSON.parse(raw));
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
		} catch {}
	}, [lines]);
	const value = (0, import_react.useMemo)(() => {
		const items = lines.map((l) => {
			const product = products.find((p) => p.slug === l.slug);
			if (!product) return null;
			const variant = findVariant(product, l.variantId);
			return {
				key: lineKey(l.slug, l.variantId),
				product,
				qty: l.qty,
				variant,
				unitPrice: priceOf(product, l.variantId)
			};
		}).filter(Boolean);
		const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
		const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 6.9;
		return {
			lines,
			items,
			count: items.reduce((s, i) => s + i.qty, 0),
			subtotal,
			shipping,
			total: subtotal + shipping,
			add: (slug, qty = 1, variantId) => setLines((prev) => {
				if (prev.find((l) => lineKey(l.slug, l.variantId) === lineKey(slug, variantId))) return prev.map((l) => lineKey(l.slug, l.variantId) === lineKey(slug, variantId) ? {
					...l,
					qty: l.qty + qty
				} : l);
				return [...prev, {
					slug,
					qty,
					...variantId ? { variantId } : {}
				}];
			}),
			setQty: (key, qty) => setLines((prev) => qty <= 0 ? prev.filter((l) => lineKey(l.slug, l.variantId) !== key) : prev.map((l) => lineKey(l.slug, l.variantId) === key ? {
				...l,
				qty
			} : l)),
			remove: (key) => setLines((prev) => prev.filter((l) => lineKey(l.slug, l.variantId) !== key)),
			clear: () => setLines([]),
			open,
			setOpen
		};
	}, [lines, open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart must be used within CartProvider");
	return ctx;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-D4QClDsP.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var styles_default = "/assets/styles-BiDqVUnz.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function CartDrawer() {
	const { open, setOpen, items, subtotal, shipping, total, setQty, remove } = useCart();
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			"aria-label": "Chiudi",
			className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
			onClick: () => setOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg",
						children: "Il tuo carrello"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setOpen(false),
						"aria-label": "Chiudi carrello",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto px-5 py-4",
					children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-16 text-center text-sm text-muted-foreground",
						children: "Il carrello è vuoto."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-4",
						children: items.map(({ key, product, qty, variant, unitPrice }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: product.image,
								alt: product.name,
								loading: "lazy",
								width: 80,
								height: 80,
								className: "size-20 rounded-lg object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold",
										children: product.name
									}),
									variant && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											product.variantLabel ?? "Variante",
											": ",
											variant.label
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: formatPrice(unitPrice)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												"aria-label": "Diminuisci",
												className: "rounded-md border border-border p-1",
												onClick: () => setQty(key, qty - 1),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-6 text-center text-sm",
												children: qty
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												"aria-label": "Aumenta",
												className: "rounded-md border border-border p-1",
												onClick: () => setQty(key, qty + 1),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												"aria-label": "Rimuovi",
												className: "ml-auto text-muted-foreground hover:text-destructive",
												onClick: () => remove(key),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
											})
										]
									})
								]
							})]
						}, key))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 border-t border-border px-5 py-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotale" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(subtotal) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Spedizione" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: shipping === 0 ? "Gratuita" : formatPrice(shipping) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between font-display text-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Totale" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(total) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/checkout",
							onClick: () => setOpen(false),
							className: `btn-base btn-primary w-full ${items.length === 0 ? "pointer-events-none opacity-50" : ""}`,
							children: "Vai al checkout"
						})
					]
				})
			]
		})]
	});
}
var nav = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/catalogo",
		label: "Catalogo"
	},
	{
		to: "/contatti",
		label: "Contatti"
	}
];
function SiteHeader() {
	const { count, setOpen } = useCart();
	const [mobile, setMobile] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page flex h-16 items-center justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "font-display text-lg tracking-tight",
					children: ["PitStore", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary",
						children: "."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-8 text-sm md:flex",
					children: nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: n.to,
						activeProps: { className: "text-primary" },
						inactiveProps: { className: "text-muted-foreground hover:text-foreground" },
						activeOptions: { exact: n.to === "/" },
						className: "transition-colors",
						children: n.label
					}, n.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						"aria-label": "Apri carrello",
						onClick: () => setOpen(true),
						className: "relative rounded-full border border-border p-2 transition-colors hover:bg-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-4" }), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground",
							children: count
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"aria-label": "Menu",
						onClick: () => setMobile((v) => !v),
						className: "rounded-full border border-border p-2 md:hidden",
						children: mobile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
					})]
				})
			]
		}), mobile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "container-page flex flex-col gap-3 border-t border-border/60 py-4 text-sm md:hidden",
			children: nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: n.to,
				onClick: () => setMobile(false),
				children: n.label
			}, n.to))
		})]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-24 border-t border-border/60 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-lg",
				children: ["PitStore", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-primary",
					children: "."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Lampade da comodino disegnate e assemblate in Italia."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex gap-6 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-foreground",
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/catalogo",
						className: "hover:text-foreground",
						children: "Catalogo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contatti",
						className: "hover:text-foreground",
						children: "Contatti"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "container-page mt-8 text-xs text-muted-foreground",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" PitStore — Spedizione gratuita da 40 €. Reso entro 14 giorni."
			]
		})]
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$6 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "PitStore — Lampade da comodino" },
			{
				name: "description",
				content: "Lampade da notte per comodino, design italiano."
			},
			{
				name: "author",
				content: "PitStore"
			},
			{
				property: "og:title",
				content: "PitStore — Lampade da comodino"
			},
			{
				property: "og:description",
				content: "Lampade da notte per comodino, design italiano."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "it",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$6.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-screen flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-center" })
		] })
	});
}
var $$splitComponentImporter$5 = () => import("./routes-BmMR4Chp.mjs");
var Route$5 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "PitStore — Lampade da comodino di design" },
		{
			name: "description",
			content: "Lampade da notte per comodino: ceramica, ottone, legno e vetro. Spedizione gratuita da 100 €, pagamento con carta e PayPal."
		},
		{
			property: "og:title",
			content: "PitStore — Lampade da comodino di design"
		},
		{
			property: "og:description",
			content: "Luce calda per le tue serate. Lampade da comodino disegnate in Italia."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./catalogo-DwUKIsVO.mjs");
var Route$4 = createFileRoute("/catalogo")({
	head: () => ({ meta: [
		{ title: "Catalogo — PitStore" },
		{
			name: "description",
			content: "Il catalogo PitStore: proiettore USB effetto cielo stellato con varianti da 3, 6, 12 e 24 pezzi. Altri due prodotti in arrivo."
		},
		{
			property: "og:title",
			content: "Catalogo — PitStore"
		},
		{
			property: "og:description",
			content: "Scopri i prodotti PitStore e scegli la confezione che preferisci."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./checkout-Bx5Q0l0G.mjs");
var Route$3 = createFileRoute("/checkout")({
	head: () => ({ meta: [
		{ title: "Checkout sicuro — PitStore" },
		{
			name: "description",
			content: "Completa il tuo ordine: dati di spedizione, fatturazione e pagamento sicuro."
		},
		{
			property: "og:title",
			content: "Checkout sicuro — PitStore"
		},
		{
			property: "og:description",
			content: "Pagamento protetto con carta o PayPal."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./contatti-C7GDHDFh.mjs");
var Route$2 = createFileRoute("/contatti")({
	head: () => ({ meta: [
		{ title: "Contatti — PitStore lampade da comodino" },
		{
			name: "description",
			content: "Scrivici per consigli sull'illuminazione, ordini, spedizioni o resi. Rispondiamo entro 24 ore lavorative."
		},
		{
			property: "og:title",
			content: "Contatti — PitStore"
		},
		{
			property: "og:description",
			content: "Assistenza e consulenza sulle lampade da PitStore."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./ordine-confermato-2HlpYxLx.mjs");
var Route$1 = createFileRoute("/ordine-confermato")({
	validateSearch: (search) => ({ numero: typeof search["numero"] === "string" ? search["numero"] : "NT-000000" }),
	head: () => ({ meta: [
		{ title: "Ordine confermato — PitStore" },
		{
			name: "description",
			content: "Grazie! Il tuo ordine è stato registrato."
		},
		{
			property: "og:title",
			content: "Ordine confermato — PitStore"
		},
		{
			property: "og:description",
			content: "Il tuo ordine è stato registrato."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./prodotto._slug-BNdZqwAr.mjs");
var Route = createFileRoute("/prodotto/$slug")({
	loader: ({ params }) => {
		const product = findProduct(params.slug);
		if (!product || product.soon) throw notFound();
		return { product };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Prodotto non trovato — PitStore" }, {
			name: "robots",
			content: "noindex"
		}] };
		const { product } = loaderData;
		return { meta: [
			{ title: `${product.name} — PitStore` },
			{
				name: "description",
				content: product.description.slice(0, 155)
			},
			{
				property: "og:title",
				content: `${product.name} — PitStore`
			},
			{
				property: "og:description",
				content: product.tagline
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$5.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$6
	}),
	CatalogoRoute: Route$4.update({
		id: "/catalogo",
		path: "/catalogo",
		getParentRoute: () => Route$6
	}),
	CheckoutRoute: Route$3.update({
		id: "/checkout",
		path: "/checkout",
		getParentRoute: () => Route$6
	}),
	ContattiRoute: Route$2.update({
		id: "/contatti",
		path: "/contatti",
		getParentRoute: () => Route$6
	}),
	OrdineConfermatoRoute: Route$1.update({
		id: "/ordine-confermato",
		path: "/ordine-confermato",
		getParentRoute: () => Route$6
	}),
	ProdottoSlugRoute: Route.update({
		id: "/prodotto/$slug",
		path: "/prodotto/$slug",
		getParentRoute: () => Route$6
	})
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { priceOf as a, formatPrice as i, Route as n, products as o, Route$1 as r, useCart as s, router_exports as t };
