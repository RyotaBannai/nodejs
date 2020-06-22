import React from "react";
import { UserFetch } from "../organisms/UserFetch";

interface Props {}

export const Main: React.FC<Props> = () => {
  return (
    <div>
      <UserFetch />
    </div>
  );
};
