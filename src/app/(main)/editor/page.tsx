import { Metadata } from "next";
import React, { Suspense } from "react";
import ResumeEditor from "./resume-editor";

export const metadata: Metadata = {
  title: "Design your resume",
};

const EditorPage = () => {
  return (
    <Suspense>
      <ResumeEditor />
    </Suspense>
  );
};

export default EditorPage;
