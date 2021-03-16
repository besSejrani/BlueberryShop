import React, { useState } from "react";

// Material-UI
import { Box, Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

//Material-UI Dropzone
import { DropzoneDialog } from "material-ui-dropzone";

// Apollo State
import { product } from "../../Apollo/state/product/index";

// ========================================================================================================

type UploadFileType = {
  name: string;
  filesLimit: number;
};

const initialState = {
  open: false,
  files: [],
};

const UploadFile: React.FC<UploadFileType> = ({ name, filesLimit }) => {
  const classes = useStyles();

  const [file, setFile] = useState(initialState);
  const [mediaPreview, setMediaPreview] = useState("");

  const closeFileUpload = () => {
    setFile((prevState) => ({ ...prevState, open: false }));
  };

  const saveFileUpload = (files) => {
    setFile((prevState) => ({ ...prevState, open: false, files }));
    setMediaPreview(window.URL.createObjectURL(files[0]));

    product({ preview: files.map((file) => window.URL.createObjectURL(file)), images: files });
  };

  const openFileUpload = () => {
    setFile((prevState) => ({ ...prevState, open: true }));
  };

  return (
    <div>
      <Box className={classes.content}>
        <Button variant="contained" style={{ backgroundColor: "white", marginBottom: "20px" }} onClick={openFileUpload}>
          {name}
        </Button>
      </Box>

      <DropzoneDialog
        open={file.open}
        onSave={saveFileUpload}
        acceptedFiles={["image/jpeg", "image/png", "image/webp"]}
        showPreviews={true}
        maxFileSize={5000000}
        filesLimit={filesLimit}
        onClose={closeFileUpload}
      />
    </div>
  );
};

export default UploadFile;

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    image: {
      marginLeft: 10,
      height: "75px",
      width: "75px",
    },
  })
);
