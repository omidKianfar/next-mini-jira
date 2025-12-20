"use client";

export default function ErrorFallback() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2 text-center">
      <h1 className="text-title font-semibold text-error-600">
        Something went wrong
      </h1>
      <p className="text-gray-500">Please try again later.</p>
    </div>
  );
}
