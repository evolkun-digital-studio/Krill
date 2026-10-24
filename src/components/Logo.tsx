import logo from "@/assets/KINIKHRURAL.svg";

export function Logo({ inverted = false, className = "h-14 md:h-16" }: { inverted?: boolean; className?: string }) {
  return (
    <img
      src={logo}
      alt="KRIL, Kinikh Rural Indigenous Livelihood"
      className={`w-auto transition-[filter] duration-500 ${inverted ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}
