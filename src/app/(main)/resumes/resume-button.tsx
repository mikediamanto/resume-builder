"use client";

import { Button } from "@/components/ui/button";
import { usePremiumModal } from "@/hooks/use-premium-modal";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  canCreate: boolean;
};

const ResumeButton = ({ canCreate }: Props) => {
  const { setOpen } = usePremiumModal();

  if (canCreate)
    return (
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusSquare className="size-5" />
          New Resume
        </Link>
      </Button>
    );

  return (
    <Button onClick={() => setOpen(true)} className="mx-auto flex w-fit gap-2">
      <PlusSquare className="size-5" />
      New Resume
    </Button>
  );
};

export default ResumeButton;
