import Image from "next/image";

import { cn } from "@/lib/utils";

export default function Screenshot({
  srcLight,
  srcDark,
  alt,
  width,
  height,
  className
}) {
  if (!srcDark) {
    return (
      <Image
        src={srcLight}
        alt={alt}
        width={width}
        height={height}
        className={className}
        unoptimized={srcLight.endsWith(".svg")} />
    );
  }

  return (
    <>
      <Image
        src={srcLight}
        alt={alt}
        width={width}
        height={height}
        className={cn(className, "block dark:hidden")}
        unoptimized={srcLight.endsWith(".svg")} />
      <Image
        src={srcDark}
        alt={alt}
        width={width}
        height={height}
        className={cn(className, "hidden dark:block")}
        unoptimized={srcDark.endsWith(".svg")} />
    </>
  );
}
