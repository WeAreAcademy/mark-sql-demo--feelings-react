function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function badShuffle<T>(arr: T[]): T[] {
  return [...arr].sort((a, b) => (Math.random() < 0.5 ? -1 : 1));
}
export { pick, badShuffle };
