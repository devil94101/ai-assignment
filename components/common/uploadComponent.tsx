import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { FaPlus } from "react-icons/fa";
import Button from "./button";
import { BsArrowUp, BsArrowUpCircleFill } from "react-icons/bs";

interface props {
  onChange: (e: File[]) => void;
  accept?: { [key: string]: string[] };
  label: string;
  file?: File;
  error?: string;
}

const baseStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export const UploadComponent = ({ onChange, accept, label, file, error }: props) => {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: accept
        ? accept
        : {
            "image/*": [],
          },
      multiple: false,
      onDrop(acceptedFiles) {
        onChange(acceptedFiles);
      },
    });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className="w-full max-w-xs">
      {file ? (
        <div className="border-2 p-2 rounded-lg flex justify-between">
          <p>{file.name}</p>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <BsArrowUpCircleFill size={30} className=" cursor-pointer" />
          </div>
        </div>
      ) : (
        <div {...getRootProps({ style })} className="w-full">
          <input {...getInputProps()} />
          <Button className="w-full">{label}</Button>
        </div>
      )}
      <div>
        <p className="text-error">{error || ""}</p>
      </div>
    </div>
  );
};
