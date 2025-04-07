declare module 'encoding-japanese' {
  export function stringToCode(str: string): number[];
  export function convert(data: number[], options: { to: string; from: string }): number[];
}
