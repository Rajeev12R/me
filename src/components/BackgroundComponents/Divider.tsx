interface EllipticalDividerProps {
  height?: string
  className?: string
}

export default function EllipticalDivider({ height = "h-64", className = "" }: EllipticalDividerProps) {
  return (
    <div className={`relative w-full ${height} overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black"></div>

      {/* Main elliptical shape with glow effect */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            {/* Radial gradient for the glow effect */}
            <radialGradient id="atmosphereGlow" cx="50%" cy="100%" r="60%" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
              <stop offset="20%" stopColor="rgba(255, 255, 255, 0.6)" />
              <stop offset="40%" stopColor="rgba(255, 255, 255, 0.3)" />
              <stop offset="60%" stopColor="rgba(255, 255, 255, 0.1)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </radialGradient>

            {/* Gradient for the planet surface */}
            <radialGradient id="planetSurface" cx="50%" cy="100%" r="50%" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="50%" stopColor="#0a0a0a" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>
          </defs>

          {/* Atmospheric glow - larger ellipse */}
          <ellipse cx="600" cy="400" rx="650" ry="180" fill="url(#atmosphereGlow)" opacity="0.7" />

          {/* Planet surface - main ellipse */}
          <ellipse cx="600" cy="400" rx="600" ry="150" fill="url(#planetSurface)" />

          {/* Inner shadow for depth */}
          <ellipse cx="600" cy="400" rx="600" ry="150" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  )
}
