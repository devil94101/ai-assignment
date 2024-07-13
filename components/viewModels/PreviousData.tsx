import React, { useState, useEffect, useRef } from "react";
import ViewPreviousData from "./viewPreviousData";
import { FaArrowCircleDown } from "react-icons/fa";

type InputData = {
    name: string;
    description: string;
    type: string;
    required: true;
    default: null;
  };

interface Message {
    previousData: {
        id: string;
        inputData: {
            [key: string]: string | number | File;
        };
        inputs: InputData[];
        response: string;
    }[]
    avatar?: string;
    type: string;
}

const ChatComponent = (props: Message) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [props.previousData]);

  return (
    <div className="flex flex-col h-full relative">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 border rounded bg-white"
        style={{ height: "400px" }}
      >
        {props.previousData.map((message) => (
             <ViewPreviousData key={message.id} {...message} avatar={props.avatar} type={props.type}  />
        ))}
        <div ref={messagesEndRef}></div>
        {/* <div className="absolute bottom-10 right-10">
          <FaArrowCircleDown size={50}/>
        </div> */}
      </div>
    </div>
  );
};

export default ChatComponent;
