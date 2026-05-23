# Hapi Requirement Coverage

This map links the major requirement groups in `HAPI_APP_REQUIREMENTS.md` to the prototype and deck surfaces.

| Requirement group | Covered in prototype | Covered in deck |
|---|---|---|
| FR-1 Authentication and authorization | Sidebar separates Citizen and Government surfaces; gov dashboard models scoped staff access. | Slide 8 architecture mentions Citizen UI, Government UI, and shared journey model. |
| FR-2 Life-event detection | `Ngjarjet` catalog shows INSTITUTIONAL, CITIZEN_INITIATED, and AUTOMATIC triggers. Birth, Business, and Turning 18 screens each show their trigger. | Slides 1 and 4 show all three trigger categories. |
| FR-3 Journey orchestration | `Lindja` timeline shows ordered steps, journey status, future scheduled steps, documents, and citizen actions. | Slides 3 and 5 show event-to-journey orchestration and the birth demo sequence. |
| FR-4 Institution routing | Birth timeline names HRP, RC, MPMS, MSH, KP; gov screen shows next owner and routed cases. | Slides 5 and 8 show routing through institutions and adapters. |
| FR-5 Document generation | `Dokumentet` shows birth certificate, official document styling, reference number, e-stamp, issue date, and SHA fingerprint. | Slide 7 covers document provenance. |
| FR-6 Citizen actions | Dashboard and Birth screen show IBAN, QMF, contact, and consent as actions; state-held data is explicitly not re-requested. | Slides 3, 5, and 6 mention only choices/consent are requested. |
| FR-7 Proactive notifications | Dashboard shows Deadline Shield / Mburoja e Afateve and active deadline actions. | Slides 3 and 9 cover Deadline Shield and missed-deadline reduction. |
| FR-8 AI Assistant | `Asistenti AI` includes Albanian conversation, contextual chips, scoped context, and guardrails. | Slide 6 is dedicated to the AI advantage and safety limits. |
| FR-9 Case management | `Intake & raste` models incoming cases, verification checklist, assignment/next owner, and case states. | Slides 5 and 8 mention verification and government UI. |
| FR-10 Audit trail | `Auditimi` shows append-only actor/timestamp/action/details rows and retention. | Slide 7 covers append-only audit. |
| FR-11 Catalog and discovery | `Ngjarjet` catalog shows the three v1 life events, trigger type, active state, and journey action. | Slide 4 summarizes v1 coverage. |
| Birth of a Child journey | `Lindja`, Dashboard, Documents, Privacy, Audit, and Gov screens cover Lirie/Arta, HRP notification, 9 steps, 5 institutions, 8 docs, QMF/IBAN actions. | Slide 5 covers the birth demo. |
| Registering a Business journey | `Biznesi` covers Drilon, Krasniqi Digital sh.p.k., ARBK/RC/ATK/KP/BQK routing, wizard fields, and first tax deadline. | Slide 4 shows business as citizen-initiated coverage. |
| Turning 18 journey | `18 vjeç` covers Era, automatic T-30 detection, 7 steps, 5 institutions, adult account, address, ID, civic rights, education/work guide. | Slide 4 shows Turning 18 as automatic coverage. |
| NFR-1 Performance | Prototype is static, self-contained HTML with no external APIs. | Slide 9 includes p95 and uptime targets from requirements. |
| NFR-2 Availability | Degradation is represented through explicit statuses and institution ownership. | Slide 9 includes 99.5% uptime target. |
| NFR-3 Scalability | Architecture surface describes shared engine plus institution adapters. | Slide 8 covers adapter-based scaling. |
| NFR-4 Security | Prototype avoids real credentials; privacy/audit surfaces model scoped access and provenance. | Slide 7 covers trust and audit; slide 8 covers architecture. |
| NFR-5 Privacy | `Privatësia` maps data items to institutions, legal basis, consent, citizen choice, and AI scoping. | Slide 7 covers the privacy map and transparency. |
| NFR-6 Accessibility | Carbon-style high contrast, keyboard-focus styles, large hit targets, and semantic controls are used in the HTML. | Not a primary deck point; design system is visible throughout. |
| NFR-7 Localization | Albanian-first labels with English jury cues throughout the prototype. | Deck uses Albanian positioning with English clarity. |
| NFR-8 Compatibility | Self-contained static HTML runs directly in modern browsers. | README recommends browser opening and keyboard controls. |
| NFR-9 Maintainability | The package is static for jury demo, but the architecture slide and surfaces show config-driven life events and adapters. | Slide 8 highlights one engine and many adapters. |
