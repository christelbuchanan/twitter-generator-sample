import { useState } from 'react'
import './index.css'
import Header from './components/Header'
import TweetForm from './components/TweetForm'
import TweetDisplay from './components/TweetDisplay'
import ExampleTweets from './components/ExampleTweets'
import PhilosophyQuote from './components/PhilosophyQuote'
import { generateTweet } from './utils/tweetGenerator'

function App() {
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('informative')
  const [length, setLength] = useState('medium')
  const [tweet, setTweet] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [useAI, setUseAI] = useState(true)
  
  const handleGenerate = async () => {
    if (!topic.trim()) return
    
    setIsGenerating(true)
    try {
      const generatedTweet = await generateTweet(topic, tone, length, useAI)
      setTweet(generatedTweet)
    } catch (error) {
      console.error('Error generating tweet:', error)
      // If there's an error with AI generation, try the fallback
      if (useAI) {
        try {
          const fallbackTweet = await generateTweet(topic, tone, length, false)
          setTweet(fallbackTweet)
        } catch (fallbackError) {
          console.error('Error with fallback generation:', fallbackError)
        }
      }
    } finally {
      setIsGenerating(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <TweetForm 
              topic={topic}
              setTopic={setTopic}
              tone={tone}
              setTone={setTone}
              length={length}
              setLength={setLength}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              useAI={useAI}
              setUseAI={setUseAI}
            />
            
            <div className="mt-8">
              <PhilosophyQuote />
            </div>
          </div>
          
          <div>
            <TweetDisplay 
              tweet={tweet} 
              isLoading={isGenerating}
              onRegenerate={handleGenerate}
            />
            
            <div className="mt-8">
              <ExampleTweets />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>CZ Tweet Generator - A tool for generating tweets in the style of Changpeng Zhao</p>
          <p className="text-sm mt-2 text-gray-400">
            This is a demonstration project and is not affiliated with Binance or CZ.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
