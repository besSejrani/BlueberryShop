import React, { useState } from "react";

// Next
import Link from "next/link";

// React-Hook-Form
import { useForm } from "react-hook-form";

// Material-UI
import { Container, Box, Typography, Card } from "@material-ui/core";

// Components
import InputForm from "@Components/InputForm/InputForm";

// Moment
import moment from "moment";

// MDX
import { getAllFilesFrontMatter } from "../../Blog/mdx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// =================================================================

type FormValues = {
  search: string;
};

const Blog = ({ posts }) => {
  const classes = useStyles();

  // State
  const [search, setSearch] = useState("");

  // React Hook Form
  const { register, errors, handleSubmit } = useForm<FormValues>({
    criteriaMode: "all",
  });

  // Events
  const onSubmit = async (form) => {
    console.log(form);
  };

  const filteredBlogPosts = posts
    .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)))
    .filter((frontMatter) => frontMatter.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <Container>
      <Card style={{ padding: 20, margin: "20px 0px", borderRadius: 15 }}>
        <Box>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <InputForm
              type="text"
              name="blog"
              label="Search Articles"
              id="blog-search"
              value={search}
              onChange={setSearch}
              inputRef={register({
                required: "This field is required",
              })}
              errors={errors}
            />
          </form>
        </Box>

        {!filteredBlogPosts.length && <Typography variant="body1">Sorry no posts found</Typography>}

        {filteredBlogPosts.map((page) => {
          return (
            <Link href={`blog/${page.slug}`} key={page.title}>
              <Card style={{ padding: 20, margin: "20px 0px", borderRadius: 15, cursor: "pointer" }}>
                <Typography variant="h6">{page?.title}</Typography>
                <Typography variant="body1">{moment(page?.publishedAt).format("DD.MM.yyyy")}</Typography>
                <Typography variant="body1">{page?.summary}</Typography>
                <Typography variant="body1">{page?.slug}</Typography>
              </Card>
            </Link>
          );
        })}
      </Card>
    </Container>
  );
};

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter();

  return { props: { posts } };
}

export default Blog;
// ==================================================================

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      margin: "50px 0px",
    },
  })
);
