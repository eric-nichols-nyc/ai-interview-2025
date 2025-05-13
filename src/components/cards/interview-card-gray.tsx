/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6DMrvuLZK54
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function InterviewCard() {
    return (
      <div className="bg-gradient-to-br from-[#8e9eab] to-[#eef2f3] p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Hi Mike, here's what's happening in your stores.</h1>
        <div className="flex justify-between items-center mb-6">
          <div className="px-4 py-2 border rounded-full border-gray-300 text-gray-500">may</div>
          <div className="px-4 py-2 border rounded-full border-gray-300 text-gray-500">jun</div>
          <div className="px-4 py-2 border rounded-full border-gray-300 text-gray-500">jul</div>
          <div className="px-4 py-2 border rounded-full border-gray-300 text-gray-500">aug</div>
          <div className="px-4 py-2 border rounded-full border-gray-300 text-gray-500">sep</div>
          <div className="px-4 py-2 bg-black text-white rounded-full">oct</div>
        </div>
        <p className="text-lg mb-2">
          This month your stores have sold <span className="font-bold">All Outlets</span>
        </p>
        <p className="text-4xl font-bold mb-1">$ 331,224.74</p>
        <p className="text-green-600">that's $132,569.46 more than this time last month!</p>
      </div>
    )
  }