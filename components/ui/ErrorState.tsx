import React from "react";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

export function ErrorState({
  title = "Failed to load data",
  message = "Something went wrong while fetching data. Please check your network connection and try again.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="p-8 rounded-3xl bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 text-center space-y-4 max-w-lg mx-auto my-8">
      <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-500 flex items-center justify-center mx-auto text-2xl">
        <FiAlertCircle />
      </div>
      <h3 className="font-zentry text-xl font-bold uppercase text-red-600 dark:text-red-400">
        {title}
      </h3>
      <p className="font-robert-regular text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2.5 rounded-full bg-red-600 text-white font-general text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 hover:bg-red-700 transition-colors"
        >
          <FiRefreshCw /> Retry Loading
        </button>
      )}
    </div>
  );
}
