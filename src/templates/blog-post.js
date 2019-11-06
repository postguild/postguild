import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const BlogPostTemplate = ({ content, contentComponent, title }) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <a href="/" title="The Washington Post Guild">
              <img
                className="header-logo"
                src="/img/guildlogofinal-large.jpg"
                alt="The Washington Post Guild Logo"
              />
            </a>
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light is-center">
              {title}
            </h1>
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        pathname={post.fields.slug}
        article={true}
      />
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
    }
  }
`;
