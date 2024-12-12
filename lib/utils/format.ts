export function formatNumber(value: number): string {
  if (!value && value !== 0) return '0';
  
  if (value === 0) return '0';
  
  if (value < 0.01) return '< 0.01';
  
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`;
  }
  
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }
  
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`;
  }
  
  return value.toFixed(2);
}
