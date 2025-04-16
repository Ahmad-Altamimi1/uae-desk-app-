import { deleteServices, updateService } from '@/app/[locale]/(dashboard)/actions/services';
import ActionCell from '@/components/table/actionCell';
import React from 'react'
interface IProps {
    name:string
    id:number
}
const ServiceAction = ({id,name}:IProps) => {
    
  return (
    <div className="flex items-center justify-center">
    <ActionCell
      id={id}
      name={name}
      editAction={() => updateService(id)}
      onDeleted={async () =>
        await deleteServices(id).then((r) => {
          if (r.error) {
            throw new Error("Error in delete");
          }
        })
      }
    />
  </div>
  )
}

export default ServiceAction