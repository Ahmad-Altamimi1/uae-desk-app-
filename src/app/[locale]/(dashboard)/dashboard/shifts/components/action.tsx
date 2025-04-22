import React, { useState, useCallback } from "react";
import ActionCell from "@/components/table/actionCell";
import { deleteServices } from "@/app/[locale]/(dashboard)/actions/services";
import { IResponseSingleServices, IServicesData } from "@/entities/dashboard";
import { api } from "@/lib/api/serverCore";
import { UpdateShiftForm } from "../[shiftId]/edit/components/updateShiftForm";
import { Modal } from "@/components/modal/modal";
import { toast } from "sonner";
import { IResponseShifts, IShiftsData } from "@/entities/dashboard/shifts";
import { deleteShifts } from "../../../actions/shifts";
import { PermissionTypesOptions } from "@/constants";

interface ShiftActionProps {
  id: number;
  name: string;
  start_date:string;
  end_date:string;
}

const ShiftAction: React.FC<ShiftActionProps> = React.memo(
  ({ id, name }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [shifts, setShifts] = useState<IShiftsData[]>([]);


    const handleEdit = useCallback(async () => {
      try {
        setIsLoading(true);
        setIsModalOpen(true);

        const response = await api.get<IResponseShifts>([
          "ShiftsEdit",
          String(id),
        ]);

        setShifts(response.data);
      } catch (error) {
        console.error("Error fetching shift details:", error);
        toast.error("Failed to load shift details");
        setIsModalOpen(false);
      } finally {
        setIsLoading(false);
      }
    }, [id]);

    const handleDelete = useCallback(async () => {
      try {
        const result = await deleteShifts(id);
        if (result.error) {
          throw new Error(result.error);
        }
        toast.success("shift deleted successfully");
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
      setTimeout(() => setShifts(null), 300);
    }, []);

    return (
      <>
        <div className="flex items-center justify-center">
          <ActionCell
            id={id}
            name={name}
            edit={{Action:handleEdit,permission:PermissionTypesOptions["shift-edit"]}}
            onDeleted={{  Action:handleDelete,permission:PermissionTypesOptions["shift-delete"]}}
          />
        </div>

        {isModalOpen && (
          <Modal
            title="dashboard.shifts.title"
            description="dashboard.shifts.description"
            open={isModalOpen}
            triggerButton=""
            setOpen={setIsModalOpen}
          >
            {isLoading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : shifts ? (
                <UpdateShiftForm
                open={isModalOpen}
                setOpen={handleCloseModal}
                shift={shifts}
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
ShiftAction.displayName = "ShiftAction";

export default ShiftAction;
