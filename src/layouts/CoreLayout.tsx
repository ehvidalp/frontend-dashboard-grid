import { FC } from "react";

interface CoreLayoutProps {
  children: React.ReactNode;
}

const CoreLayout:FC<CoreLayoutProps> = ({ children }) => {
  return (
    <>
    {children}
    </>
  )
}

export default CoreLayout