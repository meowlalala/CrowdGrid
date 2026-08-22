---
name: Vibrant Utility
colors:
  surface: '#f9f9ff'
  surface-dim: '#c9dbff'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e8eeff'
  surface-container-high: '#dfe8ff'
  surface-container-highest: '#d6e3ff'
  on-surface: '#001b3d'
  on-surface-variant: '#434654'
  inverse-surface: '#193053'
  inverse-on-surface: '#ecf0ff'
  outline: '#747685'
  outline-variant: '#c4c5d6'
  surface-tint: '#F0F3FF'
  primary: '#0041bc'
  on-primary: '#ffffff'
  primary-container: '#2d5bd7'
  on-primary-container: '#dce2ff'
  inverse-primary: '#b5c4ff'
  secondary: '#9d4300'
  on-secondary: '#ffffff'
  secondary-container: '#fd761a'
  on-secondary-container: '#5c2400'
  tertiary: '#005277'
  on-tertiary: '#ffffff'
  tertiary-container: '#006b9a'
  on-tertiary-container: '#c8e6ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b5c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#003cae'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#c9e6ff'
  tertiary-fixed-dim: '#89ceff'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004c6e'
  background: '#f9f9ff'
  on-background: '#001b3d'
  surface-variant: '#d6e3ff'
  corporate-indigo: '#2D5BD7'
  gathering-orange: '#F97316'
  pilgrim-sky: '#0EA5E9'
  success-emerald: '#10B981'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  button:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is built on a **Modern Utility** aesthetic—a high-energy, functional style that balances corporate reliability with vibrant, action-oriented visuals. It moves away from the static nature of traditional SaaS interfaces toward a more dynamic and approachable "app-like" experience.

The visual narrative is defined by:
- **High-Contrast Interactions:** Using bold primary and accent colors to create unmistakable affordances.
- **Tonal Layering:** Utilizing soft backgrounds and container tints to group information without the clutter of heavy lines.
- **Dynamic Clarity:** Combining crisp typography with generous spacing to manage complex utility flows.
- **Optimistic Professionalism:** A brand voice that feels both authoritative for corporate needs and energetic for public and pilgrim gatherings.

## Colors

This color system uses a "Pathway Palette" to differentiate user flows through hue:
- **Primary (Indigo):** Reserved for Corporate actions and global navigation elements.
- **Secondary (Orange):** The "Energetic" accent for Public Gathering flows and high-priority alerts.
- **Tertiary (Sky Blue):** A "Cool" accent for Pilgrim flows and informational density.
- **Neutrals:** Deep midnight blues are used for text to maintain high contrast, while "Surface Tint" (#F0F3FF) provides a soft base for container grouping.

Interactive elements should leverage high-saturation versions of these colors, while non-interactive containers use 5-10% opacity tints of the same hues to create a cohesive tonal relationship.

## Typography

**Inter** is the sole typeface for this design system, chosen for its exceptional legibility in data-heavy utility environments. 

- **Hierarchy:** Use tight letter-spacing on Display and Headline levels to create a "locked-in" professional look.
- **Functional Roles:** Labels use uppercase styling and increased letter-spacing to distinguish them from body text.
- **Mobile Scaling:** Headlines must scale down on mobile (32px to 24px) to ensure titles remain readable without excessive wrapping.

## Layout & Spacing

This design system employs a **12-column fluid grid** for desktop and a **single-column fluid layout** for mobile. 

- **Rhythm:** A 4px base unit ensures consistent vertical rhythm.
- **Margins:** Desktop layouts use generous 64px outer margins to focus the user's eye on the central utility cards. 
- **Reflow:** On mobile, margins tighten to 16px to maximize the available width for interactive card components. 
- **Gutters:** Standardized 24px gutters ensure that elements like grid-based cards have enough breathing room to maintain a "light" feel despite high-contrast content.

## Elevation & Depth

Depth is achieved through **tonal layering** rather than traditional heavy shadows.
- **Surface Tiers:** Use subtle background tinting (Primary 5% or 10%) to lift container backgrounds from the page.
- **Shadows:** When used, shadows are "Ambient"—low-opacity (10%), high-blur (20px-40px), and tinted with the primary Indigo hue to avoid "dirty" gray aesthetics.
- **Ghost Borders:** Interactive containers utilize 1px semi-transparent borders (#C4C6CF) to define edges on light surfaces.
- **Interactivity:** On hover or focus, elements should increase their tonal contrast (e.g., background shifts from 5% to 10% tint) rather than just adding a shadow.

## Shapes

The design system uses a **Rounded** shape language to feel modern and friendly.
- **Cards & Containers:** Fixed at 16px (`rounded-lg` or `rounded-xl`) to create a distinct "pod" appearance for different modules.
- **Buttons & Inputs:** Use a 8px radius to maintain a professional, sturdy feel.
- **Icon Enclosures:** Small utility icons should be housed in 8px-12px rounded squares with soft-tinted backgrounds corresponding to their pathway color.

## Components

- **Buttons:** High-contrast primary buttons use solid #2D5BD7. Pathway-specific buttons (Orange or Sky) should be used exclusively within those specific user flows to maintain cognitive association.
- **Cards:** The primary container for the UI. Must feature 16px rounded corners, a 1px soft border, and a subtle indigo-tinted shadow on hover.
- **Chips:** Used for status and filtering. Use a "Pill" shape (full rounding) with 10% opacity backgrounds and 100% opacity text of the same hue.
- **Input Fields:** 8px rounded corners with a 1px border that thickens and changes to the Primary Indigo on focus.
- **Lists:** Clean, borderless rows with subtle dividers and 16px of vertical padding to ensure touch-targets are accessible.
- **Pathway Icons:** Large, 48px icons centered in soft-tinted boxes (24% opacity of the pathway color) serve as the primary visual anchor for navigation cards.