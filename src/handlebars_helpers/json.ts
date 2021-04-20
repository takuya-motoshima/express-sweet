/**
 * JSON encoding.
 *
 * @example
 * {{{json value}}}
 */
export default function(value: any, replacer?: any, space?: string): string {
  return JSON.stringify(value, replacer, space);
}