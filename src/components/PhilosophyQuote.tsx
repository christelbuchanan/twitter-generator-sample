import React, { useState, useEffect } from 'react'
import { BookOpen } from 'lucide-react'

const PhilosophyQuote: React.FC = () => {
  const [quote, setQuote] = useState({ text: '', author: '' })
  
  const techPhilosophyQuotes = [
    {
      text: "We can only see a short distance ahead, but we can see plenty there that needs to be done.",
      author: "Alan Turing"
    },
    {
      text: "Sometimes it is the people no one can imagine anything of who do the things no one can imagine.",
      author: "Alan Turing"
    },
    {
      text: "A computer would deserve to be called intelligent if it could deceive a human into believing that it was human.",
      author: "Alan Turing"
    },
    {
      text: "The blockchain does one thing: It replaces third-party trust with mathematical proof that something happened.",
      author: "Adam Back"
    },
    {
      text: "The computer was born to solve problems that did not exist before.",
      author: "Bill Gates"
    },
    {
      text: "Cryptography shifts the balance of power from those with a monopoly on violence to those who comprehend mathematics and security design.",
      author: "Jacob Appelbaum"
    },
    {
      text: "Bitcoin is a remarkable cryptographic achievement. The ability to create something which is not duplicable in the digital world has enormous value.",
      author: "Eric Schmidt"
    },
    {
      text: "The most profound technologies are those that disappear. They weave themselves into the fabric of everyday life until they are indistinguishable from it.",
      author: "Mark Weiser"
    },
    {
      text: "Technology is best when it brings people together.",
      author: "Matt Mullenweg"
    },
    {
      text: "It's not a faith in technology. It's faith in people.",
      author: "Steve Jobs"
    },
    {
      text: "The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life.",
      author: "Bill Gates"
    },
    {
      text: "The great myth of our times is that technology is communication.",
      author: "Libby Larsen"
    },
    {
      text: "The first rule of any technology used in a business is that automation applied to an efficient operation will magnify the efficiency. The second is that automation applied to an inefficient operation will magnify the inefficiency.",
      author: "Bill Gates"
    }
  ]
  
  useEffect(() => {
    const randomQuote = techPhilosophyQuotes[Math.floor(Math.random() * techPhilosophyQuotes.length)]
    setQuote(randomQuote)
  }, [])
  
  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
        <BookOpen className="h-5 w-5 mr-2 text-yellow-500" />
        Tech Philosophy
      </h3>
      
      <div className="philosophy-quote text-gray-700 mb-2">
        {quote.text}
      </div>
      
      <p className="text-right text-sm font-medium text-gray-600">
        — {quote.author}
      </p>
    </div>
  )
}

export default PhilosophyQuote
