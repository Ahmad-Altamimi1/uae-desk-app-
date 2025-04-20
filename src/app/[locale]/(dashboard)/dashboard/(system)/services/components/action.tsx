import React, { useState, useCallback } from "react";
import ActionCell from "@/components/table/actionCell";
import { deleteServices } from "@/app/[locale]/(dashboard)/actions/services";
import { IResponseSingleServices, IServicesData } from "@/entities/dashboard";
import { api } from "@/lib/api/serverCore";
import { UpdateServiceForm } from "../[serviceId]/edit/components/updateServiceForm";
import { Modal } from "@/components/modal/modal";
import { toast } from "sonner";

interface ServiceActionProps {
  id: number;
  name: string;
}

const ServiceAction: React.FC<ServiceActionProps> = React.memo(
  ({ id, name }) => {
    const [itemForUpdate, setItemForUpdate] = useState<number | boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [service, setService] = useState<IServicesData | null>(null);
    let x = 0;
    console.log("count", ++x);

    const handleEdit = useCallback(async (id: number) => {
      try {
        setIsLoading(true);
        setItemForUpdate(id);

        const response = await api.get<IResponseSingleServices>([
          "ServicesEdit",
          String(id),
        ]);

        setService(response.data);
      } catch (error) {
        console.error("Error fetching service details:", error);
        toast.error("Failed to load service details");
        setItemForUpdate(false);
      } finally {
        setIsLoading(false);
      }
    }, []);

    const handleDelete = useCallback(async (id: number) => {
      try {
        const result = await deleteServices(id);
        if (result.error) {
          throw new Error(result.error);
        }
        toast.success("Service deleted successfully");
        return true;
      } catch (error) {
        console.error("Error deleting service:", error);
        toast.error("Failed to delete service");
        return false;
      }
    }, []);

    return (
      <>
        <div className="flex items-center justify-center">
          <ActionCell
            id={id}
            name={name}
            editAction={() => {
              handleEdit(id);
            }}
            onDeleted={() => {
              handleDelete(id);
            }}
          />
        </div>

        {itemForUpdate && (
          <Modal
            title="dashboard.services.title"
            description="dashboard.services.description"
            open={!!itemForUpdate}
            triggerButton=""
            setOpen={setItemForUpdate}
          >
            {isLoading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : service && itemForUpdate == id ? (
              <UpdateServiceForm setOpen={setItemForUpdate} service={service} />
            ) : (
              <div className="text-center p-4 text-red-500">
                Failed to load service data
              </div>
            )}
          </Modal>
        )}
      </>
    );
  }
);

// Add display name for better debugging
ServiceAction.displayName = "ServiceAction";

export default ServiceAction;
