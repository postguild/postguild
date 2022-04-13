import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import BlogList from "../components/BlogList";
import Content, { HTMLContent } from "../components/Content";
import SimpleSlider from "../components/Slider.js";
import { MDXRenderer } from "gatsby-plugin-mdx";

const IndexPageTemplate = ({ title, content, contentComponent }) => {
  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section index">
              <a href="/" title="The Washington Post Guild">
                <img
                  className="header-logo"
                  src="/img/guildlogofinal-large.jpg"
                  alt="The Washington Post Guild Logo"
                />
              </a>

              <div className="slider-container">
                <SimpleSlider />
              </div>

              <BlogList />

              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <MDXRenderer>{content}</MDXRenderer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

IndexPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const IndexPage = ({ data }) => {
  const { mdx: post } = data;

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <IndexPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.body}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPage($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
      }
    }
  }
`;
