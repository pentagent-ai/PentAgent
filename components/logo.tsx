import Image from "next/image";
import { withBase } from "@/lib/base-path";

// The desktop app's own mark and wordmark, so the site and the app read as one product.
export function Logo({ size = 26 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-ink">
      <Image
        src={withBase("/brand/pentagent-mark.png")}
        alt=""
        width={size}
        height={size}
        unoptimized
        className="shrink-0 select-none object-contain"
        draggable={false}
      />
      PentAgent
    </span>
  );
}
