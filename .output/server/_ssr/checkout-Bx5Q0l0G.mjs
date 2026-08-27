import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link, p as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as CreditCard, p as Lock } from "../_libs/lucide-react.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { i as formatPrice, s as useCart } from "./router-D4QClDsP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-Bx5Q0l0G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	email: stringType().trim().email("Email non valida").max(255),
	nome: stringType().trim().min(2, "Campo obbligatorio").max(80),
	cognome: stringType().trim().min(2, "Campo obbligatorio").max(80),
	indirizzo: stringType().trim().min(4, "Campo obbligatorio").max(160),
	citta: stringType().trim().min(2, "Campo obbligatorio").max(80),
	cap: stringType().trim().regex(/^\d{5}$/, "CAP a 5 cifre"),
	provincia: stringType().trim().min(2, "Campo obbligatorio").max(40),
	telefono: stringType().trim().min(6, "Campo obbligatorio").max(25)
});
function Field({ id, label, error, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: id,
			className: "text-sm",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id,
			name: id,
			className: "field-input mt-1",
			...rest
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-destructive",
			children: error
		})
	] });
}
function Checkout() {
	const { items, subtotal, shipping, total, clear } = useCart();
	const [errors, setErrors] = (0, import_react.useState)({});
	const [method, setMethod] = (0, import_react.useState)("carta");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl",
				children: "Il carrello è vuoto"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Aggiungi una lampada per procedere."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/catalogo",
				className: "btn-base btn-primary mt-6",
				children: "Vai al catalogo"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl",
			children: "Checkout"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-8 grid gap-8 lg:grid-cols-[1fr_380px]",
			onSubmit: (e) => {
				e.preventDefault();
				const fd = new FormData(e.currentTarget);
				const parsed = schema.safeParse(Object.fromEntries(fd.entries()));
				if (!parsed.success) {
					const next = {};
					for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
					setErrors(next);
					return;
				}
				setErrors({});
				setLoading(true);
				setTimeout(() => {
					const numero = `NT-${Math.floor(1e5 + Math.random() * 9e5)}`;
					clear();
					navigate({
						to: "/ordine-confermato",
						search: { numero }
					});
				}, 900);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-card space-y-4 p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl",
								children: "1. Contatti"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "email",
								label: "Email",
								type: "email",
								error: errors["email"],
								maxLength: 255
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "telefono",
								label: "Telefono",
								error: errors["telefono"],
								maxLength: 25
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-card space-y-4 p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl",
								children: "2. Spedizione"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									id: "nome",
									label: "Nome",
									error: errors["nome"],
									maxLength: 80
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									id: "cognome",
									label: "Cognome",
									error: errors["cognome"],
									maxLength: 80
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "indirizzo",
								label: "Indirizzo",
								error: errors["indirizzo"],
								maxLength: 160
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "citta",
										label: "Città",
										error: errors["citta"],
										maxLength: 80
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "cap",
										label: "CAP",
										error: errors["cap"],
										maxLength: 5,
										inputMode: "numeric"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: "provincia",
										label: "Provincia",
										error: errors["provincia"],
										maxLength: 40
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-card space-y-4 p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl",
								children: "3. Pagamento"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setMethod("carta"),
									className: `flex items-center gap-3 rounded-xl border p-4 text-left text-sm ${method === "carta" ? "border-primary bg-secondary" : "border-border"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Carta di credito", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted-foreground",
										children: "Visa, Mastercard, Amex"
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setMethod("paypal"),
									className: `flex items-center gap-3 rounded-xl border p-4 text-left text-sm ${method === "paypal" ? "border-primary bg-secondary" : "border-border"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-base text-primary",
										children: "PP"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["PayPal", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted-foreground",
										children: "Paghi con il tuo account"
									})] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3" }), " I dati della carta vengono richiesti nella pagina di pagamento protetta."]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "surface-card h-fit space-y-4 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl",
						children: "Riepilogo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: items.map(({ key, product, qty, variant, unitPrice }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: product.image,
									alt: product.name,
									loading: "lazy",
									width: 48,
									height: 48,
									className: "size-12 rounded-md object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex-1",
									children: [product.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block text-xs text-muted-foreground",
										children: [
											variant ? `${variant.label} · ` : "",
											"Qtà ",
											qty
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(unitPrice * qty) })
							]
						}, key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 border-t border-border pt-4 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotale" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(subtotal) })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Spedizione" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: shipping === 0 ? "Gratuita" : formatPrice(shipping) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between border-t border-border pt-4 font-display text-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Totale" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(total) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: loading,
						className: "btn-base btn-primary w-full",
						children: loading ? "Elaborazione…" : `Paga ${formatPrice(total)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-muted-foreground",
						children: "Pagamento sicuro · Reso gratuito entro 14 giorni"
					})
				]
			})]
		})]
	});
}
//#endregion
export { Checkout as component };
