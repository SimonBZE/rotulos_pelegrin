import { extendVariants, Input, Textarea, Select } from "@nextui-org/react";

export const MyInput = extendVariants(Input, {
  variants: {
    // <- modify/add variants
    color: {
      white: {
        // <- add a new color variant
        inputWrapper: [
          "bg-white",
          "w-full",

          "border-[1.5px]",
          "border-stroke",
          "font-medium",
        ],
      },
    },
  },

  defaultVariants: {
    color: "white",
  },
});

export const MyTextarea = extendVariants(Textarea, {
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

  defaultVariants: {
    color: "white",
  },
});

