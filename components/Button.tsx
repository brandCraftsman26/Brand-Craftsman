"use client";

import clsx from "clsx";

const Button = ({ id, title, rightIcon, leftIcon, containerClass, onClick, isLinkWrapper }: { id?: string; title?: string; rightIcon?: React.ReactNode; leftIcon?: React.ReactNode; containerClass?: string; onClick?: (e: React.MouseEvent<HTMLElement>) => void; isLinkWrapper?: boolean }) => {
  const Component = isLinkWrapper || onClick ? "div" : "button";
  return (
    <Component
      id={id}
      onClick={onClick}
      className={clsx(
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:via-indigo-500 hover:to-cyan-400 px-7 py-3 text-white shadow-lg shadow-violet-500/25 hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300",
        containerClass
      )}
    >
      {leftIcon}

      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>

      {rightIcon}
    </Component>
  );
};

export default Button;

