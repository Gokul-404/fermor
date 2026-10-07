import Section, { H2, Eyebrow } from "./Section";
import DashboardPreview from "./DashboardPreview";
export default function DashboardSection() {
  return (
    <Section id="product">
      <H2>One clear view of your financial life.</H2>
      <div className="mt-12"><DashboardPreview full /></div>
      <p className="mt-4 text-sm text-muted">Figures shown are sample data for illustration.</p>
    </Section>
  );
}
