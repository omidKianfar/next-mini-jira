import  { ReactNode } from 'react';
import ReactDOM from 'react-dom';

export const Portal = ({ children }: { children?: ReactNode }) => {
    return typeof document === 'object' && document.body
        ? ReactDOM.createPortal(children, document.body)
        : null;
};
Portal.displayName = 'Portal';