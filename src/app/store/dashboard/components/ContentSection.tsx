"use client";
import React from "react";
import { ContentSectionProps } from "./Types";

const ContentSection: React.FC<ContentSectionProps> = ({ children }) => {
  return <div className="flex flex-col gap-5">{children}</div>;
};

export default ContentSection;
