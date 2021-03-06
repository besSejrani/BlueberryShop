import React, { useState, useEffect } from "react";

// React-Hook-Form
import { useForm } from "react-hook-form";

// Material-UI
import { Card, Box, TextField } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// Apollo State
import { markdown } from "@Apollo/state/markdown/index";

// ========================================================================================================

type FormValues = {
  articleContent: string;
};

interface MarkdownInputType {
  content?: string;
}

const MarkdownInput: React.FC<MarkdownInputType> = ({ content }) => {
  const classes = useStyles();

  // State
  const [articleContent, setArticleContent] = useState<any>();

  // Form
  const { register } = useForm<FormValues>({
    criteriaMode: "all",
  });

  useEffect(() => {
    setArticleContent(content);
  }, [content]);

  // Events
  const handleChange = (text) => {
    setArticleContent(text);
  };

  // Markdown Preview
  markdown(articleContent);

  return (
    <>
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
      </Card>
    </>
  );
};

export default MarkdownInput;

// ========================================================================================================

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      height: 660,
      overflowY: "scroll",
      borderRadius: "20px",
    },

    cardPreview: {
      height: "660px",
      width: "100%",
      overflowY: "scroll",
      borderRadius: "20px",
    },

    inputMarkdown: {
      display: "flex",
      justifyContent: "start",
      flexDirection: "column",
      width: "100%",
      padding: "35px 30px",
      height: "100%",
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
  }),
);
