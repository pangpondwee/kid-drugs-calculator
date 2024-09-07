import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10">
      <header className="bg-white/60 backdrop-blur-xl p-4 border-b-[0.5px] border-slate-300 flex w-full justify-center">
        <h1 className="text-lg font-bold">คำนวณขนาดยาน้ำเด็ก</h1>
      </header>
      <main className="flex flex-col flex-1 p-4 gap-6">
        <div className="flex flex-col p-4 gap-6 bg-white/95 rounded-xl">
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="weight">น้ำหนัก</Label>
            <Input
              type="number"
              inputMode="numeric"
              id="weight"
              placeholder="0.00"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label>ยาที่ต้องการใช้</Label>
            <Button type="button" variant={"outline"}>
              <p>เลือกยาที่ต้องการใช้</p>
            </Button>
          </div>
          <Button type="submit">คำนวณ</Button>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex gap-4 items-baseline">
            <h2 className="text-xl font-bold w-full">ประวัติการคำนวณ</h2>
            <Button variant={"link"}>ล้างทั้งหมด</Button>
          </div>
          <div className="flex flex-1 justify-center items-center">
            <p className="text-base font-bold text-slate-600">
              ยังไม่มีประวัติ
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
