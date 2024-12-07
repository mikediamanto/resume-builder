import { Metadata } from "next";
import React, { Suspense } from "react";
import ResumeEditor from "./resume-editor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { resumeDataInclude } from "@/lib/types";

export const metadata: Metadata = {
  title: "Design your resume",
};

type Props = {
  searchParams: Promise<{ resumeId?: string }>;
};

const EditorPage = async ({ searchParams }: Props) => {
  const { resumeId } = await searchParams;

  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDataInclude,
      })
    : null;

  return (
    <Suspense>
      <ResumeEditor resumeToEdit={resumeToEdit} />
    </Suspense>
  );
};

export default EditorPage;
