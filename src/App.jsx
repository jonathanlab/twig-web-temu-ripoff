import { ReactFlow, Background, useNodesState, useEdgesState } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import FlowDiagram from './components/FlowDiagram'
import './App.css'

function App() {
  return (
    <>
      <div className="grid-bg" />
      <div className="app-container">
        <FlowDiagram />
      </div>
    </>
  )
}

export default App
