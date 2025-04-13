import { CustomerStatus } from "@/types/enums";

export const customerStatusOptions = [
  { label: "Pending", value: CustomerStatus.Pending },
  { label: "In Progress", value: CustomerStatus.In_Progress },
  { label: "Verified", value: CustomerStatus.Verified },
  { label: "Completed", value: CustomerStatus.Completed },
];
