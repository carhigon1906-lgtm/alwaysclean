import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import './App.css'

const easing = [0.22, 1, 0.36, 1]

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
  const [activeReview, setActiveReview] = useState(0)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 40])
  const orbAY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 90])
  const orbBY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -70])

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

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length)
    }, 4500)
    return () => window.clearInterval(id)
  }, [reviews.length])

  return (
    <div className="page">
      <header className="hero" id="home" ref={heroRef}>
        <div className="hero-media" aria-hidden="true">
          <video className="hero-video" src="/limpiando.mp4" autoPlay muted loop playsInline preload="metadata" />
        </div>
        <motion.div className="orb orb-a" style={{ y: orbAY }} />
        <motion.div className="orb orb-b" style={{ y: orbBY }} />

        <nav className="topbar">
          <a className="brand" href="#home">
            <img src="/logo.svg" alt="Always Clean logo" />
          </a>
          <div className="menu">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="phone" href="tel:+14159440012">
            (415) 944 0012
          </a>
        </nav>

        <motion.div
          className="hero-content"
          style={{ y: contentY }}
          variants={heroContainer}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
        >
          <motion.p className="eyebrow" variants={heroItem}>
            The Best Office and Commercial Cleaning Experts in the Bay Area
          </motion.p>
          <motion.h1 variants={heroItem}>The Best Cleaning Services Near You In San Francisco & the Bay Area</motion.h1>
          <motion.p className="lead" variants={heroItem}>
            Not your average cleaning service in San Francisco, CA. We make Bay Area spaces shine with reliable teams,
            flexible scheduling, and quality results.
          </motion.p>
          <motion.div className="cta-row" variants={heroItem}>
            <a className="btn btn-primary" href="#contact">
              Get a quote
            </a>
            <a className="btn btn-secondary" href="#services">
              Our services
            </a>
          </motion.div>
          <motion.div className="stats" variants={cardsStagger}>
            {[{ k: '24/7', t: 'Available to help' }, { k: '4.5+', t: 'Trusted review score' }, { k: '$1M', t: 'Insurance policy' }].map(
              (item) => (
                <motion.article key={item.k} variants={serviceCard}>
                  <h3>{item.k}</h3>
                  <p>{item.t}</p>
                </motion.article>
              ),
            )}
          </motion.div>
        </motion.div>
      </header>

      <main>
        <section className="section" id="reviews">
          <motion.div
            className="section-head"
            variants={sectionHead}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.26 }}
          >
            <p className="eyebrow">Social proof</p>
            <h2>What our customers are saying</h2>
          </motion.div>
          <motion.div
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
              ‹
            </button>

            <div className="reviews-viewport">
              <motion.div
                className="reviews-track"
                animate={{ x: `-${activeReview * 100}%` }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.58, ease: easing }}
              >
                {reviews.map((review) => (
                  <article className="card review-card carousel-card" key={review.initials + review.quote.slice(0, 14)}>
                    <div className="review-meta">
                      <p className="review-initials">{review.initials}</p>
                      <div className="stars" aria-label="5 out of 5 stars">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span key={index}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="review-quote">{review.quote}</p>
                  </article>
                ))}
              </motion.div>
            </div>

            <button
              className="reviews-nav"
              type="button"
              onClick={() => setActiveReview((current) => (current + 1) % reviews.length)}
              aria-label="Next review"
            >
              ›
            </button>
          </motion.div>

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
          <motion.div
            className="section-head"
            variants={sectionHead}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.28 }}
          >
            <p className="eyebrow">Services</p>
            <h2>We Provide The Best Services</h2>
            <p>Because we cut out the middleman to bring you the best San Francisco cleaning services at the best price.</p>
          </motion.div>
          <motion.div
            className="grid service-groups"
            variants={cardsStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {serviceGroups.map((group) => (
              <motion.article className={`card service-card tone-${group.key}`} variants={serviceCard} key={group.title}>
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
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section className="section other-services" id="other-services">
          <div className="other-services-media" aria-hidden="true">
            <video className="other-services-video" src="/limpia.mp4" autoPlay muted loop playsInline preload="metadata" />
          </div>
          <div className="other-services-layout">
            <motion.div
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
            </motion.div>

            <motion.div
              className="grid other-services-grid"
              variants={cardsStagger}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {otherServices.map((service) => (
                <motion.article className={`card premium-service-card tone-${service.key}`} variants={serviceCard} key={service.title}>
                  <div className="premium-service-head">
                    <span className={`premium-service-icon tone-${service.key}`} aria-hidden="true">
                      <OtherServiceIcon type={service.key} />
                    </span>
                    <h3>{service.title}</h3>
                  </div>
                  <p>{service.summary}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="section split" id="about">
          <motion.article
            className="card feature"
            variants={serviceCard}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.24 }}
          >
            <div className="feature-top">
              <span className="feature-icon" aria-hidden="true">
                🌿
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
          </motion.article>
          <motion.article
            className="card feature"
            variants={reviewCard}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.24 }}
          >
            <div className="feature-top">
              <span className="feature-icon" aria-hidden="true">
                ✨
              </span>
              <p className="eyebrow">Industry leaders</p>
            </div>
            <h2>People love our work in the Bay Area</h2>
            <ul className="benefits-list">
              {benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </motion.article>
        </section>

        <section className="section process">
          <motion.div
            className="section-head"
            variants={sectionHead}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.26 }}
          >
            <p className="eyebrow">How it works</p>
            <h2>We can meet all your cleaning needs on your schedule and within your budget</h2>
          </motion.div>
          <motion.div
            className="grid process-grid"
            variants={cardsStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.article className="card process-card" variants={processCard}>
              <div className="step-head">
                <p className="step-badge">01</p>
                <span className="step-icon" aria-hidden="true">
                  📋
                </span>
              </div>
              <h3>Set Up a Cleaning Plan</h3>
              <p>Tell us what you need and choose a one-time or recurring schedule.</p>
            </motion.article>
            <motion.article className="card process-card" variants={processCard}>
              <div className="step-head">
                <p className="step-badge">02</p>
                <span className="step-icon" aria-hidden="true">
                  💻
                </span>
              </div>
              <h3>Manage Everything Online</h3>
              <p>Confirm appointments, updates, and requests in a simple workflow.</p>
            </motion.article>
            <motion.article className="card process-card" variants={processCard}>
              <div className="step-head">
                <p className="step-badge">03</p>
                <span className="step-icon" aria-hidden="true">
                  ✨
                </span>
              </div>
              <h3>Sit Back and Relax</h3>
              <p>Our trained team handles the cleaning while you focus on your priorities.</p>
            </motion.article>
          </motion.div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="footer-grid">
          <motion.div
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
          </motion.div>
          <motion.div
            className="contact-list"
            variants={serviceCard}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p>
              <span className="contact-icon" aria-hidden="true">
                ✉
              </span>
              <span>Email:</span> info@alwayscleansf.com
            </p>
            <p>
              <span className="contact-icon" aria-hidden="true">
                ☎
              </span>
              <span>Phone:</span> (415) 944 0012
            </p>
            <p>
              <span className="contact-icon" aria-hidden="true">
                ⏰
              </span>
              <span>Hours:</span> 24/7 available to help you
            </p>
          </motion.div>
        </div>
        <p className="copyright">Copyright © 2026 - Always Clean | Designed by kaideveloper.com</p>
      </footer>

      <div className="floating-contact-wrap">
        <motion.a
          className="floating-contact"
          href="tel:+14159440012"
          aria-label="Call (415) 944 0012"
          initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.94, filter: 'blur(6px)' }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={reduceMotion ? undefined : { duration: 0.65, ease: easing, delay: 0.25 }}
        >
          <span className="floating-contact-default">Contact us</span>
          <span className="floating-contact-content">
            <span className="floating-contact-icon" aria-hidden="true">
              &#9742;
            </span>
            <span>(415) 944 0012</span>
          </span>
        </motion.a>
      </div>
    </div>
  )
}

export default App

