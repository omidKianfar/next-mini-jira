import { Descendant, Text } from 'slate';
import { jsx } from 'slate-hyperscript';
import { AlignFormat, CustomText } from '../type';

export const Deserialize = (
  el: HTMLElement,
  markAttributes: Partial<CustomText> & { align?: AlignFormat } = {}
): Descendant[] | Descendant | null => {
  if (el.nodeType === window.Node.TEXT_NODE) {
    if (!el.textContent || el.textContent.trim() === '') return null;

    return jsx('text', markAttributes, el.textContent) as Text;
  } else if (el.nodeType !== window.Node.ELEMENT_NODE) {
    return null;
  }

  const element = el as HTMLElement;
  const nodeAttributes: any = { ...markAttributes };
  const style = element.getAttribute('style');

  if (style) {
    const styleAttributes = style
      .split(';')
      .reduce((acc: Record<string, string>, rule: string) => {
        const [key, value] = rule.split(':');

        if (key && value) acc[key.trim()] = value.trim();

        return acc;
      }, {});

    if (styleAttributes['font-family']) {
      nodeAttributes.fontFamily = styleAttributes['font-family'];
    }
    if (styleAttributes['color']) {
      nodeAttributes.color = styleAttributes['color'];
    }
    if (styleAttributes['background-color']) {
      nodeAttributes.backgroundColor = styleAttributes['background-color'];
    }
    if (styleAttributes['text-align']) {
      nodeAttributes.align = styleAttributes['text-align'] as AlignFormat;
    }
  }

  switch (element.nodeName) {
    case 'STRONG':
    case 'B':
      nodeAttributes.bold = true;
      break;

    case 'U':
      nodeAttributes.underline = true;
      break;

    case 'I':
    case 'EM':
      nodeAttributes.italic = true;
      break;

    case 'CODE':
      nodeAttributes.code = true;
      break;
  }

  const children = Array.from(element.childNodes)
    .map((node) => Deserialize(node as HTMLElement, nodeAttributes))
    .flat()
    .filter((n): n is Descendant => n !== null);

  if (children.length === 0) {
    const blockNames = [
      'P',
      'H1',
      'H2',
      'H3',
      'H4',
      'H5',
      'H6',
      'LI',
      'UL',
      'OL',
    ];

    if (
      blockNames.includes(element.nodeName) &&
      !['UL', 'OL'].includes(element.nodeName)
    ) {
      children.push(jsx('text', nodeAttributes, '') as Text);
    }
  }

  if (
    ['STRONG', 'B', 'U', 'I', 'EM', 'CODE', 'SPAN'].includes(element.nodeName)
  ) {
    return children;
  }

  switch (element.nodeName) {
    case 'BODY':
      return children;

    case 'BR':
      return null;

    case 'P':
      return jsx(
        'element',
        { type: 'paragraph', align: nodeAttributes.align },
        children
      );

    case 'H1':
      return jsx(
        'element',
        { type: 'headingOne', align: nodeAttributes.align },
        children
      );

    case 'H2':
      return jsx(
        'element',
        { type: 'headingTwo', align: nodeAttributes.align },
        children
      );

    case 'H3':
      return jsx(
        'element',
        { type: 'headingThree', align: nodeAttributes.align },
        children
      );

    case 'H4':
      return jsx(
        'element',
        { type: 'headingFour', align: nodeAttributes.align },
        children
      );

    case 'H5':
      return jsx(
        'element',
        { type: 'headingFive', align: nodeAttributes.align },
        children
      );

    case 'H6':
      return jsx(
        'element',
        { type: 'headingSix', align: nodeAttributes.align },
        children
      );

    case 'UL':
      return jsx(
        'element',
        { type: 'bulletedList', align: nodeAttributes.align },
        children
      );

    case 'OL':
      return jsx(
        'element',
        { type: 'numberedList', align: nodeAttributes.align },
        children
      );

    case 'LI':
      return jsx(
        'element',
        { type: 'listItem', align: nodeAttributes.align },
        children
      );

    default:
      return children;
  }
};
