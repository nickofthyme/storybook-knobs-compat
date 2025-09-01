import { array } from './array';
import { boolean } from './boolean';
import { color } from './color';
import { date } from './date';
import { files } from './files';
import { number } from './number';
import { object } from './object';
import { optionsKnob } from './options';
import { radios } from './radios';
import { select } from './select';
import { text } from './text';
import type { KnobType } from './types';
import type { Knob, Mutable } from './types/type-defs.';

export const knob = <T extends KnobType, V = Mutable<Knob<T>['value']>>(name: string, options: Knob<T>): V => {
  switch (options.type) {
    case 'text':
      return text(name, options.value, options.groupId) as V;
    case 'boolean':
      return boolean(name, options.value, options.groupId) as V;
    case 'number':
      return number(name, options.value, options, options.groupId) as V;
    case 'color':
      return color(name, options.value, options.groupId) as V;
    case 'object':
      return object(name, options.value, options.groupId) as V;
    case 'select':
      return select(name, options.value, options.groupId) as V;
    case 'radios':
      return radios(name, options.value, options.groupId) as V;
    case 'array':
      return array(name, options.value, options.groupId) as V;
    case 'date':
      return date(name, options.value, options.groupId) as V;
    case 'files':
      return files(name, options.value, options.value, options.groupId) as V;
    case 'options':
      return optionsKnob(name, options.value, options.groupId) as V;
    default:
      throw new Error(`Unknown knob type: ${options.type}`);
  }
};
