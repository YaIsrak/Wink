import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Image src={"/logo-light.png"} alt="" height={100} width={100} />
    </div>
  );
}
