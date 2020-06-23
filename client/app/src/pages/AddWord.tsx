import React from "react";
import { WordInsert } from "../organisms/WordInsert";

interface Props {}

export const AddWord: React.FC<Props> = () => {
  return (
    <div>
      <WordInsert />
    </div>
  );
};
