import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

export default function LinkImage({
  src,
  alt,
  height,
  width,
  className,
  ...props
}: {
  src: string;
  alt?: string;
  height?: number;
  width?: number;
  className?: string;
  props?: ImageProps;
}) {
  return (
    <Link
      href={src}
      target="_blank"
      className="relative h-[250px] w-[200px] flex-shrink-0 overflow-hidden rounded-xl"
    >
      <Image
        src={src}
        alt={alt || "Post Image"}
        width={width || 200}
        height={height || 250}
        placeholder="blur"
        blurDataURL={"/placeholder.jpg"}
        className={cn("h-full w-full object-cover", className)}
        {...props}
      />
    </Link>
  );
}
