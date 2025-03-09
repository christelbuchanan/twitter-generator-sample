import React, { useState, useEffect } from 'react'
import { Twitter, Copy, Check, RefreshCw } from 'lucide-react'

interface TweetDisplayProps {
  tweet: string
  isLoading: boolean
  onRegenerate: () => void
}

const TweetDisplay: React.FC<TweetDisplayProps> = ({ tweet, isLoading, onRegenerate }) => {
  const [copied, setCopied] = useState(false)
  
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [copied])
  
  const handleCopy = () => {
    if (tweet) {
      navigator.clipboard.writeText(tweet)
      setCopied(true)
    }
  }
  
  const handlePostToTwitter = () => {
    if (tweet) {
      const tweetText = encodeURIComponent(tweet)
      window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank')
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-500 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Twitter className="h-6 w-6 text-white mr-2" />
          <h2 className="text-xl font-bold text-white">Generated Tweet</h2>
        </div>
        
        {tweet && (
          <button
            onClick={onRegenerate}
            disabled={isLoading}
            className={`flex items-center text-xs px-3 py-1 rounded-full ${
              isLoading 
                ? 'bg-blue-600 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Regenerate
          </button>
        )}
      </div>
      
      <div className="p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <RefreshCw className="h-8 w-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">Generating your CZ-style tweet...</p>
          </div>
        ) : tweet ? (
          <div>
            <div className="tweet-display p-4 border border-gray-200 rounded-lg mb-6">
              <div className="flex items-start">
                <img 
                  src="https://images.unsplash.com/photo-1622020457014-aed1cc44f25e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                  alt="CZ Profile" 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="flex items-center">
                    <span className="font-bold text-gray-900 text-sm">CZ 🔶 Binance</span>
                    <span className="text-gray-500 ml-2 text-xs">@cz_binance</span>
                  </div>
                  <p className="mt-1 text-gray-800">{tweet}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-end">
              <button
                onClick={handleCopy}
                className="flex items-center text-sm px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy tweet
                  </>
                )}
              </button>
              
              <button
                onClick={handlePostToTwitter}
                className="flex items-center text-sm px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                <Twitter className="h-4 w-4 mr-1" />
                Post to Twitter
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Enter a topic and generate a tweet to see it here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TweetDisplay
