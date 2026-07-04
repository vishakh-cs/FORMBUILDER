import React from "react";
import clsx from "clsx";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  onClick,
  loading = false,
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200 focus:outline-none";

  const variants = {
    primary:
      "bg-blue-600 text-gray-50 hover:bg-blue-700 active:bg-blue-800",

    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400",

    success:
      "bg-green-600 text-gray-50 hover:bg-green-700 active:bg-green-800",

    danger:
      "bg-red-600 text-gray-50 hover:bg-red-700 active:bg-red-800",

    warning:
      "bg-yellow-500 text-gray-50 hover:bg-yellow-600 active:bg-yellow-700",

    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50",

    ghost:
      "text-gray-700 hover:bg-gray-100",

    link:
      "text-blue-600 underline hover:text-blue-700 bg-transparent p-0",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(
        baseStyles,
        variants[variant],
        (disabled || loading) && "opacity-50 cursor-not-allowed",
        className,
        "cursor-pointer"
      )}
    >
      {loading && (
        <svg
          className="h-5 w-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}

      {loading ? "Loading..." : children}
    </button>
  );
}