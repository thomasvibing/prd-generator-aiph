# CLAUDE.md - PRD Generator for AI Product Heroes

## Project Overview

**Project Name:** PRD Generator - AI Product Heroes  
**Purpose:** Lead magnet tool for https://www.aiproductheroes.pl/ course  
**Type:** WebApp - Simple form-based PRD document generator with PDF export  
**Target Users:** People interested in the AI Product Heroes course  

---

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **PDF Generation:** jsPDF + html2canvas
- **State Management:** React useState + localStorage (autosave)
- **Deployment:** Vercel
- **Styling:** Brand guidelines AI Product Heroes

---

## MCP Tools Available

### Context7 MCP
This project has **Context7 MCP** enabled for web scraping and design reference analysis.

**Primary Use Case:**
- Fetch and analyze the live reference site: **https://www.aiproductheroes.pl/**
- Extract design patterns, color schemes, typography, spacing directly from the site
- Compare implemented components with the reference site in real-time

**When to use Context7:**
- ✅ Before implementing any major UI component (buttons, cards, forms)
- ✅ To verify color accuracy and brand consistency
- ✅ To extract exact spacing, shadows, border-radius values from live site
- ✅ When unsure about design decisions - check the reference!

**Commands/Actions:**
- Fetch page content for design analysis
- Extract CSS/styling information from specific elements
- Analyze layout structure and component hierarchy
- Match button styles, card designs, form field appearances

**Note:** Always cross-reference Context7 findings with the Brand Guidelines section below for consistency.

---

## Design Reference

### Primary Reference Site
**https://www.aiproductheroes.pl/**

When designing UI components for this project, **ALWAYS** follow the design language from the reference site.

**Use Context7 MCP to fetch and analyze the site when implementing components!**

### Key Design Principles:
1. Use brand colors from Brand Guidelines section below
2. Match typography style (Inter font, weights, sizes)
3. Follow spacing system (4px base unit)
4. Replicate button styles, card shadows, and border-radius
5. Maintain visual consistency with the reference site

### Specific UI Guidelines:
- **Primary CTA buttons:** `bg-primary (#4d65ff)` with hover effects and subtle shadow
- **Card components:** White background, subtle shadows (`shadow-card`), rounded corners (`rounded-xl`)
- **Input fields:** Clean, minimalist style with focus states using primary color
- **Typography:** Inter font family, proper hierarchy (H1-H6)
- **Use `accent-mint (#00d9a5)`** for highlights, accents, icons, and badges
- **Spacing:** Consistent padding/margins using Tailwind's spacing scale

**Before implementing any UI component, use Context7 to check the reference site for visual inspiration.**

---

## Brand Guidelines - AI Product Heroes

### 1. Color Palette

#### Primary Colors
```css
--color-primary: #4d65ff;        /* Niebieski - główny kolor marki */
--color-primary-hover: #3a4fcc;  /* Ciemniejszy niebieski na hover */
--color-primary-light: #6b7fff;  /* Jaśniejszy wariant */
```

**Tailwind classes:**
- `bg-primary` / `text-primary` / `border-primary`
- `bg-primary-hover` / `hover:bg-primary-hover`
- `bg-primary-light` / `text-primary-light`

#### Secondary Colors
```css
--color-secondary: #1a1a2e;      /* Ciemny granat - nagłówki */
--color-secondary-light: #2d2d44;
```

**Tailwind classes:**
- `bg-secondary` / `text-secondary`
- `bg-secondary-light` / `text-secondary-light`

#### Accent Colors
```css
--color-accent-mint: #00d9a5;    /* Miętowy - WAŻNY dla akcentów */
--color-accent-pink: #ff6b9d;    /* Różowy */
--color-accent-yellow: #ffd93d;  /* Żółty */
--color-accent-red: #ff4757;     /* Czerwony - akcenty */
```

**Tailwind classes:**
- `bg-accent-mint` / `text-accent-mint` ← **UŻYJ TEGO dla akcentów!**
- `bg-accent-pink` / `text-accent-pink`
- `bg-accent-yellow` / `text-accent-yellow`
- `bg-accent-red` / `text-accent-red`

#### Backgrounds
```css
--bg-primary: #ffffff;           /* Białe tło główne */
--bg-secondary: #f8f9fa;         /* Jasnoszare tło sekcji */
--bg-dark: #1a1a2e;              /* Ciemne tło (footer) */
--bg-card: #ffffff;              /* Tło kart */
```

#### Text Colors
```css
--text-primary: #1a1a2e;         /* Główny tekst */
--text-secondary: #6c757d;       /* Tekst pomocniczy */
--text-muted: #adb5bd;           /* Wyciszony tekst */
--text-inverse: #ffffff;         /* Tekst na ciemnym tle */
```

---

### 2. Typography

#### Font Family
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**Tailwind config:**
```javascript
fontFamily: {
  sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
}
```

#### Font Weights
```css
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

#### Heading Sizes

| Element | Desktop | Tablet | Mobile | Line Height | Font Weight |
|---------|---------|--------|--------|-------------|-------------|
| H1 | 56px (3.5rem) | 44px | 36px | 1.1 | 800 |
| H2 | 44px (2.75rem) | 36px | 28px | 1.2 | 700 |
| H3 | 32px (2rem) | 28px | 24px | 1.3 | 700 |
| H4 | 24px (1.5rem) | 22px | 20px | 1.4 | 600 |
| H5 | 20px (1.25rem) | 18px | 18px | 1.4 | 600 |
| H6 | 16px (1rem) | 16px | 16px | 1.5 | 600 |

#### Body Text
```css
--text-base: 16px;               /* 1rem */
--text-lg: 18px;                 /* 1.125rem */
--text-sm: 14px;                 /* 0.875rem */
--text-xs: 12px;                 /* 0.75rem */

--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

---

### 3. Spacing System

**Base Unit:** 4px (0.25rem)

```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

#### Section Spacing
```css
--section-padding-y: 5rem;       /* 80px - desktop */
--section-padding-y-mobile: 3rem; /* 48px - mobile */
```

---

### 4. Border Radius

```css
--radius-none: 0;
--radius-sm: 0.25rem;            /* 4px */
--radius-md: 0.5rem;             /* 8px */
--radius-lg: 0.75rem;            /* 12px */
--radius-xl: 1rem;               /* 16px */
--radius-2xl: 1.5rem;            /* 24px */
--radius-full: 9999px;           /* Pełne zaokrąglenie */
```

#### Usage
| Element | Radius |
|---------|--------|
| Buttons | `--radius-lg` (12px) → `rounded-xl` |
| Cards | `--radius-xl` (16px) → `rounded-2xl` |
| Inputs | `--radius-md` (8px) → `rounded-lg` |
| Badges/Tags | `--radius-full` → `rounded-full` |
| Modals | `--radius-2xl` (24px) → `rounded-2xl` |

---

### 5. Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

#### Specific Shadows
```css
/* Navbar shadow (on scroll) */
--shadow-navbar: 0 5px 9px rgba(208, 208, 208, 0.25);

/* Card shadow */
--shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-card-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

/* Button shadow */
--shadow-btn: 0 4px 6px -1px rgba(77, 101, 255, 0.25);
--shadow-btn-hover: 0 10px 15px -3px rgba(77, 101, 255, 0.3);

/* Primary color glow */
--shadow-primary-glow: 0 0 20px rgba(77, 101, 255, 0.4);
```

**Tailwind classes:**
- `shadow-card` / `hover:shadow-card-hover`
- `shadow-btn` / `hover:shadow-btn-hover`
- `shadow-glow` (for primary glow effect)

---

### 6. Button Styles

#### Primary Button
```html
<button class="bg-primary hover:bg-primary-hover text-white px-7 py-3.5 rounded-xl font-semibold shadow-btn hover:shadow-btn-hover transition-all duration-200 hover:-translate-y-0.5">
  Generuj PDF
</button>
```

**CSS equivalent:**
```css
.btn-primary {
  background-color: #4d65ff;
  color: #ffffff;
  padding: 0.875rem 1.75rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 6px -1px rgba(77, 101, 255, 0.25);
}

.btn-primary:hover {
  background-color: #3a4fcc;
  box-shadow: 0 10px 15px -3px rgba(77, 101, 255, 0.3);
  transform: translateY(-2px);
}
```

#### Secondary Button
```html
<button class="bg-transparent text-primary border-2 border-primary px-7 py-3.5 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-200">
  Wyczyść
</button>
```

#### Button Sizes
- **Small:** `px-4 py-2 text-sm` (padding: 0.5rem 1rem)
- **Medium (default):** `px-7 py-3.5 text-base` (padding: 0.875rem 1.75rem)
- **Large:** `px-8 py-4 text-lg` (padding: 1rem 2rem)

---

### 7. Input Fields

```html
<input
  type="text"
  placeholder="Tytuł PRD"
  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
>
```

```html
<textarea
  placeholder="Opisz problem..."
  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
  rows="4"
></textarea>
```

---

### 8. Card Components

```html
<div class="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300">
  <!-- Card content -->
</div>
```

---

## PRD Structure (Simplified - Option A)

The PRD Generator form contains **10 main sections**:

### 1. Header
- **Title** (text input)
- **Author** (text input)
- **Team** (textarea)

### 2. Overview
- **Overview** (textarea - large)

### 3. Problem Statement
- **Problem** (textarea - large)

### 4. Objectives
- **Objective 1** (text input)
- **Objective 2** (text input)
- **Objective 3** (text input)

### 5. Constraints
- **Constraint 1** (text input)
- **Constraint 2** (text input)
- **Constraint 3** (text input)

### 6. Personas
Table with 3 rows, 2 columns:
- **Persona Name** | **Description**
- Row 1: Key Persona
- Row 2: Persona 2
- Row 3: Persona 3

### 7. Use Cases
- **Scenario 1** (textarea)
- **Scenario 2** (textarea)
- **Scenario 3** (textarea)

### 8. Features In
- **Features In** (textarea - bullet list)

### 9. Features Out
- **Features Out** (textarea - bullet list)

### 10. Success Metrics
- **Success Metrics** (textarea)

---

## Data Structure (State Management)

```javascript
const [prdData, setPrdData] = useState({
  // Header
  title: '',
  author: '',
  team: '',
  
  // One Pager
  overview: '',
  problem: '',
  objectives: ['', '', ''],
  constraints: ['', '', ''],
  
  // Personas
  personas: [
    { name: '', description: '' },
    { name: '', description: '' },
    { name: '', description: '' }
  ],
  
  // Use Cases
  useCases: ['', '', ''],
  
  // PRD
  featuresIn: '',
  featuresOut: '',
  successMetrics: ''
})
```

---

## Features & Requirements

### Core Features
1. ✅ **Plain text form** (no rich text editor)
2. ✅ **Static form** - no live preview (user sees what they fill)
3. ✅ **PDF generation** on button click
4. ✅ **LocalStorage autosave** (every 2 seconds, debounced)
5. ✅ **Branded PDF** with AI Product Heroes branding
6. ❌ **No email capture** (handled elsewhere)

### PDF Requirements
- **Logo:** AI Product Heroes logo in header
- **Footer:** "Wygenerowano przez aiproductheroes.pl | [data]"
- **Branding:** Use brand colors (#4d65ff, #00d9a5) in section headers
- **Typography:** Inter font, proper hierarchy
- **Filename:** `PRD_[title]_[date].pdf`

### LocalStorage
- **Key:** `prd-draft`
- **Autosave:** Every 2 seconds after user stops typing (debounced)
- **Load on mount:** Restore draft if exists
- **Clear:** "Wyczyść formularz" button clears state + localStorage

---

## UI/UX Guidelines

### Form Layout
1. **Single page** - all sections visible at once (no tabs/steps)
2. **Section headers** - clear visual separation between sections
3. **Field labels** - above each input/textarea
4. **Placeholder text** - helpful hints in Polish
5. **Responsive** - mobile-friendly (Tailwind breakpoints)

### Interactions
1. **Button states:**
   - Default, Hover, Active, Disabled
   - Loading spinner during PDF generation
2. **Input focus states:** Primary color border + ring
3. **Autosave indicator:** Small text "Zapisano" after autosave
4. **Empty state:** Gentle prompt if user tries to generate empty PDF

### Accessibility
- Proper HTML semantics (`<form>`, `<label>`, etc.)
- Focus states visible
- Keyboard navigation works
- ARIA labels where needed

---

## Development Guidelines

### Code Style
- **Components:** Functional components with hooks
- **Props:** PropTypes or TypeScript (optional)
- **Naming:** camelCase for JS, kebab-case for CSS classes
- **Comments:** JSDoc for complex functions

### File Structure
```
src/
  components/
    FormSection.jsx       # Reusable section wrapper
    PRDForm.jsx           # Main form component
    PDFGenerator.jsx      # PDF generation logic
  utils/
    localStorage.js       # Save/load functions
    pdfStyles.js          # PDF styling configuration
  App.jsx                 # Root component
  index.css               # Tailwind imports
```

### Git Workflow
- **Branches:** `main` (production), `dev` (development)
- **Commits:** Atomic commits with clear messages
- **PRs:** Required for merging to main

---

## Deployment

### Vercel Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Environment Variables
- None required (fully client-side)

### Custom Domain (optional)
- Can be configured in Vercel dashboard
- Example: `prd.aiproductheroes.pl`

---

## Testing Checklist

### Functional Tests
- [ ] All form fields save to state
- [ ] LocalStorage autosave works
- [ ] PDF generates with all data
- [ ] PDF includes branding (logo, footer)
- [ ] "Wyczyść formularz" resets everything
- [ ] Works on mobile (responsive)

### Visual Tests
- [ ] Matches aiproductheroes.pl design language
- [ ] Colors match brand guidelines
- [ ] Typography consistent
- [ ] Buttons have proper hover effects
- [ ] Form looks professional

### Performance
- [ ] Page loads < 2 seconds
- [ ] PDF generation < 5 seconds
- [ ] No memory leaks (React DevTools)

---

## Reference Links

- **Live Site:** https://www.aiproductheroes.pl/
- **Brand Guidelines:** `brand-guidelines.md` in project root
- **PRD Template Reference:** Product School PRD template (uploaded PDF)
- **Tech Docs:**
  - React: https://react.dev
  - Vite: https://vitejs.dev
  - Tailwind: https://tailwindcss.com
  - jsPDF: https://github.com/parallax/jsPDF

---

## Notes

- **Target Timeline:** Implementation within a few days
- **Hosting:** Vercel (free tier sufficient)
- **Maintenance:** Low maintenance, client-side only
- **Future Features:** Could add email capture later if needed

---

**Last Updated:** January 5, 2025  
**Project Status:** Ready to start implementation (Task 1.1)
