import React from 'react'
import { Twitter, TrendingUp } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-yellow-400 shadow-md">
      <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-black p-2 rounded-full mr-3">
            <Twitter className="h-6 w-6 text-yellow-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">CZ Tweet Generator</h1>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-800 bg-yellow-300 px-4 py-2 rounded-full shadow-sm">
          <TrendingUp className="h-5 w-5" />
          <span className="font-medium">Tweet like the Binance founder</span>
        </div>
      </div>
    </header>
  )
}

export default Header
