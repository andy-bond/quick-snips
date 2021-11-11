export function randomString(length: number = 15): string {
  const hash = Array(15)
    .fill(null)
    .map(() => Math.random().toString(36).substr(2))
    .join('');
  return hash.substr(0, length);
}
