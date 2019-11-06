import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const PayStudyPageTemplate = ({
  title,
  byline,
  content,
  contentComponent
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section section--gradient pay-study">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <a href="/" title="The Washington Post Guild">
              <img
                className="header-logo"
                src="/img/guildlogofinal-large.jpg"
                alt="The Washington Post Guild Logo"
              />
            </a>

            <div className="section">
              <h2 className="title is-size-1 has-text-weight-bold has-text-centered">
                {title}
              </h2>
              <p className="byline">{byline}</p>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

PayStudyPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  byline: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const PayStudyPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        pathname={post.fields.slug}
        article={true}
      />
      <PayStudyPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        byline={post.frontmatter.byline}
        content={post.html}
      />
    </Layout>
  );
};

PayStudyPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default PayStudyPage;

export const payStudyPageQuery = graphql`
  query PayStudyPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        byline
        description
      }
    }
  }
`;
