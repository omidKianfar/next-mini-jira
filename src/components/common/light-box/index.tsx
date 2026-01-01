import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

// style
import "yet-another-react-lightbox/styles.css";

// type
import { LightBoxProps } from "../type";

const LightBoxComponent = ({ children, url }: LightBoxProps) => {
  // states
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
