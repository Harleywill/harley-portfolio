# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this portfolio repository.

## Project Overview

Harley Williams' professional portfolio website built with Next.js 15 and React 19. Showcases full-stack development skills with animated components, interactive UI, and a modern design featuring custom Aurora background effects.

**Live Site:** (deployment details)
**Status:** Active Development

## Tech Stack

**Frontend:**
- Next.js 15 (React 19 framework with App Router)
- React 19 with TypeScript
- Framer Motion for animations and transitions
- Tailwind CSS for styling
- PostCSS & Autoprefixer for CSS processing
- FontAwesome for icons
- Custom CSS for Aurora animations

**Development:**
- TypeScript 5.0 for type safety
- ES2020 target compilation
- Strict TypeScript mode enabled
- Path aliases configured (`@/*` → root)

## Project Structure

```
/harley-portfolio
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page with Aurora background
│   ├── globals.css         # Global styles, scrollbar, fonts
│
├── components/
│   ├── Aurora.tsx          # Animated gradient background
│   ├── Navigation.tsx       # Header navigation
│   ├── Hero.tsx            # Hero section with Framer Motion
│   ├── Projects.tsx        # Project showcase section
│   ├── ProjectCard.tsx     # Individual project card
│   ├── Skills.tsx          # Skills section
│   ├── Contact.tsx         # Contact form/section
│   └── Footer.tsx          # Footer
│
├── package.json            # Dependencies
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS customization
├── next.config.ts         # Next.js configuration
└── CLAUDE.md              # This file
```

## Key Architecture Patterns

### Animation System (Framer Motion)

All animations use Framer Motion with strict TypeScript typing:
- **variants pattern** - Define animation states for reusability
- **transition objects** - Control duration, easing, delays
- **container/child animations** - Parent containers with staggered children
- **viewport triggers** - Animations fire when elements enter viewport

**Common pattern:**
```typescript
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  },
}

<motion.div variants={variants} initial="hidden" whileInView="visible" />
```

### Aurora Background Component

Custom CSS animations creating an animated gradient background:
- Uses `radial-gradient()` for blob shapes
- 4 animated blobs with different colors and timings
- `screen` blend mode for light mixing effect
- Keyframe animations with multi-step transforms
- Fixed positioning with overflow hidden parent

**Color scheme:**
- Lime green: `rgba(197, 255, 65)`
- Orange: `rgba(244, 108, 56)`
- Gold: `rgba(221, 180, 61)`

**Known Aurora Issues & Solutions:**
- **Opacity too low:** Must use 0.6+ at center, 0.3+ at edges for visibility
- **Blur overshooting:** Keep blur 60-70px max to preserve gradient definition
- **Positioning interference:** Parent must have `position: static` (not `relative`), Aurora uses `position: fixed`
- **Animation choppy:** Ensure blur values match gradient opacity transitions smoothly

### Color Scheme

**Primary Colors:**
- Dark background: `#151312` (rgb(21, 19, 18))
- Lime green accent: `#c5ff41` (rgb(197, 255, 65))
- Orange accent: `#f46c38` (rgb(244, 108, 56))
- Gold accent: `#ddb43d` (rgb(221, 180, 61))

**Typography:**
- Font: Poppins (Google Fonts), weights 400-900
- Primary text: `#ffffff` (white)
- All defined in Tailwind config

### Styling Approach

- **Tailwind CSS** - Primary utility-first styling
- **Custom CSS** - Global styles in `globals.css`, component-specific animations
- **Inline styles** - Used sparingly in components for dynamic values
- **Responsive design** - Mobile-first approach with Tailwind breakpoints

## Important Implementation Details

### TypeScript Configuration

- **Strict mode enabled** - All files must have proper types
- **noEmit: true** - Type checking only, no JS emission (Next.js handles it)
- **Framer Motion types** - Import motion components directly: `import { motion } from 'framer-motion'`
- **No invalid easing strings** - Use `'easeOut'` syntax carefully, some versions prefer objects

### Framer Motion Gotchas

1. **Ease property naming** - Can be string (`'easeOut'`) or numeric (optional in transition object)
2. **Type safety** - Ensure variants match motion component types
3. **whileInView** - Requires viewport detection, works with intersection observer
4. **animate prop** - Don't use string values if TypeScript strict mode is enabled

### File Upload & Assets

- Static assets in `public/` directory (if needed)
- Component files in `components/` (all must be `.tsx`)
- CSS can be module files (`.module.css`) or global (`globals.css`)

### Font Configuration

- Poppins font imported from Google Fonts in `globals.css`
- Weights: 400, 500, 600, 700, 800, 900
- Applied globally to `body` element
- Use Tailwind `font-poppins` or CSS `font-family: 'Poppins'`

## Common Development Tasks

### Running the Application

```bash
# Development server with hot reload (port 3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Build and export static site
npm run export
```

### Adding a New Component

1. Create `.tsx` file in `components/`
2. Use TypeScript interfaces for props
3. Apply animations with Framer Motion if needed
4. Import and use in page.tsx or other components
5. Style with Tailwind or custom CSS

### Working with Animations

**Import Framer Motion:**
```typescript
import { motion } from 'framer-motion'
```

**Define variants:**
```typescript
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}
```

**Use in component:**
```typescript
<motion.div variants={variants} initial="hidden" whileInView="visible">
  Content
</motion.div>
```

### Adjusting Aurora Animation

**To modify Aurora appearance:**
1. Edit `components/Aurora.tsx`
2. Change blob dimensions (width/height)
3. Adjust opacity values in `radial-gradient()`
4. Modify position (top/left/right/bottom)
5. Change blur values (60-70px recommended)
6. Update animation timing in keyframes

**Performance considerations:**
- Fixed positioning with `pointerEvents: 'none'`
- Uses CSS animations (GPU-accelerated)
- Large blur causes performance impact
- Consider reducing blur on mobile

## Tailwind Configuration

**Extends default with:**
- Custom colors (lime green, orange, gold)
- Custom font family (Poppins)
- Custom text colors (primary, secondary)
- All variants enabled for responsive design

**Common Tailwind patterns:**
- `bg-dark` - Dark background (#151312)
- `text-text-primary` - Primary text color
- `font-poppins` - Poppins font family
- Standard breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`

## Deployment

### Build Process

```bash
npm run build          # Compiles TypeScript, optimizes assets
next export            # Generates static HTML (optional)
npm start              # Runs production server
```

### Production Checklist

- [ ] All TypeScript errors resolved (`npm run lint`)
- [ ] Built successfully (`npm run build`)
- [ ] Images optimized (Next.js auto-optimizes)
- [ ] Metadata updated in `app/layout.tsx`
- [ ] Navigation links all functional
- [ ] Aurora renders without jank
- [ ] Mobile responsive tested

## Known Restrictions

- **TypeScript strict mode on** - All imports must be properly typed
- **Framer Motion versions** - Ensure @latest compatible with React 19
- **Tailwind CSS** - Requires PostCSS for processing
- **Next.js 15** - Requires Node.js 18.17 or higher
- **Font loading** - Google Fonts imported, requires internet

## Common Issues & Solutions

### Build Fails with TypeScript Errors

**Issue:** `error TS2588: Cannot assign to 'x' because it is a read-only property`

**Solution:**
- Check Framer Motion version compatibility
- Remove invalid easing strings (e.g., change `ease: 'easeOut'` to `transition: { ease: 'easeOut' }`)
- Ensure all component props have proper TypeScript interfaces

### Aurora Not Visible

**Issue:** Animated gradient background is barely visible or invisible

**Solution:**
- Increase opacity values in `radial-gradient()` (use 0.6-0.8 at center)
- Reduce blur filter (60px instead of 100px)
- Verify parent element has `position: static` (not `relative` or `absolute`)
- Check z-index: Aurora should have `zIndex: -1`
- Ensure `mixBlendMode: 'screen'` is applied to blobs

### Animations Stuttering

**Issue:** Framer Motion animations are choppy

**Solution:**
- Use will-change CSS sparingly: `willChange: 'transform, opacity'`
- Reduce number of simultaneously animated elements
- Use GPU acceleration: ensure 3D transforms
- Check performance in DevTools (60fps target)
- For Aurora specifically, blur values > 80px cause lag

### Component Not Re-rendering

**Issue:** State changes don't update UI

**Solution:**
- Verify React client component (use `'use client'` if needed for client-side features)
- Check props are being passed correctly
- Use React DevTools to inspect component tree
- Ensure no missing dependencies in useEffect/useCallback

## For Other Agents

When resuming this project:

1. **Check the current state** - Review recent commits for what's been done
2. **Understand the design** - Aurora animations + Framer Motion for UI
3. **Respect TypeScript strictness** - All code must be properly typed
4. **Test after changes** - Run `npm run dev` and check browser
5. **Keep animations smooth** - 60fps target, GPU acceleration preferred
6. **Mobile first** - Test responsive design on multiple screen sizes
7. **Build before deploying** - Always run `npm run build` to check for errors

## Next Steps / TODOs

- [ ] Add form validation for Contact section
- [ ] Implement contact form submission (email/database)
- [ ] Add blog section (optional)
- [ ] Optimize images (next/image)
- [ ] Add dark/light mode toggle (if desired)
- [ ] Implement lazy loading for project cards
- [ ] Add SEO optimization (structured data)
- [ ] Set up analytics tracking (optional)
- [ ] Configure deployment environment

## Support & Resources

**Next.js Docs:** https://nextjs.org/docs
**Framer Motion Docs:** https://www.framer.com/motion/
**Tailwind CSS Docs:** https://tailwindcss.com/docs
**React 19 Docs:** https://react.dev

**Project Author:** Harley Williams
**Last Updated:** February 2026
