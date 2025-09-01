export const getKnobKey = (name: string, group?: string) => `${name}${group ? `~~${group}` : ''}`;

export const getKnobParamKey = (name: string, group?: string, index?: number) => `${name}${group ? `_${group}` : ''}${index ? `[${index}]` : ''}`;

export function shallowDiff<T extends Record<string, unknown>>(oldObj: T, newObj: T): {
  added: Partial<T>;
  removed: Partial<T>;
  changed: Partial<T>;
} {
  const added: Partial<T> = {};
  const removed: Partial<T> = {};
  const changed: Partial<T> = {};

  // Check for added or changed properties in newObj
  for (const key in newObj) {
    if (!(key in oldObj)) {
      added[key] = newObj[key];
    } else if (oldObj[key] !== newObj[key]) {
      changed[key] = newObj[key];
    }
  }

  // Check for removed properties in oldObj
  for (const key in oldObj) {
    if (!(key in newObj)) {
      removed[key] = oldObj[key];
    }
  }

  return { added, removed, changed };
}
