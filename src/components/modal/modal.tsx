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
import { useTranslations } from "next-intl";
import React from "react"

interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
  close?: () => void;
  confirm?: () => void;
  triggerButton?: React.ReactNode |string;
}

export function Modal({ title, description, children, close, confirm,triggerButton='open Modal' }: Props) {
  const t = useTranslations()
  const titleTranslate = title ? t(title) : t('dashboard.modal.title')
  const descriptionTranslate = description ? t(description) : t('dashboard.modal.description')
  const triggerButtonTranslate = typeof triggerButton == "string"
  ? t(triggerButton)
  : triggerButton;


  const [open, setOpen] = React.useState(false);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger  onClick={(e)=>e.stopPropagation()} asChild>
        {typeof triggerButton == "string" ? (
          <Button variant="outline">{triggerButtonTranslate}</Button>
        ) : (
          triggerButtonTranslate
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">

        <DialogHeader>
          <DialogTitle>{titleTranslate}</DialogTitle>
          <DialogDescription>
            {descriptionTranslate}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            {children}
          </div>

        </div>
        <DialogFooter className="sm:justify-start">
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

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
