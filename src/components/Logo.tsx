import Image from "next/image";
import logo from "@/assets/KINIKHRURAL.svg";

export function Logo({ inverted = false, className = "h-14 md:h-16" }: { inverted?: boolean; className?: string }) {
  return (
    <Image
      src={logo}
      alt="KRIL, Kinikh Rural Indigenous Livelihood"
      unoptimized
      className={`w-auto transition-[filter] duration-500 ${inverted ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}
