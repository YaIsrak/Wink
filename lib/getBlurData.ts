import { getPlaiceholder } from "plaiceholder";

export async function getBlurData(imageSrc: string) {
  const buffer = await fetch(imageSrc).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );

  const data = await getPlaiceholder(buffer);

  return data;
}
