import type { Metadata } from "next";
import LegalPage, { Block } from "@/components/LegalPage";
export const metadata: Metadata = { title: "About — Fermor" };
const blocks: Block[] = [
  ["What Fermor is for", "Most money tools are built to sell you a product or bury you in ads. Fermor is built to help you understand the numbers behind a decision, whether that is a loan, a SIP or your monthly spending."],
  ["How we approach it", "Show the working, not just the answer. Keep tools open to use without signing in. Keep the language plain, and design for the phone first."],
  ["About this page", "This homepage is an independent redesign concept made for a frontend assignment. It is not the official Fermor site. For the real product, visit fermor.in."],
];
export default function Page() {
  return <LegalPage title="About" intro="Fermor helps people understand their money with clear numbers and plain language." blocks={blocks} />;
}
