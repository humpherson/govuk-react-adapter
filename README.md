# GOV.UK React Adapter

A **strict, GOV.UK-compliant React component library** designed for:

- ✅ Building services aligned to the **GOV.UK Design System**
- ✅ Supporting **AI-driven UI generation (Figma Make Kits)**
- ✅ Enabling **rapid prototyping with production-aligned output**
- ✅ Providing a **controlled, predictable UI surface**

---

## 🧠 Why this exists

This is **not just another component library**.

It is designed as a:

> **Controlled UI generation system for GOV.UK interfaces**

Key goals:

- Enforce **strict adherence to GOV.UK patterns**
- Prevent invalid or inconsistent UI
- Support **AI-assisted generation** safely
- Bridge **design → prototype → production**

---

## 🏛 Design Philosophy (Strict Mode A)

This library intentionally:

- ❌ Does **not** allow arbitrary styling
- ❌ Does **not** support custom layouts
- ❌ Does **not** extend beyond GOV.UK patterns

Instead:

- ✅ Every component maps directly to GOV.UK
- ✅ Page patterns are **first-class**
- ✅ APIs are **structured and predictable**
- ✅ Accessibility is **built-in, not optional**

---

## 🧱 Architecture

```
Figma Make Kit (Design-time constraints)
        ↓
govuk-react-adapter (Runtime components)
        ↓
Test App (Validation & examples)
```

---

## 📦 Installation

### Install from npm

```bash
npm install @dan-humpherson/govuk-react-adapter
```

---

## ⚙️ Requirements

- React 18+
- TypeScript (recommended)
- GOV.UK Frontend CSS

---

## 🎨 Include GOV.UK styles

You must include GOV.UK styles in your app:

```bash
npm install govuk-frontend
```

Then import in your app:

```ts
import "govuk-frontend/dist/govuk/govuk-frontend.min.css";
```

---

## 🚀 Getting started

### Basic example

```tsx
import { GovUkStartPage } from "@dan-humpherson/govuk-react-adapter";

export default function App() {
  return (
    <GovUkStartPage
      title="Apply for something"
      description="Use this service to apply."
      startButtonText="Start now"
      startButtonHref="/question"
    />
  );
}
```

---

### Supported input/component names

Prefer these canonical exports:

- `TextInput`
- `Radios`
- `Checkboxes`
- `DateInput`
- `SummaryList`
- `Button`

Compatibility aliases are also exported for AI generation tools:

- `GovUkInput` → `TextInput`
- `GovUkRadios` → `Radios`
- `GovUkCheckboxes` → `Checkboxes`
- `GovUkDateInput` → `DateInput`
- `GovUkSummaryList` → `SummaryList`
- `GovUkButton` → `Button`

## 🧩 Core Concepts

### 1. Page patterns (PRIMARY)

Always start with page components:

- `GovUkStartPage`
- `GovUkQuestionPage`
- `GovUkCheckAnswersPage`
- `GovUkConfirmationPage`

👉 Do **not** assemble pages manually

---

### 2. Components (SECONDARY)

Use components inside page patterns:

- Inputs: `TextInput`, `Radios`, `Checkboxes`, `DateInput`
- Content: `InsetText`, `WarningText`
- Structure: `SummaryList`, `Table`, `Tabs`, etc.

---

### 3. Data-driven APIs

Prefer structured props:

```tsx
<SummaryList
  rows={[
    {
      key: { text: "Name" },
      value: { text: "John Smith" },
    },
  ]}
/>
```

---

### 4. Fieldset-first design

Grouped inputs must use:

```tsx
<Checkboxes legend="Select options" items={[...]} />
```

---

## ⚠️ Important composition rules for AI generation

- Pass service-level chrome such as `serviceName` through `pageTemplateProps`, not directly to page pattern components.
- Use `backLinkHref` with page wrappers and `href` with `BackLink`. Do not use click handlers for navigation props.
- Use `formProps` on `GovUkQuestionPage` and `GovUkCheckAnswersPage`. Do not nest your own `<form>` element inside these wrappers.
- `GovUkCheckAnswersPage` expects `sections`, each containing structured `rows`.
- Prefer href-based navigation in generated prototypes.
- Do not create ad-hoc two-column page layouts unless the adapter explicitly provides a layout primitive for them.

## 🧪 Running the test app

```bash
cd govuk-test-app
npm install
npm run dev
```

---

## 🔧 Local development

### Build the library

```bash
npm run build
```

---

### Link locally

```bash
npm link
cd ../govuk-test-app
npm link @dan-humpherson/govuk-react-adapter
```

---

## 🧱 Project structure

```
src/
  components/
  pages/
  index.ts
```

---

## ➕ Adding a new component

### 1. Create component

```
src/components/MyComponent/MyComponent.tsx
```

---

### 2. Follow GOV.UK markup exactly

- Use correct `govuk-*` classes
- Match HTML structure from:
  https://design-system.service.gov.uk/components/

---

### 3. Create typed props

```ts
export interface MyComponentProps {
  label: string;
}
```

---

### 4. Export component

```ts
export * from "./components/MyComponent";
```

---

### 5. Add examples to test app

👉 This is **mandatory**

---

## ⚠️ Important constraints

### ❗ No custom styling

- Do not override GOV.UK styles
- Do not introduce design variants

---

### ❗ No arbitrary composition

Avoid:

```tsx
<div className="govuk-grid-row">...</div>
```

Prefer:

```tsx
<GovUkPageTemplate />
```

---

### ❗ Accessibility is required

- WCAG 2.2 AA minimum
- Proper labels and legends
- Error summaries linked correctly

---

## 🧠 AI / Figma Make usage

This library is designed to be used with:

- **Figma Make Kits**
- AI-driven UI generation

Key characteristics:

- Predictable structure
- Strict prop contracts
- Limited surface area

---

## 🚧 Known limitations

### 1. Strictness over flexibility

- Some valid GOV.UK variations are intentionally not supported
- This is by design to reduce ambiguity

---

### 2. Limited DOM passthrough

- Native HTML props are restricted
- Only curated attributes are exposed

---

### 3. No full GOV.UK JS behaviour

- Some interactive behaviours from govuk-frontend JS may not be included
- (e.g. character count JS enhancements)

---

### 4. Requires GOV.UK CSS

- Styling depends on govuk-frontend

---

### 5. Page patterns are opinionated

- You cannot freely compose pages outside provided patterns

---

## 🔜 Roadmap

- Additional page patterns
- Accessibility enhancements
- Improved validation support
- Expanded Make Kit schema alignment

---

## 🤝 Contributing

When contributing:

- Follow GOV.UK guidance exactly
- Maintain strict API contracts
- Add test app examples
- Do not introduce flexibility that breaks constraints

---

## 📚 References

- GOV.UK Design System
  https://design-system.service.gov.uk/

- Figma Make Kits
  https://developers.figma.com/docs/code/write-design-system-guidelines/

---

## 🧭 Summary

> This library is a **strict GOV.UK UI system**, not a flexible component toolkit.

It is designed to:

- enforce consistency
- enable safe AI generation
- accelerate delivery

---

## 📄 License

MIT
