/**
 * Converts the given dollar amount to a formatted string
 * @param amount the amount to convert
 */
export function getMoneyString(amount: number): string {
  return `$${amount.toLocaleString('en-us', { maximumFractionDigits: 2 })}`;
}

/**
 * Converts the given date to a formatted string
 * @param date the date to convert
 */
export function getDateString(date: Date): string {
  return `${new Intl.DateTimeFormat('en-US').format(date)}`;
}