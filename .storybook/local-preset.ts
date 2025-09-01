/**
 * to load the built addon in this test Storybook
 */
export function previewAnnotations(entry = []) {
  return [...entry, require.resolve('../src/preview.ts')];
}

export function managerEntries(entry = []) {
  return [...entry, require.resolve('../src/manager.tsx')];
}
