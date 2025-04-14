import React from 'react'
import RoleCreateForm from './components/roleForm'
import { api } from '@/lib/api/serverCore'
import { IResponseUsersPermissions } from '@/entities/dashboard'

const Role =async () => {
    const permissionsList =await api.get<Record<string,IResponseUsersPermissions[]>>("RolesCreate")

  return (
   <RoleCreateForm permissionsList={permissionsList} />
  )
}

export default Role