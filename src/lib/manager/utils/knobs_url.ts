import { getKnobKey } from './helpers';
import type { KnobConfig, KnobKey, KnobsState } from '../../types';

interface KnobInfo<T = string | string[]> {
  value: T;
  index?: number;
  group?: string;
}

export type KnobsFromUrl = Record<KnobKey, string | string[]>;

export function buildKnobParamsFromKnobs(state: KnobsState, knobs: Record<KnobKey, KnobConfig>): Record<string, string> {
  const knobParams: Record<string, string> = {};
  for (const [k, v] of Object.entries(state)) {
    const knob = knobs[k];

    if (!knob) continue;

    const group = knob.options.table?.subcategory;
    const groupKey = group ? `_${group}` : '';
    const key = `knob-${knob.options.name}${groupKey}`;

    if (Array.isArray(v)) {
      if (v.length === 0) {
        knobParams[`${key}[]`] = '';
      } else {
        v.forEach((av, i) => {
          knobParams[`${key}[${i}]`] = typeof av === 'string' ? av : JSON.stringify(av);
        });
      }
    } else {
      knobParams[key] = typeof v === 'string' ? v : JSON.stringify(v);
    }
  }

  return knobParams;
}

const knobRegExp = /^knob-(.+?)(?:_(.+?))?(?:\[(\d*?)\])?$/;

export function getKnobsFromParams(params: Iterable<[string, string | undefined]>): KnobsFromUrl {
  const knobsInfo = getKnobsInfoFromParams(params);

  const knobParams: KnobsFromUrl = {};

  for (const [name, { value, group }] of Object.entries(knobsInfo)) {
    const key = getKnobKey(name, group);
    knobParams[key] = value;
  }

  return knobParams;
}

export function getKnobsFromUrl(queryString: string): Record<string, KnobInfo> {
  const params = new URLSearchParams(queryString);

  return getKnobsInfoFromParams(params.entries());
}

export function getKnobsInfoFromParams(params: Iterable<[string, string | undefined]>): Record<string, KnobInfo> {
  const knobs: Record<string, KnobInfo> = {};
  const arrayKnobs: Record<string, KnobInfo<string[]>> = {};

  for (const [k, v] of params) {
    const [, name, group, indexStr] = knobRegExp.exec(k) ?? [];
    if (name && v !== undefined) {
      const key = getKnobKey(name, group);
      const index = parseInt(indexStr ?? '', 10);

      if (index >= 0) {
        const arr = arrayKnobs[key]?.value ?? [];
        arr[index] = v;
        arrayKnobs[key] = {
          value: arr,
          ...(group && { group }),
        };
      } else if (indexStr === '' && v === '') {
        // empty array case
        knobs[key] = {
          value: [],
          ...(group && { group }),
        };
      } else {
        knobs[key] = {
          value: v,
          ...(group && { group }),
        };
      }
    }
  }

  for (const [k, info] of Object.entries(arrayKnobs)) {
    knobs[k] = {
      ...info,
      value: info.value,
    };
  }

  return knobs;
}

// const kUrl = 'http://localhost:9002/?path=/story/axes--fit-domain&globals=toggles.showHeader:true;toggles.showChartTitle:false;toggles.showChartDescription:false;toggles.showChartBoundary:false;theme:light&knob-SeriesType=line&knob-dataset=both&knob-fit Y domain to data=true&knob-Specs to fit (yDomain)[0]=theshold&knob-Specs to fit (yDomain)[1]=rect&knob-enableHistogramMode=true&knob-stacked=true&knob-constrain padding=true&knob-domain padding=0.1&knob-number of series=1&knob-Domain padding unit=domainRatio&knob-thesholds - line_groupp[0]=50&knob-thesholds - line_groupp[1]=70&knob-theshold - rect={"y0":100,"y1":null}';
// // const kUrl = 'https://elastic.github.io/elastic-charts/storybook/?path=/story/scales--log-scale-options&globals=toggles.showHeader:true;toggles.showChartTitle:false;toggles.showChartDescription:false;toggles.showChartBoundary:false;theme:light&knob-Domain padding unit=domainRatio&knob-SeriesType=line&knob-Specs to fit (yDomain)=theshold,rect&knob-constrain padding=true&knob-dataset=both&knob-debug=true&knob-debugState=true&knob-domain padding=0.1&knob-enableHistogramMode=true&knob-fit Y domain to data=true&knob-labelFormat left=$ 0,0&knob-number of groups=1&knob-number of series=1&knob-show area=true&knob-show bar=true&knob-show line=true&knob-showOverlappingTicks bottom axis=true&knob-stacked=true&knob-theshold - rect={"y0":100,"y1":null}&knob-thesholds - line=200&knob-tickFormat bottom=0.0000&knob-tickFormat left= 0,0[.]00&knob-Rows in dataset=11&knob-Use default limit_Y - Axis=&knob-Log min limit_Y - Axis=1&knob-Log base_Y - Axis=common&knob-Fit domain_Y - Axis=true&knob-Data type_Y - Axis=upDown&knob-Use negative values_Y - Axis=&knob-Scale Type_Y - Axis=log&knob-Padding_Y - Axis=0&knob-Use default limit_X - Axis=true&knob-Log min limit_X - Axis=1&knob-Log base_X - Axis=common&knob-Data type_X - Axis=increasing&knob-Use negative values_X - Axis=&knob-Scale Type_X - Axis=log&knob-Series Type=line&knob-Curve type=0';
// // const kUrl = '?path=/story/annotations-rects--with-group-id&knob-enable%20annotation=true&knob-Annotation%20groupId=none&knob-x0=5&knob-x1=10&knob-enable%20y0%20and%20y1%20values=true&knob-y0=0&knob-y1=3';
// // const kUrl = 'knob-debug=&knob-chartRotation=0&knob-x0 coordinate=0&knob-x1 coordinate=none';
// console.log(getKnobsFromUrl(kUrl));

// // notes false is ''
// // empty string is ''
// // groups are split by _ (knob-Use default limit_Y - Axis)
