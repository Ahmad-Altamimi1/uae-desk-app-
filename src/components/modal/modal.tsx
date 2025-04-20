"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean | number>>;
  triggerButton?: React.ReactNode | string;
  size?: "default" | "md" | "lg"
}

export function Modal({
  title,
  description,
  children,
  open = false,
  setOpen,
  size = "default",
  triggerButton = "modal.open",
}: Props) {
  const t = useTranslations();
  const titleTranslate = title ? t(title) : "";
  const descriptionTranslate = description ? t(description) : "";
  const triggerButtonTranslate =
    typeof triggerButton == "string"
      ? triggerButton
        ? t(triggerButton)
        : triggerButton
      : triggerButton;

  return (
    <div className="mt-5">
      <Dialog open={open} onOpenChange={setOpen}  >
        <DialogTrigger onClick={(e) => e.stopPropagation()} asChild>
          {triggerButton &&
            (typeof triggerButton == "string" ? (
              <Button variant="outline">{triggerButtonTranslate}</Button>
            ) : (
              triggerButtonTranslate
            ))}
        </DialogTrigger>
        <DialogContent
          className={cn(
            size === "default" && "sm:max-w-md",
            size === "md" && "!w-[50vw]",
            size === "lg" && "w-[90%] max-w-5xl"
            
            // "overflow-y-scroll"
          )}
        >
          <DialogHeader>
            <DialogTitle>{titleTranslate}</DialogTitle>
            <DialogDescription>{descriptionTranslate}</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">{children}</div>
          </div>
          {/* <DialogFooter className="sm:justify-start">
          <div onClick={() => {
            // e.preventDefault()
            console.log('close')
            close?.()
            // if (close) {
              setOpen(false)
            // }
          }}>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </div>
          <div onClick={ (e) => {
            console.log('confirm')
            // e.preventDefault()
            confirm?.()
            // if (confirm) {
              setOpen(false)
            // }
          }

          }>
            <Button type="button" variant="secondary">
              save
            </Button>
          </div>

        </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
