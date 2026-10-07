import type { Metadata } from "next";
import LegalPage, { Block } from "@/components/LegalPage";
export const metadata: Metadata = { title: "Terms — Fermor" };
const blocks: Block[] = [
  ["Using this site", "You may use the calculators, tools and articles for your own personal, non-commercial use. Please don't misuse the site, attempt to disrupt it, or copy it in a way that suggests it is yours."],
  ["Not financial advice", "Everything here is for information and education. Calculators show illustrations based on the numbers you enter, and real returns, rates and costs vary and can be lower than shown or negative. Speak to a qualified professional before making financial decisions."],
  ["Sample data", "Dashboards, balances, goals and testimonials on this site are sample content to show how the product could look. They are not real accounts or real customers."],
  ["Accuracy", "We aim to keep formulas and explanations correct, and each calculator shows its working so you can check it. We can't guarantee that every result is error-free or suits your situation."],
  ["Third-party links", "Some links lead to other websites. We don't control their content and aren't responsible for it."],
  ["Liability", "To the extent the law allows, Fermor is not liable for losses that arise from relying on the information or results on this site."],
  ["Changes and governing law", "These terms may be updated, and the date above shows the latest version. They are governed by the laws of India."],
];
export default function Page() {
  return <LegalPage title="Terms" updated="7 October 2026" intro="These terms explain how you can use this site and what to keep in mind when you use the calculators and tools." blocks={blocks} />;
}
