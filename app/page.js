import Hero from "@/components/Hero";
import {
  andersonGrotesk,
  andersonGroteskBold,
  andersonGroteskLight,
  andersonGroteskUltraBold,
  urbanist,
} from "@/utils";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-auto w-full flex-col items-center relative overflow-x-hidden">
      <Hero />
    </main>
  );
}
