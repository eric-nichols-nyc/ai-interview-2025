/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6DMrvuLZK54
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function RedInterviewCard() {
    return (
      <div className="bg-gradient-to-br from-red-600 to-red-400 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-darkest-red">Hi Mike, here&apos;s what&apos;s happening in your stores.</h1>
        <div className="flex justify-between items-center mb-6">
          <div className="px-4 py-2 border rounded-full border-red-200 text-darkest-red">may</div>
          <div className="px-4 py-2 border rounded-full border-red-200 text-darkest-red">jun</div>
          <div className="px-4 py-2 border rounded-full border-red-200 text-darkest-red">jul</div>
          <div className="px-4 py-2 border rounded-full border-red-200 text-darkest-red">aug</div>
          <div className="px-4 py-2 border rounded-full border-red-200 text-darkest-red">sep</div>
          <div className="px-4 py-2 bg-white text-red-700 rounded-full font-bold">oct</div>
        </div>
        <p className="text-lg mb-2 text-darkest-red">
          This month your stores have sold <span className="font-bold text-darkest-red">All Outlets</span>
        </p>
        <p className="text-4xl font-bold mb-1 text-darkest-red">$ 331,224.74</p>
        <p className="text-darkest-red">that&apos;s $132,569.46 more than this time last month!</p>
      </div>
    )
  }