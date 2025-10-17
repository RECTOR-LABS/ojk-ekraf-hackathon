# Pitch Deck Web Implementation Plan

**Created:** October 17, 2025
**Route:** `/pitch-deck`
**Estimated Time:** 6-8 hours
**Objective:** Create a stunning, interactive web-based pitch deck with animations

---

## 🎯 Technical Architecture

### File Structure
```
frontend-design-2/
├── app/
│   └── pitch-deck/
│       ├── page.tsx                    # Main pitch deck page
│       └── components/
│           ├── PitchDeckHero.tsx       # Hero/intro section
│           ├── SlidePresentation.tsx   # Main slide container
│           ├── SlideNavigation.tsx     # Arrow buttons + dots
│           ├── SlideContent.tsx        # Individual slide wrapper
│           ├── slides/
│           │   ├── Slide01Cover.tsx
│           │   ├── Slide02Problem.tsx
│           │   ├── Slide03Solution.tsx
│           │   ├── Slide04HowItWorks.tsx
│           │   ├── Slide05Registration.tsx
│           │   ├── Slide06Dashboard.tsx
│           │   ├── Slide07Mint.tsx
│           │   ├── Slide08Marketplace.tsx
│           │   ├── Slide09Technical.tsx
│           │   ├── Slide10Security.tsx
│           │   ├── Slide11Innovation.tsx
│           │   ├── Slide12Business.tsx
│           │   ├── Slide13Roadmap.tsx
│           │   ├── Slide14Impact.tsx
│           │   └── Slide15CTA.tsx
│           ├── DemoVideoSection.tsx    # Unique video component
│           └── PDFDownloadButton.tsx   # Floating download button
├── lib/
│   └── hooks/
│       └── useKeyboardNavigation.ts    # Custom hook for keyboard arrows
└── public/
    ├── pitch-deck.pdf                  # Static PDF (generated later)
    └── screenshots/                     # Copy from .pitch-deck-assets/
        ├── 01-landing-page-hero.png
        ├── ... (all 11 screenshots)
        └── 11-etherscan-verification.png
```

---

## 🔧 Component Specifications

### 1. Main Page (`app/pitch-deck/page.tsx`)

**Purpose:** Container for entire pitch deck experience

**Structure:**
```tsx
export default function PitchDeckPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <PitchDeckHero />

      {/* Slide Presentation */}
      <SlidePresentation />

      {/* Demo Video Section */}
      <DemoVideoSection />

      {/* PDF Download Button (Floating) */}
      <PDFDownloadButton />
    </div>
  );
}
```

**State Management:**
- Current slide index (useState)
- Scroll behavior (smooth scroll to slide section)

---

### 2. PitchDeckHero Component

**Purpose:** Landing/intro section before slides

**Features:**
- Full-screen height (100vh)
- Glassmorphism card with:
  - KaryaChain logo
  - "Pitch Deck" title
  - "OJK-Ekraf Infinity Hackathon 2025"
  - "Start Presentation" button (scrolls to slides)
- Animated entrance (Framer Motion)

**Design:**
- Centered content
- Purple/blue gradient background
- Glassmorphism card with backdrop blur
- Smooth scroll-down indicator

---

### 3. SlidePresentation Component

**Purpose:** Main slide presentation container

**State:**
```tsx
const [currentSlide, setCurrentSlide] = useState(0);
const totalSlides = 15;
```

**Features:**
- Full-screen slides (100vh each)
- Navigation arrows (left/right)
- Slide indicators (dots at bottom)
- Slide counter (1/15, 2/15, etc.)
- Keyboard navigation (← →)
- Swipe support (mobile - optional)

**Layout:**
```tsx
<section className="relative">
  {/* Slide Container */}
  <div className="overflow-hidden">
    <motion.div
      className="flex"
      animate={{ x: `-${currentSlide * 100}%` }}
    >
      <Slide01Cover />
      <Slide02Problem />
      {/* ... all 15 slides */}
    </motion.div>
  </div>

  {/* Navigation */}
  <SlideNavigation
    current={currentSlide}
    total={totalSlides}
    onPrev={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
    onNext={() => setCurrentSlide(prev => Math.min(totalSlides - 1, prev + 1))}
  />
</section>
```

**Animations:**
- Slide transition: slide left/right with easing
- Content: stagger entrance animations
- Navigation: fade in/out on hover

---

### 4. SlideNavigation Component

**Purpose:** Navigation controls for slides

**Features:**
- Left/right arrow buttons
- Slide indicator dots (15 dots)
- Slide counter text ("1 / 15")
- Keyboard event listeners (← →)

**Design:**
```tsx
<div className="absolute bottom-8 left-0 right-0 z-20">
  <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
    {/* Left Arrow */}
    <button
      onClick={onPrev}
      disabled={current === 0}
      className="glass rounded-full p-4 hover:scale-110 transition-transform"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>

    {/* Slide Indicators */}
    <div className="flex items-center gap-4">
      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onSlideClick(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              i === current
                ? "w-8 bg-purple-500"
                : "bg-foreground/20 hover:bg-foreground/40"
            )}
          />
        ))}
      </div>
      <span className="text-sm text-foreground/60 font-mono">
        {current + 1} / {total}
      </span>
    </div>

    {/* Right Arrow */}
    <button
      onClick={onNext}
      disabled={current === total - 1}
      className="glass rounded-full p-4 hover:scale-110 transition-transform"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  </div>
</div>
```

---

### 5. SlideContent Component (Wrapper)

**Purpose:** Reusable wrapper for each slide

**Props:**
```tsx
interface SlideContentProps {
  children: React.ReactNode;
  className?: string;
  background?: string; // 'gradient' | 'dark' | 'image'
}
```

**Structure:**
```tsx
<div className="min-h-screen w-full flex items-center justify-center p-6">
  <div className="max-w-7xl w-full">
    {children}
  </div>
</div>
```

---

### 6. Individual Slide Components (Slide01-Slide15)

Each slide is a separate component for clean code organization.

**Example: Slide01Cover.tsx**
```tsx
export function Slide01Cover() {
  return (
    <SlideContent background="image">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-6xl lg:text-8xl font-bold mb-6">
          KaryaChain
        </h1>
        <p className="text-2xl lg:text-3xl text-foreground/80 mb-4">
          Blockchain-Powered Copyright Protection
        </p>
        <p className="text-xl text-foreground/60 mb-8">
          for Indonesian Creators
        </p>
        <div className="space-y-2 text-sm text-foreground/50">
          <p>OJK-Ekraf Infinity Hackathon 2025</p>
          <p>Digital Rights & Authentication</p>
          <p className="font-mono">karyachain.rectorspace.com</p>
        </div>
      </motion.div>
    </SlideContent>
  );
}
```

**Content Source:**
- All content from `.pitch-deck-assets/PITCH-DECK-CONTENT.md`
- All screenshots from `.pitch-deck-assets/screenshots/`

---

### 7. DemoVideoSection Component

**Purpose:** Stunning video player section after slides

**Features:**
- Unique glassmorphism design
- YouTube embed (URL provided later)
- Video title + description
- Play button overlay (optional)
- Responsive iframe

**Design Concept:**
```tsx
<section className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-background to-purple-950/20">
  <div className="max-w-6xl w-full">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      {/* Title */}
      <div className="text-center">
        <h2 className="text-4xl lg:text-6xl font-bold mb-4">
          Watch <span className="gradient-text">Live Demo</span>
        </h2>
        <p className="text-xl text-foreground/70">
          See KaryaChain in action - from registration to marketplace
        </p>
      </div>

      {/* Video Player Card */}
      <GlassCard variant="elevated" className="p-4 lg:p-8">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black/50">
          {/* YouTube Embed (URL to be added) */}
          <iframe
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="KaryaChain Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </GlassCard>

      {/* Video Description */}
      <div className="text-center space-y-4">
        <p className="text-foreground/70">
          This 3-minute walkthrough demonstrates the complete user journey
        </p>
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span>Copyright Registration</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span>NFT Minting</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span>Marketplace Purchase</span>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>
```

**Animations:**
- Fade in on scroll (viewport trigger)
- Hover effects on video card
- Pulse animation on play button (if custom player)

---

### 8. PDFDownloadButton Component

**Purpose:** Floating button to download PDF version

**Position:** Fixed top-right corner

**Design:**
```tsx
<motion.a
  href="/pitch-deck.pdf"
  download="KaryaChain-Pitch-Deck-OJK-Ekraf-2025.pdf"
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  className="fixed top-24 right-6 z-50 glass rounded-full px-6 py-3 flex items-center gap-2 hover:scale-105 transition-transform"
>
  <Download className="w-5 h-5" />
  <span className="hidden lg:inline">Download PDF</span>
</motion.a>
```

**Features:**
- Sticky on scroll
- Hide on mobile (small screens)
- Smooth hover animation
- Download icon + text

---

### 9. useKeyboardNavigation Hook

**Purpose:** Custom hook for keyboard arrow navigation

**Implementation:**
```tsx
export function useKeyboardNavigation(
  currentSlide: number,
  totalSlides: number,
  onPrev: () => void,
  onNext: () => void
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentSlide > 0) {
        onPrev();
      } else if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, totalSlides, onPrev, onNext]);
}
```

---

## 🎨 Design System

### Colors
```css
/* From existing theme */
Primary Purple: #8B5CF6, #A855F7
Secondary Blue: #3B82F6, #60A5FA
Success Green: #10B981
Background: #0F172A, #1E293B
Text: #FFFFFF, #E2E8F0
```

### Typography
```css
/* Slide Titles */
.slide-title {
  font-size: 3rem; /* 48px */
  font-weight: 700;
  line-height: 1.2;
}

/* Slide Subtitles */
.slide-subtitle {
  font-size: 1.5rem; /* 24px */
  font-weight: 600;
}

/* Slide Body */
.slide-body {
  font-size: 1.125rem; /* 18px */
  line-height: 1.8;
}
```

### Animations (Framer Motion)
```tsx
// Slide transition
const slideTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

// Content entrance
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

---

## 📱 Responsive Breakpoints

```tsx
// Tailwind breakpoints
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Laptop
xl: 1280px  // Desktop
2xl: 1536px // Large desktop
```

**Mobile Adaptations:**
- Reduce font sizes (text-4xl → text-3xl)
- Single column layouts
- Hide PDF button text (icon only)
- Larger touch targets (min-h-[44px])
- Simplified slide indicators (fewer dots)

---

## ✅ Implementation Checklist

### Phase 1: Structure (1 hour)
- [ ] Create `/pitch-deck` route
- [ ] Create all component files
- [ ] Set up basic layout
- [ ] Copy screenshots to `public/screenshots/`

### Phase 2: Slides (2-3 hours)
- [ ] Build SlidePresentation container
- [ ] Implement SlideNavigation component
- [ ] Create all 15 slide components
- [ ] Add content from PITCH-DECK-CONTENT.md
- [ ] Insert screenshots

### Phase 3: Features (1-2 hours)
- [ ] Keyboard navigation hook
- [ ] PDF download button
- [ ] Slide transition animations
- [ ] Content entrance animations

### Phase 4: Demo Video (1 hour)
- [ ] Build DemoVideoSection component
- [ ] Add YouTube embed placeholder
- [ ] Style with glassmorphism
- [ ] Add scroll animations

### Phase 5: Polish (1-2 hours)
- [ ] Mobile responsive adjustments
- [ ] Add loading states
- [ ] Optimize images
- [ ] Add metadata (SEO)
- [ ] Test all navigation
- [ ] Fix TypeScript errors
- [ ] Run `npm run typecheck:strict`
- [ ] Test on Chrome, Firefox, Safari

---

## 🔍 Testing Plan

### Manual Testing:
1. **Navigation**
   - [ ] Arrow buttons work
   - [ ] Keyboard arrows work (← →)
   - [ ] Dot indicators work
   - [ ] Slide counter updates

2. **Content**
   - [ ] All 15 slides display correctly
   - [ ] All screenshots load
   - [ ] Text is readable
   - [ ] No overflow issues

3. **Responsive**
   - [ ] Works on iPhone SE (375px)
   - [ ] Works on iPad (768px)
   - [ ] Works on desktop (1920px)
   - [ ] No horizontal scroll

4. **Performance**
   - [ ] Smooth animations (60fps)
   - [ ] Fast page load
   - [ ] Images optimized

5. **PDF Download**
   - [ ] Button appears
   - [ ] Download works
   - [ ] Correct filename

6. **Demo Video**
   - [ ] YouTube embed loads
   - [ ] Responsive iframe
   - [ ] Fullscreen works

---

## 📦 Dependencies (Already Installed)

- ✅ framer-motion (animations)
- ✅ lucide-react (icons)
- ✅ next (framework)
- ✅ react (library)
- ✅ tailwindcss (styling)

**No new dependencies needed!**

---

## 🚀 Deployment

**Automatic:**
- Push to `dev` branch
- Vercel auto-deploys
- Live at: `karyachain.rectorspace.com/pitch-deck`

**PDF Generation:**
- Option 1: Use print-to-PDF from browser
- Option 2: Create static PDF from Google Slides
- Place in `public/pitch-deck.pdf`

---

## 📊 Success Metrics

### Technical:
- ✅ 0 TypeScript errors
- ✅ 0 ESLint warnings
- ✅ Lighthouse score > 90
- ✅ Works on all modern browsers

### User Experience:
- ✅ Smooth 60fps animations
- ✅ < 3 second page load
- ✅ Intuitive navigation
- ✅ Mobile-friendly

### Hackathon Impact:
- 🎯 Unique presentation format
- 🎯 Shows technical skills
- 🎯 Integrated demo video
- 🎯 Professional polish

---

**Next Step:** Start building! Begin with Phase 1 (Structure).
