import React from "react";

// Material-UI
import { Card } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// MDX
import MDXProvider from "@mdx-js/runtime";
import MDXComponents from "../MDXComponents";
// import { getMDXComponent } from "mdx-bundler/client";

// Apollo State
import { markdown } from "@Apollo/state/markdown/index";

// ========================================================================================================

const MarkdownPreview = () => {
  const classes = useStyles();

  return (
    <Card elevation={1} className={classes.cardPreview}>
      <MDXProvider components={MDXComponents} style={{ height: "100%" }}>
        {markdown()}
      </MDXProvider>
    </Card>
  );
};

export default MarkdownPreview;

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardPreview: {
      height: "660px",
      width: "100%",
      overflowY: "scroll",
      borderRadius: "20px",
    },

    previewMarkdown: {
      display: "flex",
      justifyContent: "start",
      flexDirection: "column",
      height: "100%",
      width: "100%",
      overflowY: "scroll",
      padding: "35px 30px 20px 30px",
    },

    content: {
      position: "sticky",
      flexDirection: "column",
      padding: "20px 20px",
      width: "100%",
      height: "100%",
    },
  })
);
