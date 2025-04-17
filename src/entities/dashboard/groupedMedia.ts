import { DocumentType } from "@/types/enums";

export type GroupedMediaResponse = {
  groupedMedia: { [key in DocumentType]: GroupedMediaRequest[] };
};

export interface GroupedMediaRequest {
  id: number;
  customer_id: number;
  document_name: string;
  file_path: string;
  created_at: string;
  updated_at: string;
  file_type: string;
}
