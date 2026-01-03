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
  const [showSidebar, setShowSidebar] = useState<boolean>(true);


  return (
    <div className="flex h-full w-full flex-col items-start justify-start lg:flex-row">
      <div
        className={`p-4 lg:pr-0 ${showSidebar ? "h-[calc(100vh-60px)] w-[100vw] lg:h-[calc(100vh-78px)] lg:w-[400px]" : "h-full"}`}
      >
        <div
          className={` ${showSidebar ? "border-warning-500 p-2" : "border-gray-300 p-1"} h-full w-full rounded-lg border-2 bg-white shadow-md`}
        >
          <div className="flex items-center justify-end">
            <ButtonFreeClass
              onClick={() => setShowSidebar(!showSidebar)}
              className={`rounded-lg ${showSidebar && "border-2 border-gray-200 bg-gray-50 p-1 shadow-md"}`}
              icon={
                showSidebar ? (
                  <MyIcon
                    icon="fluent:arrow-exit-28-filled"
                    iconClass="rotate-180"
                    className={`text-h4 text-warning-500 hover:text-warning-700`}
                  />
                ) : (
                  <MyIcon
                    icon="fluent:arrow-exit-28-filled"
                    className={`text-h4 text-primary-500 hover:text-primary-700 lg:text-gray-500`}
                  />
                )
              }
            />
          </div>

          {showSidebar && (
            <div className="mt-2 overflow-y-auto rounded-md border-2 border-warning-400 bg-gray-50 p-2 shadow-md">
              <ChatSidebar setShowSidebar={setShowSidebar} />
            </div>
          )}
        </div>
      </div>

      {isMobile && showSidebar ? null : (
        <div className="h-full w-full p-4 pt-0 lg:pt-4">{children}</div>
      )}
    </div>
  );
};

export default DashboardLayout;
