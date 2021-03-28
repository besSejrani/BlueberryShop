import matter from "gray-matter";

import { MDXProvider } from "@mdx-js/react";
import MDX from "@mdx-js/runtime";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";

import React from "react";
import fs from "fs";
import path from "path";
import { GetStaticPaths, GetStaticProps } from "next";

// Components MDX
import { Typography, Container, Table, TableHead, TableRow, TableCell, Box } from "@material-ui/core";
import Image from "next/image";

// ========================================================================================================

type PostProps = {
  mdx: string;
  metaInformation: string;
};

const components = {
  h1: ({ children }) => (
    <Typography variant="h1" style={{ margin: "50px 0px" }}>
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <Typography variant="h2" style={{ margin: "30px 0px" }}>
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography variant="h3" style={{ margin: "30px 0px" }}>
      {children}
    </Typography>
  ),
  h4: ({ children }) => (
    <Typography variant="h4" style={{ margin: "50px 0px" }}>
      {children}
    </Typography>
  ),
  h5: ({ children }) => (
    <Typography variant="h5" style={{ margin: "50px 0px" }}>
      {children}
    </Typography>
  ),
  h6: ({ children }) => (
    <Typography variant="h6" style={{ margin: "50px 0px" }}>
      {children}
    </Typography>
  ),
  p: ({ children }) => <Typography variant="body1">{children}</Typography>,
  hr: () => <hr style={{ margin: "30px 0px" }} />,

  table: ({ children }) => <Table>{children}</Table>,
  thead: ({ children }) => <TableHead>{children}</TableHead>,
  tr: ({ children }) => <TableRow>{children}</TableRow>,
  th: ({ children }) => <TableCell>{children}</TableCell>,
  td: ({ children }) => <TableCell>{children}</TableCell>,
  img: (props) => {
    return (
      <Box style={{ textAlign: "center", margin: "50px 0px" }}>
        <Image src={props.src} height={500} width={800} alt={props.alt} />;
      </Box>
    );
  },
  pre: (props) => <div {...props} />,
  code: (props) => <pre style={{ color: "tomato" }} {...props} />,
};

const Post: React.FC<PostProps> = (props) => {
  // const hydratedContent = hydrate(props.content);
  return (
    <>
      <MDXProvider components={components}>
        <Container>
          <MDX>{props.mdx}</MDX>
        </Container>
      </MDXProvider>
    </>
  );
};

export default Post;

// ========================================================================================================

export const getStaticProps: GetStaticProps = async (props) => {
  const folderPath = path.join(process.cwd(), "content");
  const filePath = path.join(folderPath, `${props.params.post}.mdx`);
  const rawFileSource = fs.readFileSync(filePath);
  const { content, data } = matter(rawFileSource);

  const mdxSource = await renderToString(content);
  return {
    props: {
      mdx: content,
      metaInformation: data,
      content: mdxSource,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const folderPath = path.join(process.cwd(), "content");
  const allArticles = fs.readdirSync(folderPath);

  return {
    paths: allArticles.map((article) => ({
      params: {
        post: article.split(".")[0],
      },
    })),
    fallback: false,
  };
};
