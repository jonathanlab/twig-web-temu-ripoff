import { useState, useEffect } from 'react'
import {
  ReactFlow,
  Handle,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import './FlowDiagram.css'
import AsciiEdge from './AsciiEdge'

// Custom node for input boxes
function InputNode({ data }) {
  return (
    <div className={`input-node ${data.active ? 'active' : ''}`}>
      <div className="node-content">
        <span className="label">{data.label}</span>
        {data.desc && <span className="desc">{data.desc}</span>}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

// Custom node for output boxes (single items)
function OutputNode({ data }) {
  return (
    <div className={`output-node ${data.active ? 'active' : ''}`}>
      <Handle type="target" position={Position.Left} />
      <div className="node-content">
        <span className="label">{data.label}</span>
        {data.desc && <span className="desc">{data.desc}</span>}
      </div>
    </div>
  )
}

// Custom node for accumulated output log
function OutputLogNode({ data }) {
  return (
    <div className="output-log-node">
      <Handle type="target" position={Position.Left} style={{ top: '50%' }} />
      <div className="output-log-header">
        <span className="controls">≡ ×</span>
        <span className="title">═══════ OUTPUT ═══════</span>
      </div>
      <div className="output-log-body">
        {data.outputs?.map((output, i) => (
          <div key={i} className={`output-item ${output.isNew ? 'new' : ''}`}>
            <span className="output-label">{output.label}</span>
            <span className="output-desc">{output.desc}</span>
          </div>
        ))}
        {data.outputs?.length === 0 && (
          <div className="output-item empty">
            <span className="output-desc">waiting for results...</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Custom node for central TWIG terminal
function TwigNode({ data }) {
  return (
    <div className="twig-node">
      {/* Multiple input handles on left - aligned to grid */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Handle
          key={`in-${i}`}
          type="target"
          position={Position.Left}
          id={`in-${i}`}
          style={{ top: `${((i - 1) * 60) + 22}px` }}
        />
      ))}
      <div className="twig-header">
        <span className="controls">≡ ×</span>
        <span className="title">═══════ TWIG ═══════</span>
      </div>
      <div className="twig-body">
        <div className="agent-log">
          {data.logs?.map((log, i) => (
            <div key={i} className={`log-line ${log.type || ''}`}>
              <span className="log-agent">[{log.agent}]</span>
              <span className="log-msg">{log.msg}</span>
            </div>
          ))}
        </div>
        <div className="twig-status">
          <span>{data.logs?.length || 0} agents</span>
          <span className="sep">·</span>
          <span className="live">● live</span>
        </div>
      </div>
      {/* Multiple output handles on right - aligned to grid */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Handle
          key={`out-${i}`}
          type="source"
          position={Position.Right}
          id={`out-${i}`}
          style={{ top: `${((i - 1) * 60) + 22}px` }}
        />
      ))}
    </div>
  )
}

const nodeTypes = {
  input: InputNode,
  output: OutputNode,
  outputLog: OutputLogNode,
  twig: TwigNode,
}

const edgeTypes = {
  ascii: AsciiEdge,
}

// Grid settings
const GRID = 60
const INPUT_X = 50
const OUTPUT_X = 700
const TWIG_X = 350

// Input categories (always visible) - signals TWIG monitors
const inputCategories = [
  { id: 'in-1', label: 'Sessions' },
  { id: 'in-2', label: 'Errors' },
  { id: 'in-3', label: 'Analytics' },
  { id: 'in-4', label: 'Surveys' },
  { id: 'in-5', label: 'Experiments' },
  { id: 'in-6', label: 'Prompts' },
]

// Animation batches - varied outputs showcasing TWIG capabilities
// Not just PRs - feature flags, experiments, instrumentation, etc.
const batches = [
  {
    activeInputs: ['in-1', 'in-2'], // Sessions + Errors
    inputDescs: { 'in-1': 'rage clicks on checkout', 'in-2': 'TypeError: null user' },
    agent: { id: 'A1' },
    steps: [
      'correlating session with error...',
      'found root cause: null user',
      'writing fix...',
      'running tests...',
      'creating pull request...',
    ],
    output: { label: 'Bug Fix', desc: 'PR #127: null check in checkout' },
  },
  {
    activeInputs: ['in-5'], // Experiments - quick task
    inputDescs: { 'in-5': 'variant B +12% conversion' },
    agent: { id: 'A2' },
    steps: [
      'validating statistical significance...',
      'updating feature flag...',
    ],
    output: { label: 'Feature Flag', desc: 'new-checkout-flow → 100%' },
  },
  {
    activeInputs: ['in-3', 'in-4'], // Analytics + Surveys
    inputDescs: { 'in-3': '23% drop at step 3', 'in-4': '"too many fields"' },
    agent: { id: 'A3' },
    steps: [
      'analyzing funnel data...',
      'matching survey feedback...',
      'designing simplified flow...',
      'implementing changes...',
      'setting up A/B test...',
    ],
    output: { label: 'Experiment', desc: 'checkout-v2 launched (50/50)' },
  },
  {
    activeInputs: ['in-6'], // Prompts - quick task
    inputDescs: { 'in-6': '"track button clicks"' },
    agent: { id: 'A4' },
    steps: [
      'identifying target elements...',
      'adding event capture...',
    ],
    output: { label: 'Instrumentation', desc: 'auto-capture: 12 buttons' },
  },
  {
    activeInputs: ['in-1', 'in-3'], // Sessions + Analytics - long task
    inputDescs: { 'in-1': 'session #4522 slow load', 'in-3': 'p95 latency spike' },
    agent: { id: 'A5' },
    steps: [
      'profiling slow sessions...',
      'identifying bottleneck...',
      'analyzing query plans...',
      'optimizing DB query...',
      'adding caching layer...',
      'load testing...',
    ],
    output: { label: 'Performance', desc: 'PR #131: query optimization' },
  },
  {
    activeInputs: ['in-4'], // Surveys
    inputDescs: { 'in-4': '"want dark mode"' },
    agent: { id: 'A6' },
    steps: [
      'analyzing request frequency...',
      'designing theme system...',
      'implementing dark mode...',
    ],
    output: { label: 'Feature', desc: 'PR #132: dark mode support' },
  },
  {
    activeInputs: ['in-2'], // Errors - quick monitoring task
    inputDescs: { 'in-2': 'spike in 500 errors' },
    agent: { id: 'A7' },
    steps: [
      'analyzing error patterns...',
      'creating alert rule...',
    ],
    output: { label: 'Alert', desc: 'api-error-rate > 5% threshold' },
  },
  {
    activeInputs: ['in-5', 'in-3'], // Experiments + Analytics
    inputDescs: { 'in-5': 'pricing test complete', 'in-3': '+8% revenue tier B' },
    agent: { id: 'A8' },
    steps: [
      'validating results...',
      'updating pricing config...',
      'creating changelog...',
      'notifying stakeholders...',
    ],
    output: { label: 'Rollout', desc: 'pricing-v2 → production' },
  },
]

// Static node positions
const inputNodes = inputCategories.map((cat, i) => ({
  id: cat.id,
  type: 'input',
  position: { x: INPUT_X, y: GRID * (i + 1) },
  data: { label: cat.label },
}))

const twigNode = {
  id: 'twig',
  type: 'twig',
  position: { x: TWIG_X, y: GRID * 1 },
}

const outputLogNode = {
  id: 'output-log',
  type: 'outputLog',
  position: { x: OUTPUT_X, y: GRID * 1 },
}

const staticEdges = [
  // Inputs to TWIG
  ...inputCategories.map((cat, i) => ({
    id: `e-${cat.id}`,
    source: cat.id,
    target: 'twig',
    targetHandle: `in-${i + 1}`,
    type: 'ascii',
  })),
  // TWIG to Output Log (single edge from middle)
  {
    id: 'e-output',
    source: 'twig',
    sourceHandle: 'out-4',
    target: 'output-log',
    type: 'ascii',
  },
]

export default function FlowDiagram() {
  const [tick, setTick] = useState(0)
  const [completedOutputs, setCompletedOutputs] = useState([])

  // Tick forward (stops when all agents done)
  useEffect(() => {
    const inputPhaseTicks = 3 // must match INPUT_PHASE_TICKS
    const allDone = batches.every((batch, i) => {
      const staggerOffset = i * 3 // must match getAgentState
      const agentTick = tick - staggerOffset
      const doneAfter = inputPhaseTicks + batch.steps.length + 1 // input + steps + output
      return agentTick >= doneAfter
    })

    if (allDone) return // stop ticking

    const interval = setInterval(() => {
      setTick((t) => t + 1)
    }, 900) // slower ticks for longer step duration
    return () => clearInterval(interval)
  }, [tick])

  // Input phase - just enough for edge animation to complete
  const INPUT_PHASE_TICKS = 3

  // Calculate each agent's phase and current step based on tick
  const getAgentState = (agentIndex) => {
    const batch = batches[agentIndex]
    const numSteps = batch.steps.length
    const staggerOffset = agentIndex * 3 // tighter stagger for more parallel feel
    const agentTick = tick - staggerOffset

    // Phases: waiting (before start), input (INPUT_PHASE_TICKS), processing (numSteps ticks), output (1 tick), done
    if (agentTick < 0) return { phase: 'waiting', step: null, stepIndex: -1 }
    if (agentTick < INPUT_PHASE_TICKS) return { phase: 'input', step: null, stepIndex: -1 }

    const processingTick = agentTick - INPUT_PHASE_TICKS
    if (processingTick < numSteps) {
      return { phase: 'processing', step: batch.steps[processingTick], stepIndex: processingTick }
    }

    if (agentTick < INPUT_PHASE_TICKS + numSteps + 1) return { phase: 'output', step: null, stepIndex: -1 }
    return { phase: 'done', step: null, stepIndex: -1 }
  }

  // Helper to get just the phase
  const getAgentPhase = (agentIndex) => getAgentState(agentIndex).phase

  // Track completed outputs (accumulate, never remove)
  useEffect(() => {
    batches.forEach((batch, i) => {
      const phase = getAgentPhase(i)
      if (phase === 'output' || phase === 'done') {
        setCompletedOutputs((prev) => {
          if (prev.some((o) => o.label === batch.output.label)) return prev
          return [...prev, { ...batch.output, isNew: phase === 'output' }]
        })
      }
    })
  }, [tick])

  // Mark outputs as not new after they've been shown
  useEffect(() => {
    const timer = setTimeout(() => {
      setCompletedOutputs((prev) => prev.map((o) => ({ ...o, isNew: false })))
    }, 800)
    return () => clearTimeout(timer)
  }, [completedOutputs.length])

  // Find which batches are actively using each input (only during input phase)
  const getActiveInputs = () => {
    const activeInputs = {}
    batches.forEach((batch, i) => {
      const phase = getAgentPhase(i)
      // Only show data traveling during 'input' phase, not during processing
      if (phase === 'input') {
        batch.activeInputs.forEach((inputId) => {
          activeInputs[inputId] = { batch, batchIndex: i }
        })
      }
    })
    return activeInputs
  }

  const activeInputs = getActiveInputs()

  // Build nodes with category labels + active descriptions
  const nodes = [
    // Input nodes - show category + description when active
    ...inputNodes.map((node) => {
      const activeInfo = activeInputs[node.id]
      const isActive = !!activeInfo
      return {
        ...node,
        data: {
          label: inputCategories.find((c) => c.id === node.id)?.label,
          desc: isActive ? activeInfo.batch.inputDescs[node.id] : null,
          active: isActive,
        },
      }
    }),
    // TWIG node - show only agents that have started (not waiting)
    {
      ...twigNode,
      data: {
        logs: batches
          .map((b, i) => {
            const state = getAgentState(i)
            if (state.phase === 'waiting') return null // don't show waiting agents
            let msg = ''
            let type = ''
            if (state.phase === 'input') { msg = 'picking up signals...'; type = '' }
            if (state.phase === 'processing') { msg = state.step; type = 'highlight' }
            if (state.phase === 'output') { msg = '✓ ' + b.output.label; type = 'success' }
            if (state.phase === 'done') { msg = '✓ ' + b.output.desc; type = 'success' }
            return { agent: b.agent.id, msg, type }
          })
          .filter(Boolean), // remove nulls
      },
    },
    // Output log node - accumulated results
    {
      ...outputLogNode,
      data: {
        outputs: completedOutputs,
      },
    },
  ]

  // Check if any agent is outputting
  const anyOutputting = batches.some((_, i) => getAgentPhase(i) === 'output')

  // Build edges with active states
  const edges = staticEdges.map((edge) => {
    const isInputEdge = edge.source.startsWith('in-')
    const isOutputEdge = edge.target === 'output-log'

    let isActive = false
    if (isInputEdge && activeInputs[edge.source]) {
      isActive = true
    }
    if (isOutputEdge && anyOutputting) {
      isActive = true
    }

    return { ...edge, data: { active: isActive } }
  })

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        fitView
        proOptions={{ hideAttribution: true }}
      />
    </div>
  )
}
