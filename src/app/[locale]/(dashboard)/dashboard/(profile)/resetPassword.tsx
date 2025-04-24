import Password from '@/components/form/password'
import { Modal } from '@/components/modal/modal'
import Image from 'next/image'
import React from 'react'
import { FiLock } from 'react-icons/fi';
import  unlock from "@/public/images/dashboard/commn/unlock.png"
interface Props {
  title?: string;
  description?: string;
}

const ResetPassword = () => {

  return (

    <Modal title={'dashboard.updatePassword.title'} description={"dashboard.updatePassword.description"}
      triggerButton={<ResetPasswordButton />}
    >
      <Image src={unlock} alt="unlock" width={136} height={58} />
      <Password />
      <Password name='confirmPassword' placeholder='confirmPassword' />


    </Modal>
  );
};

export const ResetPasswordButton = () => {
  return (

    <div className="flex items-center gap-2 text-left text-sm leading-tight text-gray-700 ml">
      <FiLock className="" size={23} />
      <span className="truncate text-xs">Update My Password</span>
    </div>
  )
}

export default ResetPassword;

