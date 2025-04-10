"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IconEye } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import React from "react"

interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
  close?: () => void;
  confirm?: () => void;
  triggerButton?: React.ReactNode | string;
}

export function ReadOnlyModal({ title, description, children, close, confirm, triggerButton = 'modal.open' }: Props) {
  const t = useTranslations()
  const titleTranslate = title ? t(title) : t('dashboard.customers.servicesModalTitle')
  const descriptionTranslate = description ? t(description) : t('dashboard.customers.servicesModalDescription')
  const triggerButtonTranslate = typeof triggerButton == "string"
    ? t(triggerButton)
    : triggerButton;


  const [open, setOpen] = React.useState(false);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={(e) => e.stopPropagation()} asChild>
        <IconEye />
        {/* {typeof triggerButton == "string" ? (
          <Button variant="outline">{triggerButtonTranslate}</Button>
        ) : (
          triggerButtonTranslate
        )} */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">

        <DialogHeader>
          <DialogTitle className="text-[#00713B]">{titleTranslate}</DialogTitle>
          {!!descriptionTranslate&&
          <DialogDescription>
            {descriptionTranslate}
          </DialogDescription>
          }

        <hr className=" mt-1 border-t border-gray-200" />  
        </DialogHeader>


        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            {children}
          </div>

        </div>

      </DialogContent>
    </Dialog>
  )
}
