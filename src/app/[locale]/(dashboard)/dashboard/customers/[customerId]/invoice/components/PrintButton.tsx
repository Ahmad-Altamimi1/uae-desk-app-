"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
const PrintButton = ({ title }: { title: string }) => {
  const handlePrint = () => {
    window.print();
  };
  return (
    <Button
      className="bg-primary hover:bg-primary text-white"
      onClick={handlePrint}
    >
      <Printer className="mr-2 h-4 w-4" />
      {title}
    </Button>
  );
};

export default PrintButton;
