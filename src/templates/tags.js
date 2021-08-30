import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import BlogList from "../components/BlogList";
import Content, { HTMLContent } from "../components/Content";
import SimpleSlider from "../components/Slider.js";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

const TagPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section section--gradient">
      <MDXProvider>
        <MDXRenderer>{content}</MDXRenderer>
      </MDXProvider>
    </section>
  );
};

TagPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const TagPage = ({ data }) => {
  const { mdx: post } = data;

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <TagPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.body}
      />
    </Layout>
  );
};

TagPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default TagPage;

export const pageQuery = graphql`
  query TagPage($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
      }
    }
  }
`;
