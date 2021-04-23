/**
 * Determine whether or not two values are equal (===).
 *
 * @example
 * {{eq '3' 3}}    => false
 *
 * {{#if (eqw foo 'bar')}}
 *   Hello
 * {{/if}}
 *
 * @param {any} value1
 * @param {any} value2
 * @returns {boolean}
 */
export declare function eq(value1: any, value2: any): boolean;
/**
 * Determine whether or not two values are equal (==) i.e weak checking.
 *
 * @example
 * {{eqw '3' 3}}   => true
 *
 * {{#if (eqw foo 'bar')}}
 *   Hello
 * {{/if}}
 *
 * @param {any} value1
 * @param {any} value2
 * @returns {boolean}
 */
export declare function eqw(value1: any, value2: any): boolean;
