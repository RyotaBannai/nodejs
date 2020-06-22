import React from "react";
import { UserInsert } from "../organisms/UserInsert";

interface Props {}

export const AddUser: React.FC<Props> = () => {
  return (
    <div>
      <UserInsert />
    </div>
  );
};
