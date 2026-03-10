'use client';

import {
  PropsWithChildren,
  useIsMobile,
  useState,
  EditorProviderComponent,
} from '../../imports';
import AdminChatSidebar from '@/src/components/molecule/support/admin-chat-sidebar';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const [showSidebar, setShowSidebar] = useState(true);

  const isMobile = useIsMobile();

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden lg:flex-row">
      <AdminChatSidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />

      <div
        className={`h-full flex-1 overflow-hidden p-4 pt-0 transition-all duration-150 lg:pt-4 ${
          isMobile && showSidebar ? 'hidden' : 'block'
        } ${!showSidebar && !isMobile ? 'lg:pl-16' : ''}`}
      >
        <EditorProviderComponent>{children}</EditorProviderComponent>
      </div>
    </div>
  );
};

export default DashboardLayout;
