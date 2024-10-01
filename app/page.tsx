import Form from "./_components/form";
import { History } from "./_components/history";

export default function Page() {
  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-b from-indigo-500/10 via-purple-500/10 to-pink-500/10">
      <header className="bg-white/60 backdrop-blur-xl p-4 border-b-[0.5px] border-slate-300 flex w-full justify-center">
        <h1 className="text-lg font-bold">คำนวณขนาดยาน้ำเด็ก</h1>
      </header>
      <main className="flex flex-col flex-1 p-4 gap-6 max-w-screen-sm mx-auto">
        <Form />
        <History />
      </main>
      <footer className="bg-white/60 px-4 py-0.5 text-sm">
        © 2024 Chanatkarn-Chatkanok-Thitikarn. All rights reserved.
      </footer>
    </div>
  );
}
