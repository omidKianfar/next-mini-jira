"use client";
import Button from "@/src/components/atom/button/next-button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="flex justify-center mb-4">
        <h1 className="text-6xl font-bold text-amber-500">404</h1>
      </div>

      <div className="flex flex-col justify-start">
        <h1 className="text-6xl font-bold mb-4">Somthing went wrong</h1>
        <p className="mb-6 text-3xl">Page not found.</p>
      </div>
      <div>
        <Button
          onClick={() => router.push("/dashboard")}
          icon={<Icon icon="grommet-icons:link-next" width={16} className="ml-2"/>}
          className="mt-6 bg-blue-500 text-white border-2
                 hover:bg-transparent hover:border-blue-500
               hover:text-blue-500 rounded-sm px-8 py-3 
                transition-all duration-200 text-lg
            "
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}
