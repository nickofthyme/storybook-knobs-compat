import type { KnobsFromUrl } from './knobs_url';
import type { KnobConfig, KnobKey, KnobsState } from '../../types';

export function parseKnobsFromConfigs(knobs: KnobsFromUrl, configs: Record<KnobKey, KnobConfig>): KnobsState {
  const params: KnobsState = {};

  for (const [key, valueStr] of Object.entries(knobs)) {
    const config = configs[key];
    const value = parseValue(valueStr, config);

    if (value !== undefined) {
      params[key] = value;
    }
  }

  return params;
}

function parseValue(value: string | string[], config?: KnobConfig) {
  if (typeof (config?.options.control) !== 'object' || !config.options.control.type) return;

  if (Array.isArray(value)) {
    switch (config.options.control.type) {
      case 'object':
      case 'file':
      case 'check':
      case 'inline-check':
      case 'multi-select':
        return value;
      case 'select':
      case 'radio':
      case 'inline-radio':
        return value[0]; // select allows passing array or single value
      default:
        return;
    }
  }

  switch (config.options.control.type) {
    case 'object':
      try {
        return JSON.parse(value);
      } catch (error) {
        console.error(error);
        return;
      }
    case 'boolean':
      return value === 'true';
    case 'text':
    case 'color':
      return value;
    case 'number':
    case 'range':
      try {
        return parseFloat(value);
      } catch (error) {
        console.error(error);
        return;
      }
    case 'date':
      try {
        return parseInt(value, 10);
      } catch (error) {
        console.error(error);
        return;
      }
    default:
      return;
  }
}
