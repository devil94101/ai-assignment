import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const Model = (props: {
  name: string;
  id: string;
  description: string;
  avatar: string;
}) => {
  return (
    <Link
      href={"/explore/" + props.id}
      className="group bg-background border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
      prefetch={false}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold group-hover:text-primary">
          {props.name}
        </h3>
        <center className="py-4">
          <img src={props.avatar} alt="gpt-avatar" className="h-40" />
        </center>
        <p className="text-muted-foreground line-clamp-2">
          {props.description}
        </p>
      </div>
      <div className="bg-muted p-4 flex items-center justify-between">
        <div className="text-sm font-medium text-muted-foreground">
          Explore {props.name}
        </div>
        <FaArrowRight className="w-5 h-5 text-muted-foreground" />
      </div>
    </Link>
  );
};

export default Model;
