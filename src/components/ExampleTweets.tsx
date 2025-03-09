import React from 'react'

const ExampleTweets: React.FC = () => {
  const exampleTweets = [
    {
      text: "Simple. Blockchain technology is about giving users control over their own assets. Not your keys, not your coins. We continue to build tools that empower users. #BUIDL 🔶",
      date: "2 days ago"
    },
    {
      text: "Market volatility is normal in crypto. Focus on building real value, not short-term price movements. The projects that survive bear markets are those solving real problems. Long term thinking. 💪",
      date: "1 week ago"
    },
    {
      text: "Security is our top priority. Always enable 2FA, use a hardware wallet for large holdings, and stay vigilant. Funds are SAFU. 🛡️",
      date: "3 weeks ago"
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Example CZ Tweets</h2>
      
      <div className="space-y-4">
        {exampleTweets.map((tweet, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
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
                  <span className="text-gray-400 ml-2 text-xs">· {tweet.date}</span>
                </div>
                <p className="mt-1 text-gray-800 text-sm">{tweet.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExampleTweets
