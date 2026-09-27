import React from "react";
import { Tooltip } from "@/components/ui/tooltip";

type TTabVariant = "primary" | "secondary";

export interface ITab {
  title?: string;
  value: string;
  disabled?: boolean;
  icon?: string;
  tooltip?: string;
}

interface TabsProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>> | ((value: string) => void);
  tabs: ITab[];
  disabled?: boolean;
  variant?: TTabVariant;
  className?: string;
}

interface TabProps extends ITab {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>> | ((value: string) => void);
  variant: TTabVariant;
}

const getClasses = (isSelected: boolean, disabled: boolean, variant: TTabVariant) => {
  let classes = `relative overflow-visible box-border font-sans text-sm flex gap-1.5 duration-100 items-center ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`;
  if (isSelected) {
    if (variant === "primary") {
      classes += " border-b-2 border-zinc-900 dark:border-white font-semibold text-zinc-900 dark:text-white";
    } else if (variant === "secondary") {
      classes += " bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm";
    }
  } else {
    if (variant === "secondary") {
      if (disabled) {
        classes += " bg-gray-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600";
      } else {
        classes += " bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100";
      }
    }
  }
  if (variant === "primary") {
    classes += " pb-[6px] hover:text-zinc-900 dark:hover:text-white " + (isSelected ? "text-zinc-950 dark:text-white font-bold" : "text-zinc-500 dark:text-zinc-400 font-medium");
  } else if (variant === "secondary") {
    classes += " h-7 rounded-lg text-[13px] px-3";
  }

  return classes;
};

const Tab = ({
  selected,
  setSelected,
  title,
  value,
  disabled = false,
  icon,
  variant
}: TabProps) => {
  if (!title && !icon) {
    return null;
  }

  return (
    <div
      className={getClasses(selected === value, disabled, variant)}
      onClick={() => {
        if (!disabled) {
          setSelected(value);
        }
      }}
    >
      {icon && <img src={icon} alt={title} width={16} height={16} />}
      <div>{title}</div>
    </div>
  );
};

export const Tabs = ({
  selected,
  setSelected,
  tabs,
  disabled = false,
  variant = "primary",
  className = ""
}: TabsProps) => {
  return (
    <div
      className={`flex items-center ${disabled ? " cursor-not-allowed" : ""} ${variant === "primary" ? "gap-8 pb-[1px]" : "gap-2"} ${className}`}>
      {tabs.map((tab) => tab.tooltip ? (
        <Tooltip key={tab.value} text={tab.tooltip}>
          <Tab
            selected={selected}
            setSelected={setSelected}
            disabled={disabled || tab.disabled}
            variant={variant}
            {...tab}
          />
        </Tooltip>
      ) : (
        <Tab
          key={tab.value}
          selected={selected}
          setSelected={setSelected}
          disabled={disabled || tab.disabled}
          variant={variant}
          {...tab}
        />
      ))}
    </div>
  );
};
