/**
  * Return true if `val` is a non-empty string.
  *
  * @param  {any} `val` The value to check
  * @return {boolean}
  */
export default (value: any): boolean => {
  return typeof value === 'string' && value !== '';
}