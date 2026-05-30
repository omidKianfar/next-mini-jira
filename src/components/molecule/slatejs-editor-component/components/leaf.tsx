import { RenderLeafProps } from 'slate-react';

const LeafComponent = (props: RenderLeafProps) => {
  const { attributes, leaf } = props;
  let { children } = props;

  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  if (leaf.code) children = <code>{children}</code>;

  return (
    <span
      {...attributes}
      style={{
        color: leaf.color ?? undefined,
        backgroundColor: leaf.backgroundColor ?? undefined,
        fontFamily: leaf.fontFamily,
      }}
    >
      {children}
    </span>
  );
};

export default LeafComponent;
