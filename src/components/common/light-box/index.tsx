import { useState, Lightbox, Zoom } from '../imports';
import { LightBoxProps } from '../type';
import 'yet-another-react-lightbox/styles.css';

const LightBoxComponent = ({ children, url }: LightBoxProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        plugins={[Zoom]}
        slides={[{ src: url as string }]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />

      <div onClick={() => setOpen(true)}>{children}</div>
    </>
  );
};

export default LightBoxComponent;
