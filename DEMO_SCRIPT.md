# Hapi · 3-Minute Presenter Script

## 0:00-0:20 · Title

Hapi is a proactive government layer for eKosova. Our core line is: **“Një ngjarje, gjithë shteti përgjigjet.”** One life event, the whole state responds.

Today citizens must understand which institution owns which service. Hapi flips that: the state coordinates itself around the citizen’s life event.

## 0:20-0:55 · Problem

Take Lirie in Prizren. She gives birth to Arta at the regional hospital. Today she has to navigate the hospital, Civil Registry, MPMS, MSH, and municipal services separately. The requirements estimate 23 citizen-institution interactions, 18 paper forms, and 6 to 8 weeks before all benefits and services are active.

This is not only a digitization problem. eKosova exposes services, but citizens still need to know the government structure.

## 0:55-1:45 · Birth Demo

I start on **Paneli** and click **⚡ Simulo: ngjarja vjen vetë te qytetari**. Watch what happens before any user input: a toast announces the hospital notification, the notification bell pops with a new entry, the dashboard counters tick up, and Hapi auto-opens **Lindja e Artës**. This is the proactive moment — the state acted, the citizen did not have to log in first.

The trigger is institutional: Spitali Rajonal i Prizrenit sends a digital birth notification. Hapi creates the journey, routes it to Regjistri Civil, and activates 9 steps across HRP, RC, MPMS, MSH, and Komuna e Prizrenit.

Notice the principle **only ask when needed**. Lirie is not asked to type data the state already has. She only confirms choices or consent: IBAN for child benefit, QMF for the first checkup, contact details, and the data-sharing notice. The link **→ Ku shkojnë të dhënat e mia?** opens the data-sharing map on demand.

The Deadline Shield keeps statutory and health deadlines visible: BCG, first pediatric checkup, maternity leave, and future kindergarten reminder.

## 1:45-2:15 · AI, Documents, Privacy

The AI assistant responds in Albanian using journey context. It can say: “No, you do not need to send the birth certificate to MPMS; it is already visible through the journey.” But it has guardrails: no invented institutions, no invented laws or deadlines, and no binding legal advice.

The document vault shows an official-looking birth certificate with e-stamp, issuing institution, issue date, and SHA fingerprint. The privacy map answers: **“Ku shkojnë të dhënat e mia?”** Citizens see exactly which data goes to which institution and why.

## 2:15-2:40 · Government Side

On the government side, Erza at Regjistri Civil sees a single intake and case-management dashboard. Cases move from incoming, to verifying, to active, to completed. Staff verify identity, duplicate risk, consent, and hospital reference before activating a journey.

Institutions stay visible and keep ownership. Hapi coordinates; it does not replace them.

## 2:40-3:00 · Generalization and Ask

Hapi v1 proves all three trigger categories: Birth is institutional, Business Registration is citizen-initiated, and Turning 18 is automatic from Civil Registry date-of-birth scanning.

Our ask is to pilot Hapi in Prizren for these three journeys, then expand the life-event catalog through eKosova.

Final line: **Citizens should not have to understand the structure of government to receive what they are entitled to.**
