import React, { useState, useCallback } from "react";
import ActionCell from "@/components/table/actionCell";
import { deleteServices } from "@/app/[locale]/(dashboard)/actions/services";
import { IBranchesData, ILocation, IResponseBranches, IResponseSingleServices, IServicesData } from "@/entities/dashboard";
import { api } from "@/lib/api/serverCore";
import { toast } from "sonner";
import { deleteBranches } from "@/app/[locale]/(dashboard)/actions/branches";
import { UpdateBranchForm } from "../[branchId]/edit/components/updateBranchForm";
import { Modal } from "@/components/modal/modal";
import { PermissionTypesOptions } from "@/constants";

interface BranchActionProps {
  id: number;
  branch_name: string;
  location_id: number;
  address: string;
  phone_number: string;
  email: string | null;
  created_at: string;
  updated_at: string;
  latitude: string;
  longitude: string;
}

const BranchAction: React.FC<BranchActionProps> = React.memo(
  ({ id, branch_name }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [branch, setBranches] = useState<{
      branch: IBranchesData,
      locations: ILocation[]
    }>({ branch: {}, locations: [] });


    const handleEdit = useCallback(async () => {
      try {
        setIsLoading(true);
        setIsModalOpen(true);

        const response = await api.get<IResponseBranches>([
          "BranchesEdit",
          String(id),
        ]);

        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching branch details:", error);
        toast.error("Failed to load branch details");
        setIsModalOpen(false);
      } finally {
        setIsLoading(false);
      }
    }, [id]);

    const handleDelete = useCallback(async () => {
      try {
        const result = await deleteBranches(id);
        if (result.error) {
          throw new Error(result.error);
        }
        toast.success("branch deleted successfully");
        return true;
      } catch (error) {
        console.error("Error deleting branch:", error);
        toast.error("Failed to delete branch");
        return false;
      }
    }, [id]);

    const handleCloseModal = useCallback(() => {
      setIsModalOpen(false);
      // Reset service state after modal closes with a short delay
      setTimeout(() => setBranches(null), 300);
    }, []);

    return (
      <>
        <div className="flex items-center justify-center">
          <ActionCell
            id={id}
            name={branch_name}
            edit={{Action:handleEdit,permission:PermissionTypesOptions["branches-edit"]}}
            onDelete={{Action:handleDelete,permission:PermissionTypesOptions["branches-delete"]}}
          />
        </div>

        {isModalOpen && (
          <Modal
            title="dashboard.branches.title"
            description="dashboard.branches.description"
            open={isModalOpen}
            triggerButton=""
            setOpen={setIsModalOpen}
          >
            {isLoading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : branch.branch  ? (
              <UpdateBranchForm
                open={isModalOpen}
                setOpen={handleCloseModal}
                branch={branch.branch}
              locations={branch.locations}

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
BranchAction.displayName = "BranchAction";

export default BranchAction;
