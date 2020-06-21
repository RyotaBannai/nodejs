import React from "react";
import { APIRequest } from "../organisms/APIRequest";

interface Props {}

export const Main: React.FC<Props> = () => {
  return (
    <div>
      <APIRequest />
    </div>
  );
};
