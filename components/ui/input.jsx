import { extendVariants, Input } from "@nextui-org/react";

export const MyInput = extendVariants(Input, {
  variants: {
    // <- modify/add variants
    color: {
      white: {
        // <- add a new color variant
        inputWrapper: [          
          "bg-white",
          "w-full",
          "rounded",
          "border-[1.5px]",
          "border-stroke",
          "font-medium",
        ],
      },
    },
  },
  size: {
    xs: {
      inputWrapper: "h-unit-5 min-h-unit-5 px-1",
      input: "text-tiny",
    },
    md: {
      inputWrapper: "h-unit-10 min-h-unit-10",
      input: "text-small",
    },
    xl: {
      inputWrapper: "h-unit-14 min-h-unit-14",
      input: "text-medium",
    },
  },
  defaultVariants: {
    color: "white",
  },
});
