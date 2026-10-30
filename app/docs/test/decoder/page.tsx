import type { Metadata } from "next";
import Link from "next/link";
import { Callout, H2, H3, InfoTable, Keys, Step, Steps, Ui } from "@/components/docs/content";
import { DocPage } from "@/components/docs/doc-page";

export const metadata: Metadata = {
  title: "Decoder",
  description: "Encode, decode and hash values, or chain several steps together.",
  alternates: { canonical: "/docs/test/decoder" },
  openGraph: { url: "/docs/test/decoder" },
};

export default function DecoderPage() {
  return (
    <DocPage href="/docs/test/decoder">
      <p>
        <Ui>Decoder</Ui> turns text between formats. Paste or type into the input, then encode or decode.
      </p>

      <H2 id="encode-decode">Encode and decode</H2>
      <p>
        The Encode and Decode lists cover URL, Base64, Base64URL, Hex, ASCII hex, Unicode escapes, HTML, Gzip (b64)
        and Deflate (b64), among others. <Ui>Smart decode</Ui> tries common formats for you.{" "}
        <Ui>JWT decode</Ui> splits a token into Header, Payload and Signature (it doesn&apos;t verify the signature).{" "}
        <Ui>Hash</Ui> covers MD5, SHA-1 and SHA-256.
      </p>
      <p>
        Switch between <Ui>Text</Ui> and <Ui>Hex</Ui> views. <Ui>Use as input ←</Ui> loads the current output back into
        the input.
      </p>

      <H2 id="chain">Chain</H2>
      <p>
        Build a pipeline: click <Ui>+ step</Ui>, pick an operation for each step, then <Ui>Run chain</Ui>.{" "}
        <Ui>Clear chain</Ui> removes every step. Results land in the <Ui>Workspace</Ui>; click one to load it as
        input, or <Ui>Clear workspace</Ui> to wipe them.
      </p>

      <H2 id="send-on">Send the result on</H2>
      <ul>
        <li><Ui>Send output → Fuzzer body</Ui> loads the output into the Fuzzer request body.</li>
        <li><Ui>Send output → Fuzzer payloads</Ui> loads each output line into Fuzzer payload set 1.</li>
      </ul>
    </DocPage>
  );
}
