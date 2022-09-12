export const objectKeys = <Obj extends Object>(obj: Obj): (keyof Obj)[] => {
  return Object.keys(obj) as (keyof Obj)[];
};

export const objectValues = <Obj extends Object>(
  obj: Obj
): Obj[keyof Obj][] => {
  return Object.values(obj) as Obj[keyof Obj][];
};
