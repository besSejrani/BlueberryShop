import React, { useState } from "react";

// React-Hook-Form
import { useForm } from "react-hook-form";

// Material-UI
import { Card, Box, TextField } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// Markdown
import ReactMarkdown from "react-markdown";

// Apollo State
import { markdown } from "@Apollo/state/markdown/index";

// ========================================================================================================

type FormValues = {
  articleContent: string;
};

const MarkdownPreview = () => {
  const classes = useStyles();

  // State
  const [articleContent, setArticleContent] = useState<string>("");

  // Form
  const { register, errors } = useForm<FormValues>({
    criteriaMode: "all",
  });

  const handleChange = (text) => {
    setArticleContent(text);
  };
  markdown(articleContent);

  return (
    <Card elevation={1} className={classes.card}>
      <Box className={classes.inputMarkdown}>
        <TextField
          type="text"
          name="articleContent"
          id="articleContent"
          label="Content"
          multiline
          variant="outlined"
          inputRef={register({
            required: "This field is required",
          })}
          value={articleContent}
          onChange={(text) => handleChange(text.target.value)}
          // errors={errors}
        />
      </Box>

      <Box className={classes.previewMarkdown}>
        <ReactMarkdown source={articleContent} />
      </Box>
    </Card>
  );
};

export default MarkdownPreview;

// ========================================================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      width: "70%",
      height: 660,
      borderRadius: "10px",
      overflowY: "scroll",
      margin: "0px 20px",
    },

    inputMarkdown: {
      display: "flex",
      justifyContent: "start",
      flexDirection: "column",
      width: "50%",
      padding: "20px 30px",
    },

    previewMarkdown: {
      display: "flex",
      justifyContent: "start",
      flexDirection: "column",
      width: "50%",
      padding: "35px 30px 20px 30px",
    },

    content: {
      position: "sticky",
      flexDirection: "column",
      padding: "20px 20px",
      width: "100%",
    },
  })
);
