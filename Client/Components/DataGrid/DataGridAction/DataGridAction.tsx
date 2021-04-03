import React from "react";

// Next
import { useRouter } from "next/router";

// Material-UI
import { IconButton } from "@material-ui/core";

// Icons
import DeleteIcon from "@material-ui/icons/Delete";
import ModifyIcon from "@material-ui/icons/Create";

// ========================================================================================================

interface DataGridActionType {
  handleClickOpen: Function;
  path?: string;
  deleteOnly?: boolean;
}

const DataGridAction: React.FC<DataGridActionType> = ({ path, handleClickOpen, deleteOnly = false }) => {
  const router = useRouter();

  return (
    <>
      {deleteOnly ? (
        <>
          <IconButton onClick={() => handleClickOpen()}>
            <DeleteIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton edge="start" onClick={() => router.push(`${path}`)}>
            <ModifyIcon />
          </IconButton>

          <IconButton onClick={() => handleClickOpen()}>
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </>
  );
};

export default DataGridAction;
