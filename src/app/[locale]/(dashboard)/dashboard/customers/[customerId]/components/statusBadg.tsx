"use client";

import { Clock, CheckCircle, ThumbsUp, Info, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: number;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <>
      {status === 0 ? (
        <>
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-center gap-2 font-medium text-red-800">
              <XCircle className="h-4 w-4" /> Pending
            </div>
            <p className="mt-2 text-sm text-red-700">
              This customer is pending verification. Please review their
              information.
            </p>
          </div>
        </>
      ) : status === 1 ? (
        <>
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-2 font-medium text-amber-800">
              <Info className="h-4 w-4" /> In Progress
            </div>
            <p className="mt-2 text-sm text-amber-700">
              This customer is currently in progress and awaiting verification.
            </p>
          </div>
        </>
      ) : status === 2 ? (
        <>
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-2 font-medium text-green-800">
              <CheckCircle className="h-4 w-4" /> Verified
            </div>
            <p className="mt-2 text-sm text-green-700">
              This customer has been successfully verified.
            </p>
          </div>
        </>
      ) : status === 3 ? (
        <>
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-2 font-medium text-green-800">
              <ThumbsUp className="h-4 w-4" /> Approved
            </div>
            <p className="mt-2 text-sm text-green-700">
              The process for this customer has been successfully completed and
              the customer has been approved.
            </p>
          </div>
        </>
      ) : null}
    </>
  );
}
