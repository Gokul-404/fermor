import type { Metadata } from "next";
import LegalPage, { Block } from "@/components/LegalPage";
export const metadata: Metadata = { title: "Privacy — Fermor" };
const blocks: Block[] = [
  ["What stays on your device", "The calculators and Fermor Bot run in your browser. The numbers you type in, such as a monthly investment or a loan amount, are used to show you a result and are not sent to a server."],
  ["What we collect", "In this version of the site: nothing. There are no accounts, no sign-up forms, no advertising, and no analytics or tracking cookies. The dashboard figures you see are sample data, not anyone's real finances."],
  ["Fonts and hosting", "The Inter typeface is served from this site, so your browser does not contact a font provider. Like any web host, the host may keep basic server logs, such as IP address and requested page, for security and reliability."],
  ["Links to other sites", "Articles under Insights open on other organisations' websites. Those sites have their own privacy practices, and this policy does not cover them."],
  ["If this changes", "If accounts, saved calculations or analytics are added later, this page will be updated first and will say what is collected, why, and how to delete it."],
  ["Questions", "This is a concept build. For the live product and its current policies, visit fermor.in."],
];
export default function Page() {
  return <LegalPage title="Privacy" updated="7 October 2026" intro="Your financial information should stay under your control. This page explains, in plain words, what this site does and does not do with it." blocks={blocks} />;
}
