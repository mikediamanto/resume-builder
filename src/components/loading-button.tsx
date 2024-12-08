import React from "react";
import { Button, ButtonProps } from "./ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  loading: boolean;
} & ButtonProps;

/**
 * A button that displays a loading spinner when `isLoading` is true.
 * The button is also disabled when `isLoading` is true.
 *
 * @example
 * <LoadingButton isLoading={false}>Click me</LoadingButton>
 */
const LoadingButton = ({
  loading,
  disabled,
  className,
  children,
  ...props
}: Props) => {
  return (
    <Button
      disabled={loading || disabled}
      {...props}
      className={cn("flex items-center gap-2", className)}
    >
      {loading && <Loader2 className="size-5 animate-spin" />}
      {children}
    </Button>
  );
};

export default LoadingButton;
