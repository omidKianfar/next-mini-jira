import { RenderElementProps } from 'slate-react';

const ElementComponent = (props: RenderElementProps) => {
  const { attributes, children, element } = props;

  const style: React.CSSProperties = { textAlign: element.align || 'left' };

  switch (element.type) {
    case 'paragraph':
      return (
        <p style={{ ...style, margin: 0 }} {...attributes}>
          {children}
        </p>
      );

    case 'listItem':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );

    case 'headingOne':
      return (
        <h1
          style={{ ...style, fontSize: '2em', fontWeight: 'bold' }}
          {...attributes}
        >
          {children}
        </h1>
      );

    case 'headingTwo':
      return (
        <h2
          style={{ ...style, fontSize: '1.5em', fontWeight: 'bold' }}
          {...attributes}
        >
          {children}
        </h2>
      );

    case 'headingThree':
      return (
        <h3
          style={{ ...style, fontSize: '1.17em', fontWeight: 'bold' }}
          {...attributes}
        >
          {children}
        </h3>
      );

    case 'headingFour':
      return (
        <h4
          style={{ ...style, fontSize: '1em', fontWeight: 'bold' }}
          {...attributes}
        >
          {children}
        </h4>
      );

    case 'headingFive':
      return (
        <h5
          style={{ ...style, fontSize: '0.83em', fontWeight: 'bold' }}
          {...attributes}
        >
          {children}
        </h5>
      );

    case 'headingSix':
      return (
        <h6
          style={{ ...style, fontSize: '0.67em', fontWeight: 'bold' }}
          {...attributes}
        >
          {children}
        </h6>
      );

    case 'bulletedList':
      return (
        <ul
          style={{
            ...style,
            listStyleType: 'disc',
            listStylePosition: 'outside',
            paddingLeft: '20px',
            margin: '8px 0',
          }}
          {...attributes}
        >
          {children}
        </ul>
      );

    case 'numberedList':
      return (
        <ol
          style={{
            ...style,
            listStyleType: 'decimal',
            listStylePosition: 'outside',
            paddingLeft: '20px',
            margin: '8px 0',
          }}
          {...attributes}
        >
          {children}
        </ol>
      );

    case 'br':
      return <br {...attributes} />;

    default:
      return (
        <p style={{ ...style, margin: 0 }} {...attributes}>
          {children}
        </p>
      );
  }
};

export default ElementComponent;
