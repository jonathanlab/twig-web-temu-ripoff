import { useEffect, useState, useRef, memo } from 'react'

// Global animation state tracker - persists across component remounts
const animationState = new Map()

// Custom edge with dotted line and traveling * (E2B style: ]·····*··[)
function AsciiEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}) {
  const isActive = data?.active ?? false
  const [, forceUpdate] = useState(0)
  const intervalRef = useRef(null)

  // Check if this is a straight horizontal line
  const isStraight = Math.abs(targetY - sourceY) < 2

  // Calculate total path length
  const pathLength = isStraight
    ? Math.abs(targetX - sourceX)
    : Math.abs(targetX - sourceX) + Math.abs(targetY - sourceY)

  const spacing = 8
  const numDots = Math.max(1, Math.floor(pathLength / spacing))

  // Get or initialize animation state for this edge
  if (!animationState.has(id)) {
    animationState.set(id, { dotIndex: 0, wasActive: false })
  }
  const state = animationState.get(id)

  // Get coordinates for a dot at index
  const getDotCoords = (index) => {
    const progress = index / numDots
    const pos = progress * pathLength

    if (isStraight) {
      return { x: sourceX + pos, y: sourceY }
    }

    const horizLength = Math.abs(targetX - sourceX)

    if (pos <= horizLength) {
      return { x: sourceX + pos, y: sourceY }
    } else {
      const vertProgress = pos - horizLength
      const direction = targetY > sourceY ? 1 : -1
      return { x: targetX, y: sourceY + vertProgress * direction }
    }
  }

  // Store numDots in state object so interval callback always has latest
  state.numDots = numDots

  // Handle animation
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (!isActive) {
      // Reset state when becoming inactive
      state.wasActive = false
      return
    }

    // Reset to start on fresh activation
    if (!state.wasActive) {
      state.dotIndex = 0
      state.wasActive = true
    }

    // Start animation - use state.numDots to avoid dependency
    // Despawn when reaching the end (go past numDots)
    intervalRef.current = setInterval(() => {
      if (state.dotIndex <= state.numDots) {
        state.dotIndex = state.dotIndex + 1
        forceUpdate(n => n + 1)
      }
    }, 80)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isActive, id]) // Removed numDots dependency

  const activeDotIndex = state.dotIndex

  // Generate square dots along the path
  const generateDots = () => {
    const dots = []
    const dotSize = 2

    for (let i = 0; i <= numDots; i++) {
      const { x, y } = getDotCoords(i)

      // Skip this dot position if the * is here (only when active)
      if (isActive && i === activeDotIndex) continue

      dots.push(
        <rect
          key={i}
          x={x - dotSize / 2}
          y={y - dotSize / 2}
          width={dotSize}
          height={dotSize}
          fill="#000000"
          opacity={1}
        />
      )
    }
    return dots
  }

  const activePos = getDotCoords(activeDotIndex)

  return (
    <>
      {/* Dot trail */}
      {generateDots()}

      {/* Traveling * indicator - only when active and not past the end */}
      {isActive && activeDotIndex <= numDots && (
        <text
          x={activePos.x}
          y={activePos.y}
          fontSize="12"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="bold"
          fill="var(--accent)"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          *
        </text>
      )}
    </>
  )
}

export default memo(AsciiEdge)
