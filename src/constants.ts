export const ADDON_ID = 'addon-knobs';
export const PANEL_ID = `${ADDON_ID}/panel`;
export const KEY = `knobs`;

export const buttonType = Symbol('button');

export const enum Events {
  Set = `${ADDON_ID}/set`,
  UpdateValue = `${ADDON_ID}/update-value`,
  Sync = `${ADDON_ID}/sync`,
  Call = `${ADDON_ID}/call`,
}
