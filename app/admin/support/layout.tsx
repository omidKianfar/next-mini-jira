"use client";

import { PropsWithChildren, useState } from "react";

// ui
import ChatSidebar from "@/src/components/organisms/sidebar-component/chat-sidebar";
import ButtonFreeClass from "@/src/components/atom/buttons-component/button-free-class";
import MyIcon from "@/src/components/atom/icon-components";

// hooks
import { useIsMobile } from "@/src/hooks/mobile-size/use-is-mobile";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  // hooks
  const isMobile = useIsMobile();

  // states
  const [sidebarShow, setSidebarShow] = useState<boolean>(true);

  return (
    <div className="flex h-full w-full flex-col items-start justify-start lg:flex-row">
      <div
        className={`ml-2 mr-0 mt-2 lg:my-4 lg:ml-4 ${sidebarShow ? "h-[calc(100vh-110px)] border-warning-500 p-2" : "h-full border-gray-300 p-1"} rounded-lg border-2 bg-white  shadow-md`}
      >
        <div className="flex items-center justify-end">
          <ButtonFreeClass
            onClick={() => setSidebarShow(!sidebarShow)}
            className={`rounded-lg ${sidebarShow && "border-2 border-gray-200 bg-gray-50 p-1 shadow-md"}`}
            icon={
              sidebarShow ? (
                <MyIcon
                  icon="fluent:arrow-exit-28-filled"
                  iconClass="rotate-180"
                  className={`text-h4 text-warning-500 hover:text-warning-700 `}
                />
              ) : (
                <MyIcon
                  icon="fluent:arrow-exit-28-filled"
                  className={`text-h4 text-primary-500 hover:text-primary-700  lg:text-gray-500`}
                />
              )
            }
          />
        </div>

        {sidebarShow && (
          <div className="mt-2 max-h-[calc(100vh-170px)] overflow-y-auto rounded-md border-2 border-warning-400 bg-gray-50 p-2 pb-0 shadow-md">
            <ChatSidebar setSidebarShow={setSidebarShow}/>
          </div>
        )}
      </div>

      {isMobile && sidebarShow ? null : (
        <div className="h-full w-full p-2 lg:p-4">{children}</div>
      )}
    </div>
  );
};

export default DashboardLayout;
