"use client";

import clsx from "clsx";

const Button = ({ id, title, rightIcon, leftIcon, containerClass, isLinkWrapper }: { id?: string; title?: string; rightIcon?: React.ReactNode; leftIcon?: React.ReactNode; containerClass?: string; isLinkWrapper?: boolean }) => {
  const Component = isLinkWrapper ? "div" : "button";
  return (
    <Component
      id={id}
      className={clsx(
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-orange-600 px-7 py-3 text-white shadow-lg hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105 transition-all duration-300",
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

