import hydrate from "next-mdx-remote/hydrate";
import MdxComponents from "@Components/Blog/MDXComponents";

// Material-UI
import { Container } from "@material-ui/core";

import { getFileByPost, getFiles } from "../../Mdx/mdx";

// ========================================================================================================

export default function Blog(props) {
  const content = hydrate(props.mdxSource, {
    components: MdxComponents,
  });

  return <Container>{content}</Container>;
}

export const getStaticProps = async ({ params }) => {
  const post = await getFileByPost(params);

  return {
    props: post,
  };
};

export const getStaticPaths = async () => {
  const posts = await getFiles();

  return {
    paths: posts.map((post) => ({
      params: {
        post,
      },
    })),
    fallback: false,
  };
};
