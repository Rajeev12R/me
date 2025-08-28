"use client"

import React, { useEffect, useState } from 'react'

interface TerminalLoaderProps {
  isLoading: boolean
  loadingText?: string
  maxDisplayTime?: number
}

const TerminalLoader: React.FC<TerminalLoaderProps> = ({ 
  isLoading,
  loadingText = "Loading portfolio", 
  maxDisplayTime = 4000 // 4 seconds max
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [startTime] = useState(Date.now())
  const [showCompleteMessage, setShowCompleteMessage] = useState(false)

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < loadingText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(loadingText.substring(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 50)
      
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, loadingText])

  // Progress animation effect
  useEffect(() => {
    if (!isComplete) {
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const calculatedProgress = Math.min(100, (elapsed / maxDisplayTime) * 100)
        
        setProgress(calculatedProgress)
        
        // Show complete message at exactly 100%
        if (calculatedProgress >= 100 && !showCompleteMessage) {
          setShowCompleteMessage(true)
        }
        
        // Complete after max time or when data is loaded and we've reached 100%
        if ((elapsed >= maxDisplayTime) || (!isLoading && calculatedProgress >= 100)) {
          setIsComplete(true)
          clearInterval(progressInterval)
        }
      }, 50)
      
      return () => clearInterval(progressInterval)
    }
  }, [isComplete, isLoading, maxDisplayTime, startTime, showCompleteMessage])

  // Cursor blink effect
  useEffect(() => {
    if (!isComplete) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev)
      }, 500)
      
      return () => clearInterval(cursorInterval)
    }
  }, [isComplete])

  if (!isComplete) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white font-mono">
        <div className="w-full max-w-2xl mx-4 p-6 bg-black rounded-lg border border-gray-700 shadow-xl">
          {/* Terminal header */}
          <div className="flex items-center gap-2 pb-3 border-b border-gray-700 mb-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-sm text-gray-400 ml-2">bash — 80×30</div>
          </div>
          
          {/* Terminal content */}
          <div className="text-green-400 mb-2">
            <span className="text-blue-400">visitor@portfolio:~$</span> load_portfolio.sh
          </div>
          
          <div className="mb-4">
            <span className="text-cyan-400">→</span> {displayedText}
            {showCursor && <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"></span>}
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
            <div 
              className="bg-green-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Status message */}
          <div className="text-sm text-gray-400">
            {showCompleteMessage ? (
              <span className="text-green-400">✓ Complete! Launching portfolio...</span>
            ) : isLoading ? (
              <span>Fetching data from server... [{Math.round(progress)}%]</span>
            ) : (
              <span>Finalizing setup... [{Math.round(progress)}%]</span>
            )}
          </div>
          
          {/* System info */}
          <div className="mt-6 text-xs text-gray-500 border-t border-gray-800 pt-3">
            <div>System: Web Portfolio v2.1</div>
            <div>Environment: Production</div>
            <div>Status: {showCompleteMessage ? 'Ready' : isLoading ? 'Fetching Data' : 'Processing'}</div>
            <div>Time: {(maxDisplayTime / 1000).toFixed(1)}s max</div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default TerminalLoader