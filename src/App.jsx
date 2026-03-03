import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m as Motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import './App.css'

const easing = [0.22, 1, 0.36, 1]
const springSmooth = { type: 'spring', stiffness: 220, damping: 28, mass: 0.85 }
const springSnappy = { type: 'spring', stiffness: 320, damping: 24, mass: 0.8 }

const heroContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: easing },
  },
}

const sectionHead = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: easing },
  },
}

const cardsStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
}

const reviewCard = {
  hidden: { opacity: 0, y: 24, rotateX: 8 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: easing },
  },
}

const serviceCard = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.58, ease: easing },
  },
}

const processCard = {
  hidden: { opacity: 0, x: -18 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.54, ease: easing },
  },
}

const stats = [
  { k: '24/7', t: 'Available to help' },
  { k: '4.5+', t: 'Trusted review score' },
  { k: '$2M', t: 'Insurance policy' },
]

const reviews = [
  {
    initials: 'A D',
    quote:
      'I want to highlight the great work done by Always Clean. From the very beginning, they were friendly, professional, and attentive. The deep cleaning service was exceptional. My home feels refreshed and renewed.',
  },
  {
    initials: 'L V',
    quote:
      "I did not know this company in the Bay Area and I am super happy with the service they provided to my home. Thank you, Karen and your team, for leaving my home super clean and smelling so nice.",
  },
  {
    initials: 'C M',
    quote:
      'Limpieza extremadamente detallada. Servicio a nivel excepcional. Muy satisfecho en la manera en que llevan a cabo su labor prestando atencion a cada detalle.',
  },
  {
    initials: 'D F',
    quote:
      'Excellent commercial service, very professional and very courteous staff.',
  },
  {
    initials: 'W P',
    quote:
      'Team came on time and did a wonderful job. I will book them again for future projects.',
  },
]

const serviceGroups = [
  {
    key: 'house',
    title: 'House Cleaning',
    description:
      "Let us do the scrubbing for you. We'll keep your home sparkling with our residential cleaning services.",
    items: [
      'General cleaning',
      'Deep cleaning',
      'Janitorial cleaning',
      'Post events cleaning',
      'Move in/out cleaning',
      'Post construction cleaning',
    ],
  },
  {
    key: 'office',
    title: 'Office Cleaning',
    description:
      "Our office cleaning services keep your workspace shining so your team can focus on what's important.",
    items: [
      'General cleaning',
      'Deep disinfection',
      'Janitorial cleaning',
      'Post events cleaning',
      'Move in/out cleaning',
      'Post construction cleaning',
    ],
  },
  {
    key: 'commercial',
    title: 'Commercial Cleaning',
    description:
      'Keep your facilities sparkling with professional cleaning services. Save up to 20% with a recurring plan.',
    items: [
      'Deep cleaning',
      'Move in/out cleaning',
      'Post construction cleaning',
      'Post events cleaning',
    ],
  },
]

const otherServices = [
  { key: 'janitorial', title: 'Janitorial Cleaning', summary: 'Reliable cleaning routines for offices and shared facilities.' },
  { key: 'turnover', title: 'Turnover Cleaning', summary: 'Fast and detailed resets between tenants or bookings.' },
  { key: 'window', title: 'Window Cleaning', summary: 'Crystal-clear interior and exterior window care.' },
  { key: 'power-washing', title: 'Power Washing Cleaning', summary: 'Deep exterior wash for concrete, facades, and high-traffic areas.' },
  { key: 'solar-panel', title: 'Solar Panel Cleaning', summary: 'Safe panel cleaning to help maintain energy performance.' },
  { key: 'gutter', title: 'Gutter Cleaning', summary: 'Clog removal and flow restoration for healthier drainage.' },
  { key: 'carpet', title: 'Carpet and Upholstery Cleaning', summary: 'Targeted stain and odor treatment for soft surfaces.' },
]

const benefits = [
  'Worry-free services',
  'Affordable prices',
  'Trusted and experienced',
  'Quality work',
  'Service guarantee',
  '$1 Million insurance policy',
]

function ServiceIcon({ type }) {
  if (type === 'house') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M10 21v-6h4v6" />
      </svg>
    )
  }

  if (type === 'office') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 21h16" />
        <path d="M6 21V7h12v14" />
        <path d="M10 11h1M13 11h1M10 14h1M13 14h1" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 21h18" />
      <path d="M5 21V8l7-3 7 3v13" />
      <path d="M9 11h6M9 14h6" />
    </svg>
  )
}

function OtherServiceIcon({ type }) {
  if (type === 'janitorial') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 4h8" />
        <path d="M10 4v3h4V4" />
        <path d="M6 10h12" />
        <path d="M7 10v10M17 10v10" />
        <path d="M10 14h4M10 18h4" />
      </svg>
    )
  }

  if (type === 'turnover') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 5H5v3" />
        <path d="M5 8a7 7 0 0 1 12-3" />
        <path d="M16 19h3v-3" />
        <path d="M19 16a7 7 0 0 1-12 3" />
      </svg>
    )
  }

  if (type === 'window') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M12 4v16M4 12h16" />
      </svg>
    )
  }

  if (type === 'power-washing') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 18h9" />
        <path d="M12 18c2.5 0 5-1.5 7-4" />
        <path d="M19 14l2 1-1 2" />
        <path d="M7 18l1.5-4.5" />
      </svg>
    )
  }

  if (type === 'solar-panel') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 14h16l-2 6H6z" />
        <path d="M8 14l1 6M12 14v6M16 14l-1 6" />
        <path d="M12 4v3M7 6l2 2M17 6l-2 2" />
      </svg>
    )
  }

  if (type === 'gutter') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 9h18" />
        <path d="M5 9v5a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V9" />
        <path d="M12 17v3" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 8h16v8H4z" />
      <path d="M7 16l-1 4M17 16l1 4" />
      <path d="M9 12h6" />
    </svg>
  )
}

function App() {
  const reduceMotion = useReducedMotion()
  const heroRef = useRef(null)
  const otherServicesRef = useRef(null)
  const [activeReview, setActiveReview] = useState(0)
  const [showOtherServicesVideo, setShowOtherServicesVideo] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [topbarScrolled, setTopbarScrolled] = useState(false)
  const menuSheetY = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 40])
  const orbAY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 90])
  const orbBY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -70])
  const menuBackdropOpacity = useTransform(menuSheetY, [-120, 0, 220], [0.22, 1, 0.22])
  const menuBackdropBlur = useTransform(menuSheetY, [0, 220], [6, 1.2])
  const menuBackdropFilter = useMotionTemplate`blur(${menuBackdropBlur}px)`

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length)
    }, 4500)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const section = otherServicesRef.current
    if (!section || showOtherServicesVideo) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowOtherServicesVideo(true)
          observer.disconnect()
        }
      },
      { rootMargin: '240px 0px' },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [showOtherServicesVideo])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const media = window.matchMedia('(max-width: 860px)')
    const handleViewportChange = (event) => {
      if (!event.matches) {
        setMobileMenuOpen(false)
      }
    }

    if (media.addEventListener) {
      media.addEventListener('change', handleViewportChange)
      return () => media.removeEventListener('change', handleViewportChange)
    }

    media.addListener(handleViewportChange)
    return () => media.removeListener(handleViewportChange)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const media = window.matchMedia('(max-width: 860px)')
    const shouldLock = media.matches && mobileMenuOpen
    document.body.style.overflow = shouldLock ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    if (!mobileMenuOpen) {
      return
    }

    const onEsc = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [mobileMenuOpen])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const onScroll = () => {
      const shouldBeScrolled = window.scrollY > 18
      setTopbarScrolled((current) => (current === shouldBeScrolled ? current : shouldBeScrolled))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      menuSheetY.set(0)
    }
  }, [mobileMenuOpen, menuSheetY])

  return (
    <LazyMotion features={domAnimation}>
      <div className="page">
        <header className="hero" id="home" ref={heroRef}>
          <div className="hero-media" aria-hidden="true">
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/limpiando-poster.jpg"
            >
              <source src="/limpiando-mobile.mp4" media="(max-width: 640px)" type="video/mp4" />
              <source src="/limpiando.mp4" type="video/mp4" />
            </video>
          </div>
          <Motion.div className="orb orb-a" style={{ y: orbAY }} />
          <Motion.div className="orb orb-b" style={{ y: orbBY }} />

          <nav className={topbarScrolled ? 'topbar is-scrolled' : 'topbar'}>
            <a className="brand" href="#home">
              <img src="/logo.svg" alt="Always Clean logo" />
            </a>
            <div className="topbar-actions">
              <a className="phone phone-compact" href="tel:+14159440012" aria-label="Call Always Clean">
                Call
              </a>
              <button
                className={mobileMenuOpen ? 'menu-toggle is-open' : 'menu-toggle'}
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                aria-expanded={mobileMenuOpen}
                aria-controls="site-menu"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <span />
                <span />
              </button>
            </div>
            <div className="menu desktop-menu">
              <a href="#services">Services</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
            <a className="phone" href="tel:+14159440012">
              (415) 944 0012
            </a>
          </nav>
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <Motion.button
                  type="button"
                  className="menu-backdrop"
                  aria-label="Close menu backdrop"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    opacity: menuBackdropOpacity,
                    backdropFilter: menuBackdropFilter,
                    WebkitBackdropFilter: menuBackdropFilter,
                  }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.18 }}
                />
                <Motion.div
                  className="mobile-menu-sheet"
                  id="site-menu"
                  role="dialog"
                  aria-label="Mobile navigation"
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -18, scale: 0.97 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.985 }}
                  drag={reduceMotion ? false : 'y'}
                  dragDirectionLock
                  dragConstraints={{ top: -120, bottom: 240 }}
                  dragElastic={{ top: 0.05, bottom: 0.18 }}
                  style={{ y: menuSheetY }}
                  onDragEnd={(_, info) => {
                    const draggedEnough = Math.abs(info.offset.y) > 86
                    const flungEnough = Math.abs(info.velocity.y) > 620
                    if (draggedEnough || flungEnough) {
                      setMobileMenuOpen(false)
                    }
                  }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 380, damping: 28, mass: 0.8 }
                  }
                >
                  <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
                  <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
                  <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                </Motion.div>
              </>
            )}
          </AnimatePresence>

          <Motion.div
            className="hero-content"
            style={{ y: contentY }}
            variants={heroContainer}
            initial={reduceMotion ? false : 'hidden'}
            animate="show"
          >
            <Motion.p className="eyebrow" variants={heroItem}>
              The Best Office and Commercial Cleaning Experts in the Bay Area
            </Motion.p>
            <Motion.h1 variants={heroItem}>The Best Cleaning Services Near You In San Francisco &amp; the Bay Area</Motion.h1>
            <Motion.p className="lead" variants={heroItem}>
              Not your average cleaning service in San Francisco, CA. We make Bay Area spaces shine with reliable teams,
              flexible scheduling, and quality results.
            </Motion.p>
            <Motion.div className="cta-row" variants={heroItem}>
              <a className="btn btn-primary" href="#contact">
                Get a quote
              </a>
              <a className="btn btn-secondary" href="#services">
                Our services
              </a>
            </Motion.div>
            <Motion.div className="stats" variants={cardsStagger}>
              {stats.map((item) => (
                <Motion.article key={item.k} variants={serviceCard}>
                  <h3>{item.k}</h3>
                  <p>{item.t}</p>
                </Motion.article>
              ))}
            </Motion.div>
          </Motion.div>
        </header>

        <main>
          <section className="section" id="reviews">
            <Motion.div
              className="section-head"
              variants={sectionHead}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.26 }}
            >
              <p className="eyebrow">Social proof</p>
              <h2>What our customers are saying</h2>
            </Motion.div>
            <Motion.div
              className="reviews-carousel"
              variants={sectionHead}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
            >
              <button
                className="reviews-nav"
                type="button"
                onClick={() => setActiveReview((current) => (current - 1 + reviews.length) % reviews.length)}
                aria-label="Previous review"
              >
                &#8249;
              </button>

              <div className="reviews-viewport">
                <Motion.div
                  className="reviews-track"
                  animate={{ x: `-${activeReview * 100}%` }}
                  transition={reduceMotion ? { duration: 0 } : springSmooth}
                >
                  {reviews.map((review) => (
                    <article className="card review-card carousel-card" key={review.initials + review.quote.slice(0, 14)}>
                      <div className="review-meta">
                        <p className="review-initials">{review.initials}</p>
                        <div className="stars" aria-label="5 out of 5 stars">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <span key={index}>&#9733;</span>
                          ))}
                        </div>
                      </div>
                      <p className="review-quote">{review.quote}</p>
                    </article>
                  ))}
                </Motion.div>
              </div>

              <button
                className="reviews-nav"
                type="button"
                onClick={() => setActiveReview((current) => (current + 1) % reviews.length)}
                aria-label="Next review"
              >
                &#8250;
              </button>
            </Motion.div>

            <div className="reviews-dots" aria-label="Review pagination">
              {reviews.map((review, index) => (
                <button
                  type="button"
                  key={review.initials + index}
                  className={index === activeReview ? 'dot is-active' : 'dot'}
                  onClick={() => setActiveReview(index)}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </section>

          <section className="section services" id="services">
            <Motion.div
              className="section-head"
              variants={sectionHead}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.28 }}
            >
              <p className="eyebrow">Services</p>
              <h2>We Provide The Best Services</h2>
              <p>Because we cut out the middleman to bring you the best San Francisco cleaning services at the best price.</p>
            </Motion.div>
            <Motion.div
              className="grid service-groups"
              variants={cardsStagger}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {serviceGroups.map((group) => (
                <Motion.article className={`card service-card tone-${group.key}`} variants={serviceCard} key={group.title}>
                  <div className={`service-icon tone-${group.key}`}>
                    <ServiceIcon type={group.key} />
                  </div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Motion.article>
              ))}
            </Motion.div>
          </section>

          <section className="section other-services" id="other-services" ref={otherServicesRef}>
            <div className="other-services-media" aria-hidden="true">
              {showOtherServicesVideo && (
                <video
                  className="other-services-video"
                  src="/limpia.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster="/limpia-poster.jpg"
                />
              )}
            </div>
            <div className="other-services-layout">
              <Motion.div
                className="section-head other-services-head"
                variants={sectionHead}
                initial={reduceMotion ? false : 'hidden'}
                whileInView="show"
                viewport={{ once: true, amount: 0.26 }}
              >
                <p className="eyebrow">Other services</p>
                <h2>Our Services</h2>
                <p className="other-services-intro">
                  Additional specialized solutions designed to keep your property spotless, protected, and ready every day.
                </p>
              </Motion.div>

              <Motion.div
                className="grid other-services-grid"
                variants={cardsStagger}
                initial={reduceMotion ? false : 'hidden'}
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {otherServices.map((service) => (
                  <Motion.article className={`card premium-service-card tone-${service.key}`} variants={serviceCard} key={service.title}>
                    <div className="premium-service-head">
                      <span className={`premium-service-icon tone-${service.key}`} aria-hidden="true">
                        <OtherServiceIcon type={service.key} />
                      </span>
                      <h3>{service.title}</h3>
                    </div>
                    <p>{service.summary}</p>
                  </Motion.article>
                ))}
              </Motion.div>
            </div>
          </section>

          <section className="section split" id="about">
            <Motion.article
              className="card feature"
              variants={serviceCard}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.24 }}
            >
              <div className="feature-top">
                <span className="feature-icon" aria-hidden="true">
                  &#127807;
                </span>
                <p className="eyebrow">Eco-friendly cleaning</p>
              </div>
              <h2>We provide eco-friendly cleaning services</h2>
              <p>
                Stop worrying about finding trusted and affordable cleaning services. Always Clean is your partner for
                everything from daily cleaning to deep disinfection.
              </p>
              <div className="feature-tags">
                <span>Safe products</span>
                <span>Family friendly</span>
                <span>Detail-focused</span>
              </div>
            </Motion.article>
            <Motion.article
              className="card feature"
              variants={reviewCard}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.24 }}
            >
              <div className="feature-top">
                <span className="feature-icon" aria-hidden="true">
                  &#10024;
                </span>
                <p className="eyebrow">Industry leaders</p>
              </div>
              <h2>People love our work in the Bay Area</h2>
              <ul className="benefits-list">
                {benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </Motion.article>
          </section>

          <section className="section process">
            <Motion.div
              className="section-head"
              variants={sectionHead}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.26 }}
            >
              <p className="eyebrow">How it works</p>
              <h2>We can meet all your cleaning needs on your schedule and within your budget</h2>
            </Motion.div>
            <Motion.div
              className="grid process-grid"
              variants={cardsStagger}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Motion.article className="card process-card" variants={processCard}>
                <div className="step-head">
                  <p className="step-badge">01</p>
                  <span className="step-icon" aria-hidden="true">
                    &#128203;
                  </span>
                </div>
                <h3>Set Up a Cleaning Plan</h3>
                <p>Tell us what you need and choose a one-time or recurring schedule.</p>
              </Motion.article>
              <Motion.article className="card process-card" variants={processCard}>
                <div className="step-head">
                  <p className="step-badge">02</p>
                  <span className="step-icon" aria-hidden="true">
                    &#128187;
                  </span>
                </div>
                <h3>Manage Everything Online</h3>
                <p>Confirm appointments, updates, and requests in a simple workflow.</p>
              </Motion.article>
              <Motion.article className="card process-card" variants={processCard}>
                <div className="step-head">
                  <p className="step-badge">03</p>
                  <span className="step-icon" aria-hidden="true">
                    &#10024;
                  </span>
                </div>
                <h3>Sit Back and Relax</h3>
                <p>Our trained team handles the cleaning while you focus on your priorities.</p>
              </Motion.article>
            </Motion.div>
          </section>
        </main>

        <footer className="footer" id="contact">
          <div className="footer-grid">
            <Motion.div
              className="footer-main"
              variants={sectionHead}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="footer-eyebrow">Get in touch</p>
              <h2>Are you looking for professional cleaning services?</h2>
              <p>Book your free call and get a custom quote for your home, office, or commercial facility.</p>
              <a className="btn btn-primary" href="mailto:info@alwayscleansf.com">
                Contact Us
              </a>
              <div className="footer-tags">
                <span>Fast response</span>
                <span>Trusted team</span>
                <span>Bay Area coverage</span>
              </div>
            </Motion.div>
            <Motion.div
              className="contact-list"
              variants={serviceCard}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p>
                <span className="contact-icon" aria-hidden="true">
                  &#9993;
                </span>
                <span>Email:</span> info@alwayscleansf.com
              </p>
              <p>
                <span className="contact-icon" aria-hidden="true">
                  &#9742;
                </span>
                <span>Phone:</span> (415) 944 0012
              </p>
              <p>
                <span className="contact-icon" aria-hidden="true">
                  &#9200;
                </span>
                <span>Hours:</span> 24/7 available to help you
              </p>
            </Motion.div>
          </div>
          <p className="copyright">Copyright &#169; 2026 - Always Clean | Designed by kaideveloper.com</p>
        </footer>

        <div className="floating-contact-wrap">
          <Motion.a
            className="floating-contact"
            href="tel:+14159440012"
            aria-label="Call (415) 944 0012"
            initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.94, filter: 'blur(6px)' }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={reduceMotion ? undefined : { ...springSnappy, delay: 0.2 }}
          >
            <span className="floating-contact-default">Contact us</span>
            <span className="floating-contact-content">
              <span className="floating-contact-icon" aria-hidden="true">
                &#9742;
              </span>
              <span>(415) 944 0012</span>
            </span>
          </Motion.a>
        </div>
      </div>
    </LazyMotion>
  )
}

export default App
