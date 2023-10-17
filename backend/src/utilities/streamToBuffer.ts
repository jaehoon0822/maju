import { Readable } from "stream";

interface StreamToBufferParams {
  stream: Readable;
}

export const streamToBuffer = async ({
  stream,
}: StreamToBufferParams): Promise<Buffer> => {
  return new Promise<Buffer>((res, rej) => {
    const _buffer: any[] = [];
    stream.on("data", (chunk) => _buffer.push(chunk));
    stream.on("end", () => res(Buffer.concat(_buffer)));
    stream.on("error", (err) => rej(`streamToBuffer: ${err}`));
  });
};
