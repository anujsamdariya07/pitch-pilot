import React from 'react';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const PurpleIcon = ({ children, className }: Props) => {
  return (
    <div className={cn('px-2 py-2 iconBackground', className)}>{children}</div>
  );
};

export default PurpleIcon;
