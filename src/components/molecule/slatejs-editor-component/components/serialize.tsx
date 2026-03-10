import { Element, Text, Node, escapeHTML } from '../../imports';
import { CustomElement, CustomText } from '../type';

export const Serialize = (node: Node): string => {
  if (Text.isText(node)) {
    let string = escapeHTML(node.text);
    const textNode = node as CustomText;

    if (textNode.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (textNode.italic) {
      string = `<em>${string}</em>`;
    }
    if (textNode.underline) {
      string = `<u>${string}</u>`;
    }
    if (textNode.code) {
      string = `<code>${string}</code>`;
    }
    if (textNode.fontFamily || textNode.color || textNode.backgroundColor) {
      let styleAttributes = '';

      if (textNode.fontFamily) {
        styleAttributes += `font-family: ${textNode.fontFamily};`;
      }
      if (textNode.color) {
        styleAttributes += `color: ${textNode.color};`;
      }
      if (textNode.backgroundColor) {
        styleAttributes += `background-color: ${textNode.backgroundColor};`;
      }

      string = `<span style="${styleAttributes}">${string}</span>`;
    }

    return string;
  }

  if (Element.isElement(node)) {
    const elementNode = node as CustomElement;

    const children = elementNode.children
      .map((n: Node) => Serialize(n))
      .join('');

    const style = elementNode.align
      ? ` style="text-align: ${elementNode.align};"`
      : '';

    switch (elementNode.type) {
      case 'paragraph':
        return `<p${style}>${children}</p>`;

      case 'headingOne':
        return `<h1${style}>${children}</h1>`;

      case 'headingTwo':
        return `<h2${style}>${children}</h2>`;

      case 'headingThree':
        return `<h3${style}>${children}</h3>`;

      case 'headingFour':
        return `<h4${style}>${children}</h4>`;

      case 'headingFive':
        return `<h5${style}>${children}</h5>`;

      case 'headingSix':
        return `<h6${style}>${children}</h6>`;

      case 'bulletedList':
        return `<ul${style}>${children}</ul>`;

      case 'numberedList':
        return `<ol${style}>${children}</ol>`;

      case 'listItem':
        return `<li${style}>${children}</li>`;

      case 'br':
        return `<br/>`;

      default:
        return children;
    }
  }
  return '';
};
