import NavBar from "@/components/NavBar";
import SignMessage from "@/components/SignMessage";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-6">
      <NavBar />
      <main className="flex items-center justify-center max-w-6xl h-full mx-auto">
        <SignMessage />
      </main>
    </div>
  );
}
