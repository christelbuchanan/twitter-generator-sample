import React from 'react'
import { Twitter, Copy, Check, RefreshCw, ExternalLink } from 'lucide-react'

interface TweetVariantsProps {
  variants: string[]
  selectedTweet: string
  setSelectedTweet: (tweet: string) => void
  isGenerating: boolean
  onCopy: () => void
  copied: boolean
  onRegenerate: () => void
  onPostToTwitter: () => void
}

const TweetVariants: React.FC<TweetVariantsProps> = ({ 
  variants,
  selectedTweet,
  setSelectedTweet,
  isGenerating,
  onCopy,
  copied,
  onRegenerate,
  onPostToTwitter
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="bg-blue-500 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Twitter className="h-6 w-6 text-white mr-2" />
          <h2 className="text-xl font-bold text-white">Generated Tweets</h2>
        </div>
        
        <button
          onClick={onRegenerate}
          disabled={isGenerating}
          className={`flex items-center text-xs px-3 py-1 rounded-full ${
            isGenerating 
              ? 'bg-blue-600 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <RefreshCw className={`h-3 w-3 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
          Regenerate
        </button>
      </div>
      
      <div className="p-6">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-8">
            <RefreshCw className="h-8 w-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">Generating your CZ-style tweets...</p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Select your favorite variant:</h3>
              <div className="space-y-3">
                {variants.map((tweet, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedTweet(tweet)}
                    className={`tweet-variant p-4 border rounded-lg cursor-pointer ${
                      selectedTweet === tweet ? 'selected' : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
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
                        <p className="mt-1 text-gray-800 text-sm">{tweet}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-end">
              <button
                onClick={onCopy}
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
                onClick={onPostToTwitter}
                className="flex items-center text-sm px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                <Twitter className="h-4 w-4 mr-1" />
                Post to Twitter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TweetVariants
