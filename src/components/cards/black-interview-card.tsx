import { Card, CardHeader, CardContent } from "@/components/ui/card"
export default function BlackInterviewCard() {
  return (
    <Card className="black-bg p-8 rounded-lg shadow-lg max-w-2xl mx-auto border-2 border-white/20">
      <CardHeader>
        <h1 className="text-3xl font-bold mb-4 text-white">Hi Mike, here&apos;s your update.</h1>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
        <div className="px-4 py-2 border rounded-full border-zinc-700">may</div>
        <div className="px-4 py-2 border rounded-full border-zinc-700">jun</div>
        <div className="px-4 py-2 border rounded-full border-zinc-700">jul</div>
        <div className="px-4 py-2 border rounded-full border-zinc-700">aug</div>
        <div className="px-4 py-2 border rounded-full border-zinc-700">sep</div>
        <div className="px-4 py-2 bg-white text-black rounded-full font-bold">oct</div>
      </div>
      <p className="text-lg mb-2 text-zinc-100">
        This month your stores have sold <span className="font-bold text-white">All Outlets</span>
      </p>
      <p className="text-4xl font-bold mb-1 text-white">$ 331,224.74</p>
      <p className="text-green-400">that&apos;s $132,569.46 more than this time last month!</p>
      </CardContent>
    </Card>
  )
}
