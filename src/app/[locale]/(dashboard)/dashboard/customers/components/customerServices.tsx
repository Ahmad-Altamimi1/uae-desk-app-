import { Modal } from '@/components/modal/modal'
import { ReadOnlyModal } from '@/components/modal/readOnlyModal'
import React from 'react'

interface CustomerServicesProps {
    services: string;  
  }



  export const CustomerServices = ({ services }: CustomerServicesProps) => {
    return (
      <ReadOnlyModal 
        title={"dashboard.customers.servicesModalTitle"} 
        description="dashboard.customers.servicesModalDescription"
      >
        <div>
         {services}

        </div>
      </ReadOnlyModal>
    )
  }
