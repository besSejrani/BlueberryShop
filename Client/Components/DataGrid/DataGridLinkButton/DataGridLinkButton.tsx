import React from "react";

// Next
import Link from "next/link";

// Material-UI
import { Button } from "@material-ui/core";

// ========================================================================================================

interface DataGridLinkButtonType {
  path: string;
  text: string;
}

const DataGridLinkButton: React.FC<DataGridLinkButtonType> = ({ path, text }) => (
  <Link href={`${path}`} passHref>
    <Button
      variant="outlined"
      color="secondary"
      size="small"
      style={{ borderRadius: 20, color: "#2196f3", borderColor: "#2196f3" }}
    >
      {text}
    </Button>
  </Link>
);


export default DataGridLinkButton;
