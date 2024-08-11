/**
 * Take a list of items type T and join the none empty string values.
 * @param strings
 * @param delimiter
 */
export function joinStrings<T>(strings: T[], delimiter = ' '): string {
  return strings.filter((s) => s && typeof s === 'string').join(delimiter);
}
