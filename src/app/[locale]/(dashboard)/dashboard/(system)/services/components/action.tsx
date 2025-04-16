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
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [service, setService] = useState<IServicesData | null>(null);

    const handleEdit = useCallback(async () => {
      try {
        setIsLoading(true);
        setIsModalOpen(true);

        const response = await api.get<IResponseSingleServices>([
          "ServicesEdit",
          String(id),
        ]);

        setService(response.data);
      } catch (error) {
        console.error("Error fetching service details:", error);
        toast.error("Failed to load service details");
        setIsModalOpen(false);
      } finally {
        setIsLoading(false);
      }
    }, [id]);

    const handleDelete = useCallback(async () => {
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
    }, [id]);

    const handleCloseModal = useCallback(() => {
      setIsModalOpen(false);
      // Reset service state after modal closes with a short delay
      setTimeout(() => setService(null), 300);
    }, []);

    return (
      <>
        <div className="flex items-center justify-center">
          <ActionCell
            id={id}
            name={name}
            editAction={handleEdit}
            onDeleted={handleDelete}
          />
        </div>

        {isModalOpen && (
          <Modal
            title="dashboard.services.title"
            description="dashboard.services.description"
            open={isModalOpen}
            triggerButton=""
            setOpen={setIsModalOpen}
          >
            {isLoading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : service ? (
              <UpdateServiceForm
                open={isModalOpen}
                setOpen={handleCloseModal}
                service={service}
              />
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
