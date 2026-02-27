import ButtonFreeClass from '@/src/components/atom/buttons-component/button-free-class';
import MyIcon from '@/src/components/atom/icon-components';

import { ToolbarComponentProps } from '../type';

const SendMessage = ({ handleSend, loading }: ToolbarComponentProps) => {
  return (
    <>
      <ButtonFreeClass
        onClick={handleSend}
        disable={loading}
        isLoading={loading}
        icon={
          <MyIcon
            icon="send"
            className="text-h4 text-primary-500 hover:text-primary-700 lg:text-h3"
          />
        }
      />
    </>
  );
};

export default SendMessage;
