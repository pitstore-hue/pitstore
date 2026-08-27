import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as MapPin, f as Mail, s as Phone } from "../_libs/lucide-react.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contatti-C7GDHDFh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	nome: stringType().trim().min(2, "Inserisci il tuo nome").max(80),
	email: stringType().trim().email("Email non valida").max(255),
	messaggio: stringType().trim().min(10, "Scrivi almeno 10 caratteri").max(1e3)
});
function Contatti() {
	const [errors, setErrors] = (0, import_react.useState)({});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl",
				children: "Contatti"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-lg text-muted-foreground",
				children: "Domande su un modello, un ordine o una spedizione? Rispondiamo entro 24 ore lavorative."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-10 md:grid-cols-[1fr_320px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "surface-card space-y-4 p-6",
					onSubmit: (e) => {
						e.preventDefault();
						const fd = new FormData(e.currentTarget);
						const parsed = schema.safeParse({
							nome: fd.get("nome"),
							email: fd.get("email"),
							messaggio: fd.get("messaggio")
						});
						if (!parsed.success) {
							const next = {};
							for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
							setErrors(next);
							return;
						}
						setErrors({});
						e.currentTarget.reset();
						toast.success("Messaggio inviato! Ti rispondiamo al più presto.");
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "nome",
								className: "text-sm",
								children: "Nome"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "nome",
								name: "nome",
								className: "field-input mt-1",
								maxLength: 80
							}),
							errors["nome"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-destructive",
								children: errors["nome"]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "email",
								className: "text-sm",
								children: "Email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "email",
								name: "email",
								className: "field-input mt-1",
								maxLength: 255
							}),
							errors["email"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-destructive",
								children: errors["email"]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "messaggio",
								className: "text-sm",
								children: "Messaggio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "messaggio",
								name: "messaggio",
								rows: 5,
								maxLength: 1e3,
								className: "field-input mt-1"
							}),
							errors["messaggio"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-destructive",
								children: errors["messaggio"]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "btn-base btn-primary",
							children: "Invia messaggio"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-4",
					children: [[
						{
							icon: Mail,
							label: "ciao@notte-lampade.it"
						},
						{
							icon: Phone,
							label: "+39 02 1234 5678"
						},
						{
							icon: MapPin,
							label: "Via dei Tigli 8, Milano"
						}
					].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card flex items-center gap-3 p-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "size-4 text-primary" }), c.label]
					}, c.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card p-4 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-foreground",
								children: "Orari"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: "Lun–Ven 9:00–18:00"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sab 10:00–13:00" })
						]
					})]
				})]
			})
		]
	});
}
//#endregion
export { Contatti as component };
