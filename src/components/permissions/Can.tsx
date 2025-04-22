import {  useHasPermission } from '@/hooks/useHasPermission';
import { PermissionTypes } from '@/utils/type';
import React from 'react'

type CanProps = {
  permission: PermissionTypes;
children: React.ReactNode;
};

export default function Can({ permission,children}: CanProps) {
    const hasPermission=useHasPermission()
  
  if (!hasPermission(permission)) return null;
  return <>{children}</>;
}

