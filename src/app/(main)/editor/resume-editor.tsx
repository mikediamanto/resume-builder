"use client";

import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./breadcrumbs";
import Footer from "./footer";
import { Suspense, useState } from "react";
import { ResumeValues } from "@/lib/validation";
import ResumePreviewSection from "./resume-preview-section";
import { cn, mapToResumeValues } from "@/lib/utils";
import { useUnloadWarning } from "@/hooks/use-unload-warning";
import { useAutosaveResume } from "./use-autosave";
import { ResumeServerData } from "@/lib/types";

type Props = {
  resumeToEdit: ResumeServerData | null;
};

const ResumeEditor = ({ resumeToEdit }: Props) => {
  const searchParams = useSearchParams();
  const [resumeData, setResumeData] = useState<ResumeValues>(
    resumeToEdit ? mapToResumeValues(resumeToEdit) : {},
  );
  const [showSmResumePreview, setShowSmResumePreview] = useState(false);
  const { isSaving, hasUnsavedChanges } = useAutosaveResume(resumeData);

  useUnloadWarning(hasUnsavedChanges);

  const currentStep = searchParams.get("step") || steps[0].key;

  const setStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);

    /**  router.push but it does a requet on the server*/
  };

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <Suspense>
      <div className="flex grow flex-col">
        <header className="space-y-1.5 border-b px-3 py-5 text-center">
          <h1 className="text-2xl font-bold">Design your resume</h1>
          <p className="text-sm text-muted-foreground">
            Follow the steps below to create your resume. Your progress will be
            save automatically.
          </p>
        </header>
        <main className="relative grow">
          <div className="absolute bottom-0 top-0 flex w-full">
            <div
              className={cn(
                "w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2",
                showSmResumePreview && "hidden",
              )}
            >
              <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
              {FormComponent && (
                <FormComponent
                  resumeData={resumeData}
                  setResumeData={setResumeData}
                />
              )}
            </div>
            <div className="grow md:border-r" />
            <ResumePreviewSection
              resumeData={resumeData}
              setResumeData={setResumeData}
              className={cn(showSmResumePreview && "flex")}
            />
          </div>
        </main>
        <Footer
          isSaving={isSaving}
          currentStep={currentStep}
          setCurrentStep={setStep}
          showSmResumePreview={showSmResumePreview}
          setShowSmResumePreview={setShowSmResumePreview}
        />
      </div>
    </Suspense>
  );
};

export default ResumeEditor;
