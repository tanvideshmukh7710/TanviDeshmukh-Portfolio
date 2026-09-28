/** biome-ignore-all lint/a11y/noNoninteractiveElementInteractions: Cursor targets use hover-only affordances. */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: Cursor targets are decorative hover zones. */

"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  type SpringOptions,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type MotionDivAnimate = NonNullable<
  ComponentProps<typeof motion.div>["animate"]
>;

const DEFAULT_CURSOR_COLOR = "#8b0a0a";

const CURSOR_EASE = [0.625, 0.05, 0, 1] as const;

const customCursorVariants = cva("relative select-none", {
  variants: {
    layout: {
      default: "",
      demo: "flex min-h-72 items-center justify-center",
    },
  },
  defaultVariants: {
    layout: "default",
  },
});

const customCursorTargetVariants = cva(
  "flex items-center justify-center text-foreground transition-opacity hover:opacity-80",
  {
    variants: {
      size: {
        sm: "size-10",
        md: "size-14",
        lg: "size-16",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type CursorMode = "default" | "hover" | "explore";

interface CustomCursorContextValue {
  setIsHovering: (isHovering: boolean) => void;
  setCursorMode: (mode: CursorMode) => void;
}

const CustomCursorContext = createContext<CustomCursorContextValue | null>(
  null
);

function useCustomCursorContext() {
  const context = useContext(CustomCursorContext);

  if (!context) {
    throw new Error(
      "CustomCursorTarget must be used within a CustomCursor provider."
    );
  }

  return context;
}

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");

  if (normalized.length !== 6) {
    return `rgba(139, 10, 10, ${alpha})`;
  }

  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function resolveCursorAppearance(
  cursorMode: CursorMode,
  isHovering: boolean,
  color: string
): MotionDivAnimate {
  if (cursorMode === "explore") {
    return {
      width: 86,
      height: 32,
      borderRadius: 9999,
      backgroundColor: hexToRgba(color, 0.22),
      borderColor: color,
      borderWidth: 1.5,
    };
  }

  if (!isHovering) {
    return {
      width: 16,
      height: 16,
      borderRadius: 9999,
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
    };
  }

  return {
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: hexToRgba(color, 0.25),
    borderColor: color,
    borderWidth: 1.5,
  };
}

function useCoarsePointer() {
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");

    const update = () => {
      setIsCoarsePointer(mediaQuery.matches);
    };

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  return isCoarsePointer;
}

export interface CustomCursorProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children">,
    VariantProps<typeof customCursorVariants> {
  children?: ReactNode;
  /** Cursor fill and border color. */
  color?: string;
  /** Spring damping for pointer follow. */
  followDamping?: number;
  /** Spring stiffness for pointer follow. */
  followStiffness?: number;
  /** Override spring options for pointer follow. */
  followTransition?: SpringOptions;
}

function CustomCursor({
  children,
  className,
  color = DEFAULT_CURSOR_COLOR,
  followDamping = 22,
  followStiffness = 150,
  followTransition,
  layout = "default",
  ...props
}: CustomCursorProps) {
  const prefersReducedMotion = useReducedMotion();
  const isCoarsePointer = useCoarsePointer();
  const [isHovering, setIsHovering] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springTransition = followTransition ?? {
    damping: followDamping,
    stiffness: followStiffness,
    mass: 0.8,
  };

  const springX = useSpring(cursorX, springTransition);
  const springY = useSpring(cursorY, springTransition);

  const contextValue = useMemo<CustomCursorContextValue>(
    () => ({
      setIsHovering,
      setCursorMode,
    }),
    []
  );

  useEffect(() => {
    if (isCoarsePointer || prefersReducedMotion) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-cursor="explore"]')) {
        setCursorMode("explore");
      } else {
        setCursorMode((prev) => (prev === "explore" ? "default" : prev));
      }
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-cursor="explore"]')) {
        setCursorMode("explore");
      } else if (
        target?.closest('[data-cursor="target"]') ||
        target?.closest("a") ||
        target?.closest("button")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const related = event.relatedTarget as HTMLElement | null;
      if (
        target?.closest('[data-cursor="explore"]') &&
        !related?.closest('[data-cursor="explore"]')
      ) {
        setCursorMode("default");
      }
      if (
        (target?.closest('[data-cursor="target"]') ||
          target?.closest("a") ||
          target?.closest("button")) &&
        !(
          related?.closest('[data-cursor="target"]') ||
          related?.closest("a") ||
          related?.closest("button")
        )
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY, isCoarsePointer, prefersReducedMotion]);

  const appearance = resolveCursorAppearance(cursorMode, isHovering, color);

  return (
    <CustomCursorContext.Provider value={contextValue}>
      <div
        className={cn(customCursorVariants({ layout, className }))}
        {...props}
      >
        {isCoarsePointer || prefersReducedMotion ? null : (
          <motion.div
            animate={appearance}
            aria-hidden="true"
            className="pointer-events-none fixed top-0 left-0 z-[100] border backdrop-blur-[6px] flex items-center justify-center overflow-hidden"
            initial={false}
            style={{
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            transition={{
              duration: 0.35,
              ease: CURSOR_EASE,
            }}
          >
            {cursorMode === "explore" && (
              <span className="text-[9px] font-black tracking-[0.2em] uppercase select-none text-zinc-900 dark:text-white">
                EXPLORE
              </span>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </CustomCursorContext.Provider>
  );
}

export interface CustomCursorTargetProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children">,
    VariantProps<typeof customCursorTargetVariants> {
  children?: ReactNode;
}

function CustomCursorTarget({
  children,
  className,
  size,
  ...props
}: CustomCursorTargetProps) {
  const { setIsHovering } = useCustomCursorContext();

  return (
    <div
      className={cn(customCursorTargetVariants({ size, className }))}
      data-cursor=""
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  CustomCursor,
  CustomCursorTarget,
  customCursorTargetVariants,
  customCursorVariants,
  useCustomCursorContext,
};

export default CustomCursor;
