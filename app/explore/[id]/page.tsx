"use client";
import ModelDetail from "@/components/ModelDetail/ModelDetail";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { id } = useParams();

  return <ModelDetail id={id as string} />;
};

export default Page;
