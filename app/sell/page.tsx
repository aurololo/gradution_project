export default function SellPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-8">
      {/* Simple Header */}
      <h1 className="text-4xl font-bold mb-8">
        MY FIT - TEST DEPLOY
      </h1>

      {/* A Basic Card (No custom utils needed) */}
      <div className="flex items-start gap-4 p-6 rounded-2xl border border-gray-800 bg-gray-900 max-w-md w-full">
        {/* Icon Placeholder */}
        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
        </div>

        {/* Text Content */}
        <div>
          <h2 className="font-bold text-lg">Standard Delivery</h2>
          <p className="text-gray-400 text-sm">Get your order in 5-7 business days</p>
        </div>
      </div>
    </div>
  )
}
