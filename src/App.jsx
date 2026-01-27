import { useState, useEffect } from 'react'
import FlowDiagram from './components/FlowDiagram'
import './App.css'

function App() {
  const [timestamp, setTimestamp] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTimestamp(now.toISOString().slice(11, 19) + ' UTC')
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="grid-bg" />

      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          <div className="top-bar-section logo-section">
            <img src="/hands/peter.png" alt="" className="logo-hand" />
            <div className="logo">TWIG</div>
          </div>
          <div className="top-bar-section center">
            <div className="nav-links">
              <a href="#">Docs</a>
              <a href="#">Pricing</a>
              <a href="#">Blog</a>
              <a href="#">Humans</a>
              <a href="#">Handbook</a>
            </div>
          </div>
        </div>
        <div className="top-bar-right">
          <div className="status-bar">
            <div className="status-item">
              <span className="status-dot" />
              <span>Systems Operational</span>
            </div>
            <div className="status-item">TW-0.19.33</div>
            <div className="status-item">{timestamp}</div>
          </div>
          <span>From the makers of PostHog</span>
        </div>
      </div>

      {/* Top Row: Hero + Info Panel (Specs + Features) */}
      <div className="top-row">
        <div className="hero">
          <div className="hero-content">
            <div className="hero-badge">Agentic Development Environment</div>
            <h1 className="hero-title">build your product<br />autonomously</h1>
            <p className="hero-subtitle">
              an agentic development environment,<br />that understands your user behavior
            </p>
            <div className="hero-cta">
              <a href="#" className="btn btn-primary">Download</a>
            </div>
          </div>
          <div className="hero-image">
            <img src="/hero.webp" alt="" />
          </div>
        </div>
        <div className="info-panel">
          <div className="specs-row">
            <div className="spec-item"><span className="spec-label">Runtime</span><span className="spec-value">Multi-Agent</span></div>
            <div className="spec-item"><span className="spec-label">Agents</span><span className="spec-value">32 max</span></div>
            <div className="spec-item"><span className="spec-label">Source</span><span className="spec-value accent">PostHog</span></div>
            <div className="spec-item"><span className="spec-label">Cold Start</span><span className="spec-value">&lt;200ms</span></div>
            <div className="spec-item"><span className="spec-label">Session</span><span className="spec-value">24h max</span></div>
            <div className="spec-item"><span className="spec-label">Models</span><span className="spec-value">GPT-4 / Claude</span></div>
            <div className="spec-item"><span className="spec-label">Platform</span><span className="spec-value">macOS / Linux</span></div>
            <div className="spec-item"><span className="spec-label">License</span><span className="spec-value">BSL</span></div>
          </div>
          <div className="features-row">
            <div className="feature-item">
              <span className="feature-index">01</span>
              <strong>PostHog Integration</strong>
              <span>Session replays, errors, rage clicks feed the agent</span>
            </div>
            <div className="feature-item">
              <span className="feature-index">02</span>
              <strong>Multi-Agent Orchestration</strong>
              <span>Parallel agents work together to ship faster</span>
            </div>
            <div className="feature-item">
              <span className="feature-index">03</span>
              <strong>Autonomous PR Creation</strong>
              <span>Detects issues, writes code, runs tests, opens PRs</span>
            </div>
            <div className="feature-item">
              <span className="feature-index">04</span>
              <strong>Model Agnostic</strong>
              <span>GPT-4, Claude, Llama, or bring your own</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle: Diagram + Hands */}
      <div className="display-section">
        <div className="diagram-container">
          <FlowDiagram />
        </div>
        <div className="hands-container">
          <div className="hands-header">
            <span className="panel-label">The Humans</span>
          </div>
          <div className="hands-grid">
            <div className="hand-item"><img src="/hands/james.png" alt="James" /><span>James</span></div>
            <div className="hand-item"><img src="/hands/peter.png" alt="Peter" /><span>Peter</span></div>
            <div className="hand-item"><img src="/hands/joshua.png" alt="Joshua" /><span>Joshua</span></div>
            <div className="hand-item"><img src="/hands/jonathan.png" alt="Jonathan" /><span>Jonathan</span></div>
            <div className="hand-item"><img src="/hands/charles.png" alt="Charles" /><span>Charles</span></div>
            <div className="hand-item"><img src="/hands/lottie.png" alt="Lottie" /><span>Lottie</span></div>
            <div className="hand-item"><img src="/hands/em.png" alt="Em" /><span>Em</span></div>
            <div className="hand-item"><img src="/hands/georgiy.png" alt="Georgiy" /><span>Georgiy</span></div>
            <div className="hand-item"><img src="/hands/alessandro.png" alt="Alessandro" /><span>Alessandro</span></div>
            <div className="hand-item"><img src="/hands/annika.png" alt="Annika" /><span>Annika</span></div>
            <div className="hand-item"><img src="/hands/michael.png" alt="Michael" /><span>Michael</span></div>
            <div className="hand-item"><img src="/hands/alex.png" alt="Alex" /><span>Alex</span></div>
            <div className="hand-item"><img src="/hands/olly.png" alt="Olly" /><span>Olly</span></div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Roadmap + Blog */}
      <div className="bottom-row">
        <div className="roadmap-panel">
          <div className="panel-header">
            <span className="panel-label">Roadmap</span>
            <span className="panel-cta">vote for what's next</span>
          </div>
          <div className="roadmap-grid">
            <div className="roadmap-item">
              <div className="vote-box"><span className="vote-arrow">▲</span><span className="vote-count">12</span></div>
              <div className="roadmap-text"><strong>automatic feature flags</strong><span>Smart rollouts that minimize blast radius</span></div>
            </div>
            <div className="roadmap-item">
              <div className="vote-box"><span className="vote-arrow">▲</span><span className="vote-count">8</span></div>
              <div className="roadmap-text"><strong>conversion optimization</strong><span>AI experiments that optimize themselves</span></div>
            </div>
            <div className="roadmap-item">
              <div className="vote-box"><span className="vote-arrow">▲</span><span className="vote-count">5</span></div>
              <div className="roadmap-text"><strong>auto-instrumentation</strong><span>Generate dashboards without manual tracking</span></div>
            </div>
            <div className="roadmap-item">
              <div className="vote-box"><span className="vote-arrow">▲</span><span className="vote-count">3</span></div>
              <div className="roadmap-text"><strong>natural language queries</strong><span>Ask questions in plain English</span></div>
            </div>
          </div>
        </div>
        <div className="blog-panel">
          <div className="panel-header">
            <span className="panel-label">From the Blog</span>
          </div>
          <div className="blog-content">
            <div className="blog-image">
              <img src="/blog-posthog-why-twig.webp" alt="" />
            </div>
            <div className="blog-featured">
              <span className="blog-item-title">announcing twig: an agentic code editor that understands your users</span>
              <span className="blog-item-preview">At PostHog, we've spent years building tools that help teams understand their users. Product analytics, session recordings, feature flags, A/B testing - all designed to answer one fundamental question: what do your users actually do? Then we looked at how software gets built, and something struck us as deeply wrong...</span>
              <a href="#" className="blog-read-more">Read more →</a>
            </div>
            <div className="blog-list">
              <a href="#" className="blog-item">
                <span className="blog-item-title">i thought you were building posthog, why twig?</span>
                <span className="blog-item-date">January 2026</span>
              </a>
              <a href="#" className="blog-item">
                <span className="blog-item-title">why the name "twig"?</span>
                <span className="blog-item-date">January 2026</span>
              </a>
              <a href="#" className="blog-item">
                <span className="blog-item-title">how twig uses posthog session replays</span>
                <span className="blog-item-date">January 2026</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Color Bar */}
      <div className="color-bar">
        <span /><span /><span /><span />
        <span /><span /><span /><span />
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="footer-section grow">
          <div className="footer-links">
            <a href="#">GitHub</a>
            <a href="#">PostHog</a>
            <a href="#">Work here</a>
          </div>
          <span>© 2026 Twig · PostHog Inc.</span>
        </div>
        <div className="footer-section">
          <span>BSL License</span>
        </div>
      </div>
    </>
  )
}

export default App
