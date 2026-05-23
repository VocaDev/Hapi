# Hapi — App Requirements Specification

**Project:** Hapi · Shtresa proaktive për eKosova
**Version:** 1.0
**Date:** 22 May 2026
**Team:** Voca, Erza, Devlete, Albatrit
**Submitted to:** JunctionX ITP Prizren · Proactive Government Challenge

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Solution Overview](#3-solution-overview)
4. [Goals and Objectives](#4-goals-and-objectives)
5. [Scope](#5-scope)
6. [User Personas](#6-user-personas)
7. [Functional Requirements](#7-functional-requirements)
8. [The Three Life-Event Journeys](#8-the-three-life-event-journeys)
9. [Non-Functional Requirements](#9-non-functional-requirements)
10. [Technical Architecture](#10-technical-architecture)
11. [Data Model](#11-data-model)
12. [Security and Privacy](#12-security-and-privacy)
13. [Integration Architecture](#13-integration-architecture)
14. [User Experience Principles](#14-user-experience-principles)
15. [Success Metrics](#15-success-metrics)
16. [Risks and Mitigations](#16-risks-and-mitigations)
17. [Roadmap](#17-roadmap)
18. [Appendices](#18-appendices)

---

## 1 · Executive Summary

**Hapi** is a proactive digital government layer for the Republic of Kosovo. It extends the existing eKosova platform by detecting life events as they occur, grouping the related public services into a single guided journey, preparing documents in advance, coordinating between institutions, and notifying citizens before they miss deadlines.

The product flips the relationship between citizens and the state. Today a citizen must know which service exists, which institution owns it, what documents to bring, what deadlines apply, and how to follow up. With Hapi, when a life event happens, the right services are activated, the right documents are prepared, the right institutions are notified, and the citizen receives one coordinated journey rather than a list of disconnected counters.

**Core principle:** *Një ngjarje, gjithë shteti përgjigjet.* — One event, the whole state responds.

Hapi version 1.0 covers three life events end-to-end: **Birth of a Child**, **Registering a Business**, and **Turning 18**. These were selected because they cover the three principal trigger categories (institutional, citizen-initiated, automatic), span 11 distinct institutions, and produce 21 unique public services and 20+ official documents — enough surface area to prove the model generalizes.

**Expected impact at scale:**
- 6–8 weeks of citizen effort reduced to under 60 seconds of orchestration
- 23 separate citizen-institution interactions reduced to 5
- 18 paper forms eliminated per typical journey
- 60% reduction in missed statutory deadlines through proactive notifications
- Single audit trail across all institutions involved in any one life event

---

## 2 · Problem Statement

### 2.1 · Current State

Public services in Kosovo are organized around the structure of the state (one institution, one service, one counter) rather than around the structure of citizens' lives (one event, many consequences).

A mother who gives birth in Prizren today must independently navigate the following sequence to receive the public services she is legally entitled to:

| Step | Institution | Action required from citizen |
|---|---|---|
| 1 | Spitali Rajonal i Prizrenit | Receive hospital birth notification |
| 2 | Regjistri Civil i Prizrenit | Travel to register the birth in person |
| 3 | Regjistri Civil | Submit documents to receive birth certificate |
| 4 | Regjistri Civil | Apply for child's personal number |
| 5 | Ministria e Punës dhe Mirëqenies Sociale | Apply for child benefit |
| 6 | Ministria e Punës | Apply for maternity leave |
| 7 | QMF / Spitali | Schedule BCG vaccination |
| 8 | QMF | Schedule first pediatric checkup |
| 9 | Komuna e Prizrenit | Register child for kindergarten (later) |

Each step requires its own form, identification documents, in-person visit, and follow-up. The citizen is the integrator between institutions that already share the same underlying data.

### 2.2 · Quantified Impact

| Metric | Current state |
|---|---|
| Average time from birth to all benefits active | 6–8 weeks |
| Number of institutional interactions per birth | 23 |
| Paper forms filled per birth | 18 |
| Citizens who miss the maternity-leave application deadline | ~14% annually |
| Children who miss the BCG vaccine at the correct interval | ~7% |
| Median round-trips to institutions per business registration | 9 |

### 2.3 · Root Causes

1. **Service-centric design.** Each institution owns a service; no institution owns a life event.
2. **No event detection.** Institutions hold the data that would let them act, but no system triggers cross-institutional coordination.
3. **No proactive notification layer.** Citizens are expected to know what they do not yet know.
4. **Document fragmentation.** Each institution issues, accepts, and stores its own documents with no cross-recognition.
5. **eKosova is a portal, not an orchestrator.** It exposes services but does not chain them.

### 2.4 · Challenge

The JunctionX ITP Prizren *Proactive Government* track asks: *how do we flip public services from reactive to proactive?* The challenge is not to digitize more services — eKosova already does that — but to coordinate the services that exist around the events that matter in citizens' lives.

---

## 3 · Solution Overview

### 3.1 · Product Definition

Hapi is a **Life-Event Service Orchestration Platform**. It is positioned as a coordination layer that sits beside eKosova and the institutional systems of the Republic of Kosovo. eKosova continues to provide access to individual services; Hapi groups, triggers, and coordinates those services around real-life events.

### 3.2 · Core Mechanic

Every Hapi interaction follows one shape:

```
LIFE EVENT  →  DETECTED OR INITIATED  →  JOURNEY CREATED  →  INSTITUTIONS ROUTED
                                       ↓
                              SERVICES ACTIVATED IN ORDER
                                       ↓
                              DOCUMENTS GENERATED
                                       ↓
                              CITIZEN NOTIFIED AT EACH STEP
                                       ↓
                              ACTIONS REQUESTED ONLY WHERE NEEDED
                                       ↓
                              AUDIT TRAIL PERSISTED
```

The same engine powers all life-event journeys. Adding a new life event is a configuration change, not a re-architecture.

### 3.3 · Three Categories of Trigger

| Category | Definition | Example flow in v1 |
|---|---|---|
| **Automatic** | The state detects the event from data it already holds | Turning 18: detected from Civil Registry date-of-birth at T-30 days |
| **Institutional** | Another institution reports the event | Birth of a Child: hospital sends digital birth notification |
| **Citizen-initiated** | The citizen tells Hapi the event has happened or is intended | Registering a Business: citizen starts the journey |

A complete proactive-government platform requires all three. Hapi v1.0 demonstrates all three.

### 3.4 · Positioning vis-à-vis eKosova

Hapi is **not** a replacement for eKosova. The relationship is layered:

- **eKosova** — service portal, authentication, document repository
- **Hapi** — life-event detection, journey orchestration, institution routing, proactive notification

In production, Hapi would launch as a module inside eKosova under the section *Ngjarjet e Jetës*. Citizens authenticate through the existing eKosova SSO. Documents issued by Hapi are stored in eKosova's document vault and visible alongside other eKosova documents.

---

## 4 · Goals and Objectives

### 4.1 · Primary Goals

**G-1.** Reduce time-to-completion of major life-event processes from weeks to minutes for the orchestration phase.

**G-2.** Eliminate citizen-side knowledge requirements about which institution owns which service.

**G-3.** Prevent missed statutory deadlines through proactive notifications anchored to the citizen's life, not the institution's calendar.

**G-4.** Provide a unified audit trail per life event that institutions, citizens, and oversight bodies can all view.

**G-5.** Establish a generalizable platform that the Republic of Kosovo can extend to additional life events without re-platforming.

### 4.2 · Non-Goals

- Replacing the institutional systems that own underlying data (Civil Registry, ARBK, ATK, etc.) — Hapi orchestrates, it does not own.
- Becoming a citizen-to-citizen communication channel.
- Replicating services that are already proactive.
- Providing legal advice — the AI assistant guides; institutions decide.

---

## 5 · Scope

### 5.1 · In Scope for v1.0

- Three end-to-end life-event journeys (Birth, Business, Turning 18)
- Citizen web application (responsive, mobile-first)
- Government staff web application (desktop-first)
- Document generation for 20+ document types
- Proactive notification engine
- AI-assisted citizen guidance (Albanian)
- Case management for government staff
- Audit logging
- Role-based authentication
- Institution registry covering 13 institutions

### 5.2 · Out of Scope for v1.0

- Real eKosova SSO integration (placeholder authentication for v1)
- Real institutional API integrations (institutions are modeled within Hapi; production rollout would replace these with adapter modules)
- Native mobile applications (mobile web is responsive and sufficient)
- Multi-language UI beyond Albanian (English and Serbian planned for v1.5)
- Real cryptographic e-signature with national CA (visual e-stamp + SHA-256 fingerprint in v1)
- Real SMS or email delivery (notifications stored in-app, logged for audit)
- Payment processing (statutory fees displayed but not collected through Hapi)

### 5.3 · Future Scope

See Section 17 — Roadmap.

---

## 6 · User Personas

### 6.1 · Citizen — *Lirie Krasniqi*

- 28 years old, lives in Prizren, just gave birth to her daughter Arta at Spitali Rajonal i Prizrenit.
- Uses eKosova occasionally; comfortable on mobile.
- Needs: birth certificate, child benefit, maternity leave, vaccination schedule.
- Wants: not to spend her postnatal weeks in queues.
- Canonical *Birth of a Child* persona.

### 6.2 · Citizen — *Drilon Krasniqi*

- 35 years old, IT consultant in Prizren, registering his first business *Krasniqi Digital sh.p.k.*
- Familiar with administrative processes but values speed.
- Needs: business registration number (NUB), fiscal number, tax guidance, banking documents, municipal acknowledgment.
- Wants: to start invoicing clients within the same day.
- Canonical *Business Registration* persona.

### 6.3 · Citizen — *Era Krasniqi*

- 18 years old today, maturante, considering university.
- Digital native, uses eKosova for the first time.
- Needs: confirmation of adult civic rights, voter registration, scholarship visibility, passport eligibility, driving-license guidance.
- Wants: a clear list of what changes now that she is an adult.
- Canonical *Turning 18* persona.

### 6.4 · Government staff — *Erza Aliu*

- 39 years old, civil servant at Regjistri Civil i Prizrenit.
- Verifies incoming cases from hospitals and other institutions before activating journeys.
- Needs: a single inbox of incoming cases, identity-verification tools, one-click activation.
- Wants: reduced double-data-entry and clearer routing.
- Canonical gov-side persona.

### 6.5 · Institution

- Owns one or more public services.
- Receives routed steps from Hapi for the services it owns.
- Issues documents.
- Updates step status as services complete.
- Examples: Regjistri Civil, ARBK, ATK, MPMS, MSH, KQZ, MASHTI, Komuna e Prizrenit.

### 6.6 · eKosova platform

- Hosts Hapi as the *Ngjarjet e Jetës* module.
- Provides SSO authentication.
- Stores documents in the citizen's document vault.
- Surfaces Hapi notifications in the main eKosova notification feed.

---

## 7 · Functional Requirements

Functional requirements are numbered as **FR-X.Y** for traceability. Each requirement is testable.

### 7.1 · Authentication and Authorization

**FR-1.1** The system shall authenticate users via personal number (10-digit NP) and password. *(Production: replace with eKosova SSO.)*

**FR-1.2** The system shall distinguish two roles: `CITIZEN` and `GOV_STAFF`.

**FR-1.3** Government staff users shall be associated with exactly one institution.

**FR-1.4** Citizen routes shall be accessible only to authenticated users with role `CITIZEN`.

**FR-1.5** Government routes shall be accessible only to authenticated users with role `GOV_STAFF`.

**FR-1.6** Sessions shall expire after 30 days of inactivity.

**FR-1.7** Failed authentication attempts shall be rate-limited to prevent brute-force attacks.

### 7.2 · Life Event Detection

**FR-2.1** The system shall support three trigger categories: `AUTOMATIC`, `INSTITUTIONAL`, `CITIZEN_INITIATED`.

**FR-2.2** For `AUTOMATIC` triggers, the system shall scan citizen records on a configurable schedule and create journeys when matching criteria are met. *(Example: a daily job that flags citizens turning 18 in exactly 30 days.)*

**FR-2.3** For `INSTITUTIONAL` triggers, the system shall accept event notifications from external institutions via a structured intake interface (web form in v1, REST endpoint in v1.5+).

**FR-2.4** For `CITIZEN_INITIATED` triggers, the system shall present a Life Events catalog from which citizens can initiate eligible journeys.

**FR-2.5** Every triggered journey shall record its `triggerSource` (free-text description) and `triggerData` (structured JSON) for traceability.

### 7.3 · Journey Orchestration

**FR-3.1** A Journey shall consist of an ordered set of Journey Steps, each owned by exactly one Institution.

**FR-3.2** A Journey shall have a lifecycle: `PENDING_VERIFICATION` → `ACTIVE` → `COMPLETED`, with an optional `CANCELLED` terminal state.

**FR-3.3** A Journey shall transition from `PENDING_VERIFICATION` to `ACTIVE` only when a government user with the appropriate institutional role completes the verification checklist.

**FR-3.4** Journey Steps shall have status: `WAITING`, `IN_PROGRESS`, `COMPLETED`, or `SCHEDULED_FUTURE`.

**FR-3.5** Steps marked `SCHEDULED_FUTURE` shall persist their `scheduledFor` date and remain in that state until that date arrives, at which point they transition to `WAITING`.

**FR-3.6** When all immediate (non-future) steps reach `COMPLETED`, the Journey shall transition to `COMPLETED`.

**FR-3.7** A Journey shall produce zero or more Documents and zero or more Citizen Actions.

### 7.4 · Institution Routing

**FR-4.1** The system shall maintain a registry of all participating institutions with their short codes, full names, and contact metadata.

**FR-4.2** Every Journey Step shall be routed to exactly one institution.

**FR-4.3** Citizens shall see, for each step, which institution is responsible.

**FR-4.4** Government users shall see only the steps routed to their own institution unless granted cross-institutional read access.

### 7.5 · Document Generation

**FR-5.1** Documents shall be generated automatically by the system when the corresponding Journey Step completes.

**FR-5.2** Every document shall have a unique reference number in the format `{PREFIX}-{YEAR}-{SERIAL}` (example: `CL-2026-04781`).

**FR-5.3** Documents shall have status: `PREPARING`, `READY`, or `ISSUED`.

**FR-5.4** Citizens shall be able to view, print, and download documents in HTML format (PDF generation planned for v1.5).

**FR-5.5** Every document shall carry a visual e-stamp block displaying institution, issued date, and a SHA-256 fingerprint computed from the document's data and reference number.

**FR-5.6** Document content shall be rendered by type-specific templates that produce the visual style of formal Kosovo government documents (RKS letterhead, official seal, watermark).

### 7.6 · Citizen Actions

**FR-6.1** A Journey may produce zero or more Citizen Actions that require the citizen to confirm, choose, or review something.

**FR-6.2** Each Citizen Action shall have status: `PENDING`, `COMPLETED`, or `SKIPPED`.

**FR-6.3** Pending actions shall be displayed prominently on the Journey detail page and on the citizen dashboard.

**FR-6.4** Completing a Citizen Action may unlock the next Journey Step (per-flow configuration).

**FR-6.5** Citizens shall not be required to complete actions that re-confirm data the state already holds; actions are reserved for choices, reviews, and consent.

### 7.7 · Proactive Notifications

**FR-7.1** The system shall generate a Notification when:
- A Journey is created (`JOURNEY_STARTED`)
- A Journey Step completes (`STEP_COMPLETED`)
- A Document becomes ready (`DOCUMENT_READY`)
- A Citizen Action becomes pending (`ACTION_REQUIRED`)
- A scheduled appointment is set (`APPOINTMENT_SCHEDULED`)
- A statutory deadline approaches within a configurable window (`DEADLINE_APPROACHING`)

**FR-7.2** Notifications shall have an unread/read state.

**FR-7.3** Notifications shall be visible in the notification bell dropdown, on a dedicated `/notifications` page, and inline on the relevant Journey detail page.

**FR-7.4** Notifications shall include a call-to-action link where applicable.

**FR-7.5** Citizens shall be able to filter notifications by status (unread, all) and time window.

### 7.8 · AI Assistant

**FR-8.1** The system shall provide a conversational assistant accessible at `/assistant`.

**FR-8.2** The assistant shall be powered by an LLM (Claude Sonnet 4.5 or successor) and respond in Albanian by default.

**FR-8.3** The assistant shall have access to the citizen's identity, active journeys, pending actions, ready documents, and recent notifications as context.

**FR-8.4** The assistant shall not generate fictional institutions, laws, or deadlines. When uncertain, it shall direct the citizen to the relevant institution.

**FR-8.5** The assistant shall not provide binding legal advice; it shall guide and redirect.

**FR-8.6** Conversation history shall persist per user across sessions.

**FR-8.7** When chat history is empty, the assistant shall offer 4 contextual chip suggestions derived from the citizen's active journey.

### 7.9 · Case Management (Government Side)

**FR-9.1** Every Journey shall have an associated government-side Case.

**FR-9.2** Cases shall have status: `INCOMING`, `VERIFYING`, `ACTIVE`, `COMPLETED`.

**FR-9.3** Cases shall be assignable to a specific government staff user.

**FR-9.4** Government staff shall see incoming cases in the Intake view, filterable by institution and life event.

**FR-9.5** Cases in `INCOMING` or `VERIFYING` status shall display a verification checklist that must be completed before the Journey can be activated.

**FR-9.6** Government staff shall be able to advance individual Journey Steps from the Case detail view.

### 7.10 · Audit Trail

**FR-10.1** The system shall record an audit log entry for every state-changing event, including but not limited to: journey created, journey verified, step completed, document issued, citizen action completed, government decision recorded.

**FR-10.2** Audit log entries shall record the actor (system, citizen, gov staff, or institution), timestamp, action taken, and structured details.

**FR-10.3** Audit logs shall be visible to citizens for their own journeys and to government staff for journeys within their institutional scope.

**FR-10.4** Audit logs shall be append-only; no entry shall be modifiable or deletable through the application interface.

### 7.11 · Catalog and Discovery

**FR-11.1** The system shall display a Life Events catalog at `/life-events` showing all supported life-event types.

**FR-11.2** Each catalog entry shall display: name, description, trigger category, number of services, number of institutions involved, and an action button appropriate to the trigger type.

**FR-11.3** For `CITIZEN_INITIATED` events with no active journey for the user, the action button shall start the journey.

**FR-11.4** For events with an active journey for the user, the action button shall link to that journey.

**FR-11.5** For `AUTOMATIC` or `INSTITUTIONAL` events with no active journey, the action button shall explain how the trigger works.

---

## 8 · The Three Life-Event Journeys

This section specifies the v1.0 implementations in detail.

### 8.1 · Birth of a Child

**Code:** L01
**Trigger category:** INSTITUTIONAL
**Trigger source:** Spitali Rajonal i Prizrenit · digital birth notification
**Triggering institution:** Hospital → Civil Registry (verification)
**Initial status:** `PENDING_VERIFICATION`

**Institutions involved (5):** Hospital, Regjistri Civil, MPMS, MSH, Komuna e Prizrenit.

**Journey Steps:**

| # | Service | Institution | Future? |
|---|---|---|---|
| 1 | Njoftimi i lindjes nga spitali | Hospital | No |
| 2 | Verifikim i të dhënave të lindjes | Civil Registry | No |
| 3 | Lëshim i certifikatës së lindjes | Civil Registry | No |
| 4 | Caktim i numrit personal | Civil Registry | No |
| 5 | Pagesa për fëmijën (€20/muaj) | MPMS | No |
| 6 | Pushimi i lehonisë (9 muaj) | MPMS | No |
| 7 | Kalendari i vaksinimit | MSH | No |
| 8 | Termini i kontrollit të parë | MSH | Yes (+10 days) |
| 9 | Rikujtues për regjistrim në kopsht | KP | Yes (+2 years) |

**Citizen actions:** confirm bank account; review maternity-leave application; choose health center; confirm contact information.

**Documents (8):** hospital birth notification, Civil Registry verification record, birth certificate, personal number confirmation, child benefit decision, maternity leave application, vaccine schedule, data-sharing notice.

### 8.2 · Registering a Business

**Code:** L09
**Trigger category:** CITIZEN_INITIATED
**Trigger source:** Kërkesë e qytetarit · përmes Hapit
**Triggering institution:** ARBK (verification)
**Initial status:** `PENDING_VERIFICATION`

**Institutions involved (5):** ARBK, Regjistri Civil, ATK, Komuna e Prizrenit, Sistemi bankar (BQK proxy).

**Pre-journey wizard:** business name, legal form, primary activity (NACE code), business address.

**Journey Steps:**

| # | Service | Institution | Future? |
|---|---|---|---|
| 1 | Kontroll i emrit të biznesit | ARBK | No |
| 2 | Regjistrimi në regjistrin e bizneseve (NUB) | ARBK | No |
| 3 | Verifikim i identitetit të pronarit | Civil Registry | No |
| 4 | Lëshim i numrit fiskal | ATK | No |
| 5 | Udhëzues tatimor (TVSH, fitimi, paga) | ATK | No |
| 6 | Njoftim për veprimtarinë lokale | KP | No |
| 7 | Lista e dokumenteve për llogari biznesi | BQK | No |
| 8 | Rikujtues për afatin e parë tatimor | ATK | Yes (+90 days) |
| 9 | Lista e detyrimeve të biznesit | ARBK | No |

**Citizen actions:** confirm business name; confirm legal form; confirm address; confirm primary activity; review tax guidance; opt in to deadline reminders; submit final confirmation.

**Documents (10):** business registration draft, business name check, owner identity verification, business registration certificate, fiscal number certificate, tax guidance notice, municipal activity notice, bank account checklist, first tax deadline reminder, business compliance checklist.

### 8.3 · Turning 18

**Code:** L10
**Trigger category:** AUTOMATIC
**Trigger source:** Regjistri Civil · zbulim automatik (daily DOB scan at T-30 days)
**Triggering institution:** Civil Registry
**Initial status:** `PENDING_VERIFICATION` (Civil Registry confirms citizenship and DOB match)

**Institutions involved (5):** Regjistri Civil, MPB, Komuna e Prizrenit, eKosova, MASHTI.

**Journey Steps:**

| # | Service | Institution | Future? |
|---|---|---|---|
| 1 | Verifikim i të dhënave personale | Civil Registry | No |
| 2 | Kontroll i vlefshmërisë së letërnjoftimit | MPB | No |
| 3 | Konfirmim i adresës | KP | No |
| 4 | Llogari e adultit në eKosova | eKosova | No |
| 5 | Njoftim për të drejtat civile | MPB | No |
| 6 | Udhëzues për patentën e shoferit | MPB | Yes (+7 days) |
| 7 | Udhëzues për arsim dhe punësim | MASHTI | Yes (+14 days) |

**Citizen actions:** confirm address; verify phone and email; choose notification method; declare current status (student / employed / unemployed).

**Documents (6):** adult citizen checklist, address confirmation, eKosova adult account verification, ID validity notice, civic information notice, education and employment guide.

---

## 9 · Non-Functional Requirements

### 9.1 · Performance

**NFR-1.1** Citizen dashboard shall render the initial view within 1.5 seconds on a mid-range 4G mobile connection.

**NFR-1.2** Journey detail page shall fully load within 2.0 seconds.

**NFR-1.3** Document viewer shall render within 1.5 seconds.

**NFR-1.4** AI assistant first-token latency shall be under 2.0 seconds in 95% of requests.

**NFR-1.5** API endpoints shall respond within 300ms in 95% of requests at expected load.

### 9.2 · Availability

**NFR-2.1** Target uptime: 99.5% measured monthly (excluding scheduled maintenance windows).

**NFR-2.2** Scheduled maintenance windows shall be announced at least 48 hours in advance.

**NFR-2.3** The system shall degrade gracefully when individual institutional integrations are unavailable — journeys remain visible, affected steps display a clear *Institucioni i përkohshëm jashtë rrjetit* status.

### 9.3 · Scalability

**NFR-3.1** The system shall handle 50,000 active citizen accounts and 1,000 concurrent users in v1.0 (target capacity for the Prizren pilot region).

**NFR-3.2** The architecture shall permit horizontal scaling without database re-architecture up to 500,000 active citizen accounts (national scale).

**NFR-3.3** Journey creation shall be idempotent — the same triggering event shall never create duplicate journeys for the same citizen.

### 9.4 · Security

**NFR-4.1** All data in transit shall be encrypted with TLS 1.3 or higher.

**NFR-4.2** Passwords shall be hashed with Argon2id at memory cost ≥ 19 MiB and 2 iterations.

**NFR-4.3** Session tokens shall be HTTP-only, Secure, and SameSite=Lax cookies.

**NFR-4.4** All sensitive endpoints shall enforce CSRF protection.

**NFR-4.5** Input validation shall be applied to all user-provided data using schema validation (Zod) at the API boundary.

**NFR-4.6** Database queries shall use parameterized statements exclusively; no string concatenation.

### 9.5 · Privacy

**NFR-5.1** The system shall display, on the citizen's first journey, a transparency notice listing which institutions will receive which data items.

**NFR-5.2** The system shall record consent timestamps for any data-sharing decisions.

**NFR-5.3** Citizens shall have read access to all data the system holds about them.

**NFR-5.4** Data minimization: institutions shall receive only the data items necessary for the specific service they perform.

**NFR-5.5** Audit logs shall be retained for 7 years per Kosovo administrative records law; chat messages with the AI assistant shall be retained for 12 months unless the citizen requests deletion sooner.

### 9.6 · Accessibility

**NFR-6.1** The citizen application shall meet WCAG 2.1 Level AA.

**NFR-6.2** Color contrast ratios shall be at least 4.5:1 for body text, 3:1 for large text.

**NFR-6.3** All interactive elements shall be keyboard-navigable.

**NFR-6.4** Screen-reader labels (ARIA) shall be present on all icons, badges, and status pills.

**NFR-6.5** Text shall scale to at least 200% without loss of functionality.

### 9.7 · Localization

**NFR-7.1** v1.0 user interface shall be in Albanian (Shqip).

**NFR-7.2** All user-facing strings shall be wrapped in a `t('key')` translation function from day one to enable English and Serbian additions in v1.5 without refactoring.

**NFR-7.3** Date, time, and number formatting shall use Kosovo conventions (DD.MM.YYYY, comma decimal separator for numbers, EUR currency).

### 9.8 · Compatibility

**NFR-8.1** The citizen application shall function on the latest two major versions of Chrome, Safari, Firefox, and Edge.

**NFR-8.2** The mobile experience shall be tested on iOS Safari 16+ and Chrome Android (latest).

**NFR-8.3** The government application shall function on the same desktop browsers; mobile gov access is not required in v1.

### 9.9 · Maintainability

**NFR-9.1** All code shall be TypeScript with strict mode enabled.

**NFR-9.2** Adding a new life event shall be a configuration-only change in `src/content/life-events/`, with no modification to the core engine.

**NFR-9.3** Adding a new institution shall require only an entry in the institution registry and any necessary document-type templates.

**NFR-9.4** Adding a new document type shall require only a new template component in `src/components/document/content/`.

---

## 10 · Technical Architecture

### 10.1 · High-Level Diagram

```
┌────────────────────────────────────────────────────────────────┐
│                    Citizen browser  /  Gov browser              │
└────────────────────────────────────────────────────────────────┘
                                  │
                                  │ HTTPS
                                  ▼
┌────────────────────────────────────────────────────────────────┐
│                  Hapi web application (Next.js 14)              │
│  ┌──────────────┬───────────────┬───────────────────────────┐  │
│  │ Citizen UI   │  Government UI │   AI Assistant route      │  │
│  └──────────────┴───────────────┴───────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              Journey Orchestration Engine              │    │
│  │  (createJourney, verifyJourney, advanceStep, ...)      │    │
│  └────────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │           Institution Routing & Adapters               │    │
│  └────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────┘
                  │                              │
                  ▼                              ▼
       ┌─────────────────┐            ┌────────────────────┐
       │  SQLite via     │            │   Anthropic API    │
       │  Prisma ORM     │            │  (Claude Sonnet)   │
       └─────────────────┘            └────────────────────┘

                Future (post-v1):
       ┌─────────────────────────────────────────┐
       │  Institution adapter layer:             │
       │  eKosova SSO · Civil Registry API ·     │
       │  ARBK API · ATK API · Hospital systems  │
       └─────────────────────────────────────────┘
```

### 10.2 · Technology Stack

| Layer | Technology | Justification |
|---|---|---|
| Framework | Next.js 14 (App Router) | One codebase for UI and API, mature, well-supported |
| Language | TypeScript (strict) | Type safety across UI, API, and data layer |
| Database | SQLite via Prisma | Zero infrastructure for v1; clean migration path to Postgres |
| Authentication | NextAuth.js v5 (credentials) | Battle-tested, replaceable with eKosova SSO in v1.5 |
| Styling | Tailwind CSS 3.4 + custom tokens | Rapid styling with design-system consistency |
| Icons | lucide-react | Open-source, accessible, comprehensive |
| Forms | react-hook-form + zod | Type-safe validation end-to-end |
| AI | Anthropic SDK (Claude Sonnet 4.5) | Albanian fluency, strong reasoning, instruction following |
| Fonts | IBM Plex Sans + Serif | Open-source, formal-government feel |

### 10.3 · Deployment Model

- **v1.0:** Single Next.js process behind a reverse proxy; SQLite on local disk.
- **v1.5:** Postgres in managed service; Next.js on a container platform with horizontal scaling.
- **v2.0:** Separate API service (NestJS or Fastify); UI on edge; queue-backed step orchestration (BullMQ).

---

## 11 · Data Model

### 11.1 · Core Entities

| Entity | Purpose | Key fields |
|---|---|---|
| `User` | Citizens and government staff | personalNumber, role, name, institutionId (if gov) |
| `Institution` | Public institutions in the network | id, short, name |
| `LifeEvent` | Life-event types Hapi supports | id, code, name, triggerType |
| `Journey` | Active or completed life-event process for one user | userId, lifeEventId, status, triggerSource |
| `JourneyStep` | Single service performed by one institution | journeyId, institutionId, serviceKey, status, scheduledFor |
| `Action` | Citizen-side action required | journeyId, type, status |
| `Document` | Generated official document | journeyId, type, referenceNumber, data, status |
| `Notification` | Proactive citizen notification | userId, journeyId, kind, title, read |
| `Case` | Gov-side representation of a Journey | journeyId, status, assignedToId, priority |
| `AuditLog` | Append-only event log | journeyId, actorType, action, details |
| `ChatMessage` | AI assistant conversation history | userId, role, content |

### 11.2 · Key Relationships

- One `User` → many `Journey`s
- One `Journey` → one `Case` (1:1)
- One `Journey` → many `JourneyStep`s, `Action`s, `Document`s, `Notification`s
- One `Institution` → many `JourneyStep`s (the institution responsible)
- One `Institution` → many `User`s (gov staff in that institution)

### 11.3 · State Diagrams

**Journey lifecycle:**
```
[trigger] → PENDING_VERIFICATION → ACTIVE → COMPLETED
                  │                  │
                  └──→ CANCELLED ←───┘
```

**JourneyStep lifecycle:**
```
WAITING ──→ IN_PROGRESS ──→ COMPLETED
                              ▲
SCHEDULED_FUTURE ──[date]──→ WAITING
```

**Case lifecycle:**
```
INCOMING → VERIFYING → ACTIVE → COMPLETED
```

---

## 12 · Security and Privacy

### 12.1 · Authentication

Identity verification in v1.0 uses personal number + password with Argon2id hashing. Production deployment shall integrate with eKosova's SSO (likely OIDC) and accept the existing eID flow.

### 12.2 · Authorization

Role-based access control with two roles:
- **CITIZEN:** access only to own journeys, documents, notifications, chat history.
- **GOV_STAFF:** access to cases routed to their institution; read-only cross-institutional access for full audit traceability.

Middleware enforces role checks on every protected route.

### 12.3 · Data Protection

- TLS 1.3 in transit.
- SQLite database file permissions restricted to application user (production: encrypted disk, encrypted backups).
- Passwords never logged. Personal numbers logged only in audit context with appropriate retention controls.
- No data shared with third parties except the AI provider (Anthropic). Chat content sent to Anthropic API is scoped per request.

### 12.4 · Audit and Transparency

Every state change is recorded in `AuditLog` with actor, timestamp, action, and structured detail. Citizens can view the full audit log for their own journeys. Government staff can view audit logs within their institutional scope.

### 12.5 · Compliance Alignment

- **Kosovo Law No. 06/L-082 on Personal Data Protection.** Hapi processes personal data on a legal basis of performance of a public task and explicit consent for cross-institutional sharing. Data subject rights (access, rectification, restriction) are exercisable through the citizen account.
- **GDPR-aligned principles** even where not legally required, given likely future EU integration.
- **Records retention:** audit logs 7 years; chat history 12 months; documents per the issuing institution's own retention rules.

---

## 13 · Integration Architecture

### 13.1 · v1.0 Integrations

| Integration | Type | Status in v1.0 |
|---|---|---|
| eKosova SSO | Identity | Placeholder (credentials login) |
| Civil Registry data | Data source | In-app representation (would be API in production) |
| ARBK business registry | Data source | In-app representation |
| ATK tax administration | Data source + adapter | In-app representation |
| Hospital systems | Event source | Manual intake via gov interface |
| Anthropic API | AI service | Live |

### 13.2 · Production Integration Pattern

Each institution gets an adapter module in `src/lib/adapters/<institution>.ts` implementing a shared interface:

```typescript
interface InstitutionAdapter {
  verifyIdentity(np: string): Promise<IdentityVerification>;
  issueDocument(type: string, payload: object): Promise<DocumentResult>;
  scheduleAppointment(payload: AppointmentRequest): Promise<Appointment>;
  registerEvent(eventType: string, payload: object): Promise<EventResult>;
}
```

This isolates the orchestration engine from institutional API specifics and allows institutions to be replaced or upgraded independently.

### 13.3 · Event Intake (for institutional triggers)

In production, institutions push events to Hapi via authenticated webhook:

```
POST /api/intake/{institution-id}
Authorization: Bearer {institutional-key}
Body: { eventType, data, timestamp, reference }
```

In v1.0, the same intake is exercised through the government UI (`/gov/intake`).

---

## 14 · User Experience Principles

### 14.1 · Design Principles

1. **The citizen is the protagonist.** Every screen answers "what is happening for me right now?" before "what does the state need from me?"
2. **One event, one timeline.** Citizens see one chronological journey, not a list of unrelated tasks.
3. **Documents look like documents.** Official documents use serif typography, formal layout, watermarks, and visible cryptographic provenance — they look like the state issued them, because the state did.
4. **Status is always visible.** Every step, every document, every case shows its current state explicitly.
5. **Institutions remain visible.** Citizens always see which institution owns each step — Hapi does not hide the state apparatus.

### 14.2 · Visual Identity

- **Primary color:** Kosovo navy `#0c4f91` — institutional, calm, recognizable.
- **Accent color:** Terracotta `#c97456` — warmth, attention without alarm.
- **Typography:** IBM Plex Serif (display, document headings) + IBM Plex Sans (body). Both open-source; serif gives institutional gravity, sans is highly legible at small sizes.
- **Iconography:** Lucide line-icon set; consistent stroke weight; never decorative-only.
- **Photography:** none in v1; identity is typographic and informational.

### 14.3 · Mobile-First

Citizen flows are designed mobile-first because most citizens will access Hapi on mobile devices. Government flows are desktop-first because staff use desktop workstations.

---

## 15 · Success Metrics

### 15.1 · Citizen Outcomes (target after first year of pilot)

- **Time from event to all services active:** ≤ 7 days median, down from 6–8 weeks
- **Average citizen-institution interactions per life event:** ≤ 5, down from 23 (birth) / 9 (business) / 6 (turning 18)
- **Paper forms filled per journey:** 0 in the orchestrated portion
- **Citizen-reported satisfaction:** ≥ 80% positive on post-journey survey
- **Missed statutory deadlines:** 60% reduction vs. control group

### 15.2 · Institutional Outcomes

- **Double-data-entry reduction:** ≥ 70% on Hapi-orchestrated services
- **Case verification time:** ≤ 5 minutes median (Birth flow)
- **Institutional adoption:** all 5 institutions in the Prizren pilot using Hapi for at least one service by month 6

### 15.3 · System Health

- Uptime ≥ 99.5%
- API p95 latency ≤ 300ms
- AI assistant first-token p95 ≤ 2.0s
- Zero data leaks; zero unauthorized cross-institutional accesses

---

## 16 · Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Institutions resist orchestration ("we lose visibility") | Medium | High | Full audit transparency to institutions; institutions retain ownership of underlying services and data; Hapi is presented as their force-multiplier, not their replacement |
| eKosova SSO integration delayed | Medium | Medium | v1.0 uses placeholder auth; integration sprint planned for v1.5 with eKosova team |
| Citizen distrust of "the state knows my events" | Medium | High | Transparency notice on first journey; explicit consent for cross-institutional sharing; full data access for citizens; opt-out for automatic triggers where legally permissible |
| AI assistant gives wrong information | Low (with guardrails) | Medium | System prompt forbids fabricating institutions, laws, or deadlines; assistant directs to institution when uncertain; not legally binding |
| Hospital integration unavailable | High in early phase | Medium | Manual intake interface (`/gov/intake`) as bridge until APIs land |
| Database scaling beyond SQLite | Low in pilot | Medium | Migration path to Postgres pre-planned; Prisma schema is portable |
| Privacy/legal challenge to cross-institutional data sharing | Medium | High | Compliance review with Information and Privacy Agency (IPA) before pilot launch; data-sharing notice and consent records built in from v1.0 |

---

## 17 · Roadmap

### v1.0 — Pilot launch (this submission)

- Three life events: Birth, Business Registration, Turning 18
- Prizren pilot region
- Citizen + government web applications
- AI assistant in Albanian
- Placeholder authentication

### v1.5 — Q4 2026

- eKosova SSO integration
- Three additional life events: Marriage, Address Change, Employment
- English and Serbian language support
- Real adapter integrations for ATK and ARBK
- Mobile push notifications via eKosova's existing channel
- PDF generation for documents

### v2.0 — 2027

- Full life-event catalog (12+ events including Retirement, Vehicle Registration, Death in Family, Document Expiration)
- Real cryptographic e-signature with national CA
- Postgres backend with horizontal scaling
- Queue-backed orchestration (BullMQ)
- National rollout beyond Prizren
- Open intake API for institutions

### v3.0 — beyond

- Predictive notifications ("a deadline you might miss")
- Cross-life-event correlation (a birth triggers an address-change check)
- Integration with diaspora services (passport renewals, voter registration from abroad)
- Open data API for researchers, oversight, journalism

---

## 18 · Appendices

### 18.1 · Institution Registry

| Code | Name | Service area |
|---|---|---|
| MPB | Ministria e Punëve të Brendshme | ID, citizenship, passport, driving license |
| MPMS | Ministria e Punës dhe Mirëqenies Sociale | Benefits, leave, social welfare |
| MSH | Ministria e Shëndetësisë | Health, vaccines, appointments |
| MASHTI | Ministria e Arsimit, Shkencës dhe Inovacionit | Education, scholarships |
| ARBK | Agjencia e Regjistrimit të Bizneseve të Kosovës | Business registration |
| ATK | Administrata Tatimore e Kosovës | Tax, VAT, fiscal numbers |
| KQZ | Komisioni Qendror Zgjedhor | Voter registration |
| BQK | Banka Qendrore e Kosovës | Banking system coordination |
| TR | Trust Pensional | Pension contributions |
| DG | Dogana e Kosovës | Customs |
| KP | Komuna e Prizrenit | Local services (extensible to other municipalities) |
| RC | Regjistri Civil | Identity, birth, marriage, death |
| EK | eKosova | Platform, SSO, document vault |
| HRP | Spitali Rajonal i Prizrenit | Hospital event source (representative; one of several) |

### 18.2 · Document Type Catalog (v1.0)

| Type | Issuing institution | Journey |
|---|---|---|
| Hospital birth notification | Hospital | Birth |
| Birth verification record | Civil Registry | Birth |
| Birth certificate | Civil Registry | Birth |
| Personal number confirmation | Civil Registry | Birth, Turning 18 |
| Child benefit decision | MPMS | Birth |
| Maternity leave application | MPMS | Birth |
| Vaccine schedule | MSH | Birth |
| Data-sharing notice | Hapi | All |
| Business registration draft | ARBK | Business |
| Business name check | ARBK | Business |
| Owner identity verification | Civil Registry | Business |
| Business registration certificate | ARBK | Business |
| Fiscal number certificate | ATK | Business |
| Tax guidance notice | ATK | Business |
| Municipal activity notice | KP | Business |
| Bank account checklist | BQK | Business |
| First tax deadline reminder | ATK | Business |
| Business compliance checklist | ARBK | Business |
| Adult citizen checklist | Hapi / MPB | Turning 18 |
| Address confirmation | KP | Turning 18 |
| eKosova adult account verification | eKosova | Turning 18 |
| ID validity notice | MPB | Turning 18 |
| Civic information notice | MPB | Turning 18 |
| Education and employment guide | MASHTI | Turning 18 |

### 18.3 · Glossary

| Term | Meaning |
|---|---|
| NUB | Numri Unik i Biznesit — unique business identification number issued by ARBK |
| NP | Numri Personal — 10-digit personal identification number |
| NF | Numri Fiskal — fiscal number issued by ATK |
| sh.p.k. | Shoqëri me Përgjegjësi të Kufizuar — limited liability company |
| TVSH | Tatimi mbi Vlerën e Shtuar — value-added tax (VAT) |
| eKosova | Republic of Kosovo's digital services platform |
| Hapi | This product — "step" in Albanian |
| Ngjarjet e Jetës | Life Events — proposed module name for Hapi inside eKosova |
| Life event | A major event in a citizen's or business's life requiring coordinated public services |
| Journey | The Hapi orchestration of one life event for one user |
| Case | The government-side representation of a Journey |

### 18.4 · References

- Law No. 06/L-016 on Business Organizations (Republic of Kosovo)
- Law No. 04/L-261 on Material Support of Families (Republic of Kosovo)
- Law No. 06/L-082 on Personal Data Protection (Republic of Kosovo)
- Law No. 03/L-099 on the Identity Card (Republic of Kosovo)
- Law No. 03/L-073 on General Elections (Republic of Kosovo)
- eKosova platform documentation, Agjencia e Shoqërisë së Informacionit (ASHI)
- ARBK registration procedures, Agjencia e Regjistrimit të Bizneseve të Kosovës
- WCAG 2.1 — Web Content Accessibility Guidelines
- GDPR — EU General Data Protection Regulation (alignment reference)

---

**End of specification.**

This document is the authoritative statement of what Hapi v1.0 is and what it does. The accompanying build specification (`HAPI_BUILD_SPEC.md`) translates these requirements into an implementable system. The two documents together constitute the team's submission to the Proactive Government challenge of JunctionX ITP Prizren 2026.
