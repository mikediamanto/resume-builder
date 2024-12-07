"use server";

import prisma from "@/lib/prisma";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";
import path from "path";
export const saveResume = async (values: ResumeValues) => {
  const { id } = values;

  console.log("received values", values);
  const { photo, workExperiences, educations, ...resumeValues } =
    resumeSchema.parse(values);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // TODO: Check resume count for non-premium users

  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  let newPhotoUrl: string | undefined | null = undefined;

  if (photo instanceof File) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }

    const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, {
      access: "public",
    });

    newPhotoUrl = blob.url;
  } else if (photo === null) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    newPhotoUrl = null;
  }

  if (id) {
    return prisma.resume.update({
      where: { id },
      data: {
        ...resumeValues,
        photoUrl: newPhotoUrl,
        workExperiences: {
          deleteMany: {},
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate && new Date(exp.startDate),
            endDate: exp.endDate && new Date(exp.endDate),
          })),
        },
        educations: {
          deleteMany: {},
          create: educations?.map((exp) => ({
            ...exp,
            startDate: exp.startDate && new Date(exp.startDate),
            endDate: exp.endDate && new Date(exp.endDate),
          })),
        },
        // updatedAt: new Date(),
      },
    });
  } else {
    return prisma.resume.create({
      data: {
        ...resumeValues,
        userId,
        photoUrl: newPhotoUrl,
        workExperiences: {
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate && new Date(exp.startDate),
            endDate: exp.endDate && new Date(exp.endDate),
          })),
        },
        educations: {
          create: educations?.map((exp) => ({
            ...exp,
            startDate: exp.startDate && new Date(exp.startDate),
            endDate: exp.endDate && new Date(exp.endDate),
          })),
        },
        // updatedAt: new Date(),
      },
    });
  }
};
