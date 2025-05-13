export default function GoldInterviewCard() {
  return (
    <div className="bg-gradient-to-br from-[#7a183a] to-[#2a0a18] p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-rose-300">Hi Mike, here&apos;s your burgundy update.</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="px-4 py-2 border rounded-full border-[#a23a5a] text-rose-300 ">may</div>
        <div className="px-4 py-2 border rounded-full border-[#a23a5a] text-rose-200">jun</div>
        <div className="px-4 py-2 border rounded-full border-[#a23a5a] text-rose-200">jul</div>
        <div className="px-4 py-2 border rounded-full border-[#a23a5a] text-rose-200">aug</div>
        <div className="px-4 py-2 border rounded-full border-[#a23a5a] text-rose-200">sep</div>
        <div className="px-4 py-2 bg-white text-[#7a183a] rounded-full font-bold">oct</div>
      </div>
      <p className="text-lg mb-2 text-rose-100">
        This month your stores have sold <span className="font-bold text-rose-100">All Outlets</span>
      </p>
      <p className="text-4xl font-bold mb-1 text-rose-300">$ 331,224.74</p>
      <p className="text-rose-100">that&apos;s $132,569.46 more than this time last month!</p>
    </div>
  )
}
