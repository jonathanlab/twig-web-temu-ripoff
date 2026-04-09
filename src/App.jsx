import { useState, useEffect, useRef } from 'react'
import FlowDiagram from './components/FlowDiagram'
import './App.css'

function TerminalDemo() {
  const [lines, setLines] = useState([])
  const [cursor, setCursor] = useState(true)
  const bodyRef = useRef(null)

  const script = [
    { type: 'input', text: '$ twig start --watch', delay: 600 },
    { type: 'system', text: '[twig] connecting to PostHog...', delay: 400 },
    { type: 'success', text: '[twig] connected ✓ project: acme-app', delay: 300 },
    { type: 'system', text: '[twig] watching sessions, errors, analytics', delay: 500 },
    { type: 'blank', text: '', delay: 200 },
    { type: 'alert', text: '▸ signal: rage clicks on /checkout (12 users)', delay: 800 },
    { type: 'alert', text: '▸ signal: TypeError: Cannot read null.email', delay: 400 },
    { type: 'system', text: '[A1] correlating session replay with error...', delay: 600 },
    { type: 'system', text: '[A1] root cause: missing null check line 47', delay: 500 },
    { type: 'system', text: '[A1] writing fix...', delay: 400 },
    { type: 'system', text: '[A1] running test suite (23 tests)', delay: 600 },
    { type: 'success', text: '[A1] all tests passing ✓', delay: 300 },
    { type: 'success', text: '[A1] opened PR #127: fix null user in checkout', delay: 500 },
    { type: 'blank', text: '', delay: 300 },
    { type: 'alert', text: '▸ signal: experiment "new-cta" reached significance', delay: 700 },
    { type: 'system', text: '[A2] variant B wins (+12% conversion, p=0.003)', delay: 400 },
    { type: 'success', text: '[A2] feature flag new-cta-flow → 100% rollout', delay: 400 },
    { type: 'blank', text: '', delay: 200 },
    { type: 'alert', text: '▸ signal: funnel drop 23% at checkout step 3', delay: 600 },
    { type: 'alert', text: '▸ signal: survey response "too many fields"', delay: 400 },
    { type: 'system', text: '[A3] simplifying checkout flow...', delay: 500 },
    { type: 'system', text: '[A3] configuring A/B test (50/50 split)', delay: 400 },
    { type: 'success', text: '[A3] experiment checkout-v2 launched', delay: 400 },
  ]

  useEffect(() => {
    let i = 0
    let timeout
    const addLine = () => {
      if (i >= script.length) return
      setLines(prev => [...prev, script[i]])
      i++
      timeout = setTimeout(addLine, script[i - 1].delay)
    }
    timeout = setTimeout(addLine, 800)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setCursor(c => !c), 530)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [lines])

  return (
    <div className="terminal">
      <div className="terminal-header">
        <span className="terminal-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </span>
        <span className="terminal-title">twig — ~/acme-app</span>
        <span className="terminal-badge">LIVE</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {lines.map((line, i) => (
          <div key={i} className={`term-line ${line.type}`}>
            {line.text}
          </div>
        ))}
        <div className="term-line cursor-line">
          <span className={`cursor ${cursor ? 'on' : ''}`}>▋</span>
        </div>
      </div>
    </div>
  )
}

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

      {/* Hero + Terminal */}
      <div className="hero-row">
        <div className="hero">
          <div className="hero-content">
            <div className="hero-badge">Agentic Development Environment</div>
            <h1 className="hero-title">build your product<br />autonomously</h1>
            <p className="hero-subtitle">
              an agentic development environment<br />
              that understands your user behavior
            </p>
            <div className="hero-cta">
              <a href="#" className="btn btn-primary">Download</a>
              <a href="#" className="btn btn-secondary">View Docs</a>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">32</span>
                <span className="hero-stat-label">max agents</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">&lt;200ms</span>
                <span className="hero-stat-label">cold start</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">24h</span>
                <span className="hero-stat-label">max session</span>
              </div>
            </div>
          </div>
        </div>
        <div className="terminal-panel">
          <TerminalDemo />
        </div>
      </div>

      {/* How it works strip */}
      <div className="how-strip">
        <div className="how-step">
          <span className="how-num">01</span>
          <div className="how-text">
            <strong>Connect PostHog</strong>
            <span>Session replays, errors, rage clicks, surveys feed the agent</span>
          </div>
        </div>
        <div className="how-step">
          <span className="how-num">02</span>
          <div className="how-text">
            <strong>Agents Investigate</strong>
            <span>Parallel agents correlate signals, identify root causes</span>
          </div>
        </div>
        <div className="how-step">
          <span className="how-num">03</span>
          <div className="how-text">
            <strong>Ship Autonomously</strong>
            <span>Write code, run tests, open PRs, configure experiments</span>
          </div>
        </div>
      </div>

      {/* Middle: Diagram + Sidebar */}
      <div className="display-section">
        <div className="diagram-container">
          <FlowDiagram />
        </div>
        <div className="side-panel">
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
            </div>
          </div>
          <div className="specs-panel">
            <div className="specs-header">
              <span className="panel-label">Specs</span>
            </div>
            <div className="specs-grid">
              <div className="spec-item"><span className="spec-label">Runtime</span><span className="spec-value">Multi-Agent</span></div>
              <div className="spec-item"><span className="spec-label">Source</span><span className="spec-value accent">PostHog</span></div>
              <div className="spec-item"><span className="spec-label">Models</span><span className="spec-value">GPT-4 / Claude</span></div>
              <div className="spec-item"><span className="spec-label">Platform</span><span className="spec-value">macOS / Linux</span></div>
              <div className="spec-item"><span className="spec-label">License</span><span className="spec-value">BSL</span></div>
              <div className="spec-item"><span className="spec-label">Auth</span><span className="spec-value">SSO / API Key</span></div>
            </div>
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
