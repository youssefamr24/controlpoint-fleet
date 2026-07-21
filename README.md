# 🚐 ControlPoint Triage — Real-Time Fleet Dashboard

An interactive, high-contrast operator wall-console built for monitoring 40 electric delivery vans, tracking live statuses, managing battery triage, and facilitating dispatch decision-making.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)

---

## 📌 Executive Summary & Rationale

When dispatch operators manage active delivery fleets, high cognitive load and visual fatigue can lead to delayed triage decisions. **ControlPoint Triage** is designed around key UX accessibility principles:

- **High-Contrast Dark Theme (`#0B0F19`):** Optimized for wall-mounted tablet consoles and dark dispatch room environments.
- **Cognitive Ergonomics & Miller’s Law ($7 \pm 2$ items):** Limits primary data rows to **10 per page** with responsive pagination controls to avoid information overload.
- **Instant Critical Alerts:** A dedicated **Needs Attention** alert banner pins broken-down vans and critical battery levels ($\le 15\%$) at the very top for immediate sub-3-second visual triage.

---

## ✨ Features

- 📊 **Real-Time KPI Cards:** Instant metrics on Total Vans, Broken Down vehicles, Low Battery counts, and Average Fleet Battery.
- 🍩 **Interactive Fleet Status Visualization:** Donut chart breakdown tracking Operational, Needs Service, and Broken Down metrics.
- 🔍 **Multi-Parametric Search & Filter Toolbar:**
  - Search by **Van ID**, **Driver Name**, **Model**, or **Issue Notes**.
  - Filter by **Zone** (North, Central, South, East, West).
  - Filter by **Status** (Operational, Needs Service, Broken Down).
  - Filter by **Battery Range** ($<20\%$, $20\text{--}50\%$, $>50\%$).
- ⚡ **Dynamic Battery Progress Indicators:** Visual status bars with contextual `CRITICAL` ($<10\%$) and `LOW` ($10\text{--}19\%$) badges.
- 📱 **Fully Responsive Layout:** Includes a collateral left navigation bar, top header status indicators, and touch-friendly desktop/tablet views.

---

## 🛠️ Tech Stack & Architecture

| Technology      | Role                                           |
| :-------------- | :--------------------------------------------- |
| **Framework**   | [Next.js 15](https://nextjs.org/) (App Router) |
| **UI Library**  | [React 19](https://react.dev/)                 |
| **Language**    | [TypeScript](https://www.typescriptlang.org/)  |
| **Styling**     | [Tailwind CSS v4](https://tailwindcss.com/)    |
| **Iconography** | [Lucide React](https://lucide.dev/)            |
| **Utilities**   | `clsx`, `tailwind-merge`                       |

---

## 📁 Project Structure

```text
CONTROLPOINT-FLEET/
├── app/
│   ├── data/
│   │   └── vans.ts          # Strongly typed 40-van dataset & TypeScript interface
│   ├── favicon.ico
│   ├── globals.css          # Tailwind CSS directives
│   ├── layout.tsx           # Global root layout
│   └── page.tsx             # Interactive Fleet Dashboard component
├── public/                  # Static assets & SVG icons
├── package.json             # Project dependencies & scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```
