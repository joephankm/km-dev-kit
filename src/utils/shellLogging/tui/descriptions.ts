// Utility for drawing a titled description frame with label-value rows.

import box from '../box';
import type { Content } from '../types';

type DescriptionRow = { label: string; value: Content };
type DescriptionRows = DescriptionRow[] | Record<string, string | number | undefined | null>;
type DescriptionSection = { title?: string; rows: DescriptionRows; wrapText?: boolean };
type DescriptionWidth = 'small' | 'middle' | 'large' | 'auto';

export type DescriptionParams = {
  data: DescriptionSection | DescriptionSection[];
  width?: DescriptionWidth;
};

function isDescriptionParams(
  input: DescriptionParams | DescriptionSection | DescriptionSection[]
): input is DescriptionParams {
  return !Array.isArray(input) && 'data' in input;
}

function normalizeItems(items: DescriptionRows): DescriptionRow[] {
  if (Array.isArray(items)) return items;
  return Object.entries(items).map(([label, value]) => ({ label, value }));
}

// Border width is 7
const PRESET_WIDTHS: Record<Exclude<DescriptionWidth, 'auto'>, { label: number; value: number }> = {
  small: { label: 16, value: 36 }, // total: 60
  middle: { label: 28, value: 54 }, // total: 90
  large: { label: 44, value: 68 }, // total: 120
};

/**
 * Prints one or more titled description frames with label–value rows.
 */
export default function descriptions(input: DescriptionParams | DescriptionSection | DescriptionSection[]): void {
  const { data, width = 'small' } = isDescriptionParams(input) ? input : { data: input };
  const sections = (Array.isArray(data) ? data : [data]).map(({ rows, ...rest }) => ({
    rows: normalizeItems(rows),
    ...rest,
  }));
  const allRows = sections.flatMap(s => s.rows);

  let labelWidth: number;
  let valueWidth: number;

  if (width === 'auto') {
    const maxLabel = allRows.length > 0 ? Math.max(...allRows.map(r => r.label.length)) : 0;
    const maxValue = allRows.length > 0 ? Math.max(...allRows.map(r => String(r.value).length)) : 0;
    labelWidth = maxLabel + 2;
    valueWidth = maxValue + 1;
  } else {
    ({ label: labelWidth, value: valueWidth } = PRESET_WIDTHS[width]);
  }

  for (let s = 0; s < sections.length; s++) {
    const { title, rows, wrapText } = sections[s];
    const isFirst = s === 0;
    const isLast = s === sections.length - 1;

    if (isFirst) {
      box.top(title ? { width: labelWidth, span: true } : labelWidth, valueWidth);
    } else {
      box.mid(title ? { width: labelWidth, spanBelow: true } : labelWidth, valueWidth);
    }

    if (title) {
      const labelCol = { width: labelWidth, span: true, spanAbove: true } as const;
      box.row({ ...labelCol, content: title, style: 'title' }, valueWidth);
      box.mid(labelCol, valueWidth);
    }

    for (const { label, value } of rows) {
      if (wrapText) {
        const str = value == null ? '' : String(value);
        const chunks =
          str.length > valueWidth
            ? Array.from({ length: Math.ceil(str.length / valueWidth) }, (_, i) =>
                str.slice(i * valueWidth, (i + 1) * valueWidth)
              )
            : [str];
        chunks.forEach((chunk, i) => {
          box.row(i === 0 ? { width: labelWidth, content: label, style: 'label' } : { width: labelWidth }, {
            width: valueWidth,
            content: chunk,
          });
        });
      } else {
        box.row({ width: labelWidth, content: label, style: 'label' }, { width: valueWidth, content: value });
      }
    }

    if (isLast) box.bot(labelWidth, valueWidth);
  }
}
