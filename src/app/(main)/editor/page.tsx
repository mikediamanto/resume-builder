import { Metadata } from "next";
import React from "react";
import ResumeEditor from "./resume-editor";

export const metadata: Metadata = {
  title: "Design your resume",
};

const EditorPage = () => {
  return <ResumeEditor />;
};

export default EditorPage;
