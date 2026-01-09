"use client";

import React from "react";
import { WorkflowBuilderCard } from "./ui/workflow-builder-card";
import { Code, Share2, Zap } from "lucide-react";

const KegiatanComponent = () => {
  const cardData = {
    imageUrl:
      "https://images.unsplash.com/photo-1752154344437-44bd7480e8ee?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDY1fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=900?q=80&w=2940&auto=format&fit=crop",
    status: "Active",
    lastUpdated: "5 days ago",
    title: "Personal Email Assistant",
    description:
      "Your AI helper for reading, organizing, and responding to emails.",
    tags: ["Personal", "Marketing"],
    users: [
      { src: "https://i.pravatar.cc/150?img=1", fallback: "U1" },
      { src: "https://i.pravatar.cc/150?img=2", fallback: "U2" },
      { src: "https://i.pravatar.cc/150?img=3", fallback: "U3" },
      { src: "https://i.pravatar.cc/150?img=4", fallback: "+3" },
    ],
    actions: [
      { Icon: Zap, bgColor: "bg-blue-500" },
      { Icon: Code, bgColor: "bg-gray-700" },
      { Icon: Share2, bgColor: "bg-red-500" },
    ],
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center bg-background px-8">
      <WorkflowBuilderCard {...cardData} />
      <WorkflowBuilderCard {...cardData} />
      <WorkflowBuilderCard {...cardData} />
      <WorkflowBuilderCard {...cardData} />

    </div>
  );
};

export default KegiatanComponent;
