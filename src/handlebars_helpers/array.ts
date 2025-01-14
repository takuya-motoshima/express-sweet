/**
 * Finds an object in an array based on the specified field name and value.
 * @param {Array<{[key: string]: any}>} array The array of objects to search.
 * @param {string} fieldName The name of the field to search.
 * @param {*} fieldValue The value to search for.
 * @return {object|null} The first object in the array that matches the criteria, or null if no match is found.
 * @example
 * {{!-- 
 *   items is an array of objects: [{id: 123, name: 'Item A'}, {id: 456, name: 'Item B'}]
 *   This code will output: "Item A" 
 * --}}
 * {{#each items}}
 *   {{#if (eq id 123)}}
 *     {{lookup (findObjectInArray ../items 'id' id) 'name'}}
 *   {{/if}}
 * {{/each}}
 */
export const findObjectInArray = (array: Array<{[key: string]: any}>, fieldName: string, fieldValue: any): object|null => {
  if (!array || !fieldName || fieldValue === undefined)
    return null;
  return array.find(obj => obj[fieldName] === fieldValue) ?? null; 
}