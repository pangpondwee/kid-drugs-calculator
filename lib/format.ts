export function formatNumber(number: number) {
  return Intl.NumberFormat('th-TH', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(number);
}