export const assertEmpty = (items: Array<any>, callbackIfSomeoneEmpty: Function = undefined) =>
  items.filter((i) => !i || (typeof i === "string" && i === "")).length > 0
    ? (callbackIfSomeoneEmpty && callbackIfSomeoneEmpty()) || true
    : false;

export const ifThenElse = (predicate: Boolean, cbTrue: Function, cbFalse: Function = undefined ) => 
  (predicate ? (cbTrue ? cbTrue() : true) : (cbFalse ? cbFalse() : false));

export const ifThen = (predicate: Boolean, cbTrue: Function) => 
  (predicate ? (cbTrue ? cbTrue() : true) : false);

export const ifThenElse2 = (predicate: Boolean, cbTrue: Function, cbFalse: Function = undefined ) => 
  (ifThen(predicate, cbTrue) || (cbFalse ? cbFalse() : false));

/*
Check if `obj` has only permitted `fields`
*/
export const checkFields = (obj: any, fields: Array<string>): Boolean => 
  (Object.keys(obj).every(e => fields.includes(e)));

export const arrayDiff = (arr1: Array<any>, arr2: Array<any>): Array<any> => {
  return arr1.filter(e => !arr2.includes(e))
}

export const arrayfy = (obj: any) => (Array.isArray(obj) ? obj : [obj]);
