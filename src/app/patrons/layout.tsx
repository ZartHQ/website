import React, { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode;
  }

const PatronLayout = ({ children }: LayoutProps) => {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden">
        {children}
      </div>
    );
  };

  export default PatronLayout