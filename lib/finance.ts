export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

export const compact = (n: number) => {
  if (Math.abs(n) >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (Math.abs(n) >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return inr(n);
};

/** Future value of a monthly SIP (end-of-month deposits, monthly compounding). */
export function project(monthly: number, years: number, annualPct: number) {
  const n = Math.round(years * 12);
  const r = annualPct / 100 / 12;
  const fv = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r);
  const contributions = monthly * n;
  return { n, r, fv, contributions, growth: fv - contributions };
}

/** Equated Monthly Installment (EMI) calculation */
export function calculateEMI(principal: number, annualRatePct: number, years: number) {
  const n = Math.max(1, Math.round(years * 12));
  const r = annualRatePct / 100 / 12;
  const emi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalAmount = emi * n;
  const totalInterest = Math.max(0, totalAmount - principal);
  const principalShare = totalAmount > 0 ? (principal / totalAmount) * 100 : 100;
  const interestShare = totalAmount > 0 ? (totalInterest / totalAmount) * 100 : 0;
  return {
    n,
    monthlyEMI: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalAmount: Math.round(totalAmount),
    principalShare,
    interestShare,
  };
}

/** Stocks & Portfolio Growth calculation (Lump sum + monthly SIP) */
export function calculateStockReturns(
  initialAmount: number,
  monthlyAmount: number,
  annualReturnPct: number,
  years: number
) {
  const n = Math.max(1, Math.round(years * 12));
  const r = annualReturnPct / 100 / 12;
  const lumpFv = r === 0 ? initialAmount : initialAmount * Math.pow(1 + r, n);
  const sipFv = r === 0 ? monthlyAmount * n : monthlyAmount * ((Math.pow(1 + r, n) - 1) / r);
  const totalFv = lumpFv + sipFv;
  const totalInvested = initialAmount + monthlyAmount * n;
  const totalReturns = Math.max(0, totalFv - totalInvested);
  const investedShare = totalFv > 0 ? (totalInvested / totalFv) * 100 : 100;
  const growthShare = totalFv > 0 ? (totalReturns / totalFv) * 100 : 0;
  const multiplier = totalInvested > 0 ? totalFv / totalInvested : 1;
  const roiPct = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;

  return {
    n,
    totalFv: Math.round(totalFv),
    totalInvested: Math.round(totalInvested),
    totalReturns: Math.round(totalReturns),
    investedShare,
    growthShare,
    multiplier,
    roiPct,
  };
}

