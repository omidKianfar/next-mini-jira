import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

interface LightBoxProps {
  children: React.ReactNode;
  url: string;
}

const LightBoxComponent = ({ children, url }: LightBoxProps) => {
  const [open, setOpen] = useState<boolean>(false);

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
