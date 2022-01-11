export const DESCEND_ORDER: 'descend' | 'ascend' | null | undefined = 'descend';

export function dateSorter(a: Date, b: Date): number {
  return new Date(a).valueOf() - new Date(b).valueOf();
}
