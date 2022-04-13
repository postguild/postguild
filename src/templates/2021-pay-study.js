import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import ScrollToTop from "react-scroll-to-top";
import PropTypes from "prop-types";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import H2 from "../components/H2";
import PayGraphics from "../components/PayGraphics";
import PercentilePlot from "../components/PercentilePlot";
import { PayStudyLinkbox } from "../components/PayStudyLinkbox";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

library.add(faAngleDown);

const InPageNavigation = ({ toc }) => {
  const [visible, setVisible] = useState(false);
  const onScroll = () => {
    setVisible(document.documentElement.scrollTop > 800);
  };
  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    // Remove listener on unmount
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  // console.log(toc)

  return (
    <div className={`sticky-wrapper ${visible ? "visible" : "hidden"}`}>
      <aside id="toc-menu" className="menu">
        <ul class="menu-list">
          {toc.items &&
            toc.items.map(heading => {
              return (
                <li key={heading.url}>
                  <a href={heading.url}>{heading.title}</a>
                </li>
              );
            })}
        </ul>
      </aside>
    </div>
  );
};

const PayStudyPageTemplate = ({
  title,
  byline,
  subhed,
  seriesTag,
  toc,
  content,
  contentComponent
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section section--gradient pay-study pay-study-22">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            {seriesTag === "Part 1" ? (
              <img
                className="pay-study-topper"
                src="/img/Guild_SocialHeader.jpg"
                alt="The Washington Post Guild"
              />
            ) : (
              <a href="/" title="The Washington Post Guild">
                <img
                  className="header-logo"
                  src="/img/guildlogofinal-large.jpg"
                  alt="The Washington Post Guild Logo"
                />
              </a>
            )}

            <div className="section">
              <h4 className="kicker is-size-5 has-text-weight-bold">{title}</h4>
              <h1 className="title is-size-2 has-text-weight-bold">{subhed}</h1>
              <p className="byline">{byline}</p>
              {/* {toc.items.map((i) => {
                return i.url
              })} */}

              <MDXProvider
                components={{
                  PercentilePlot,
                  PayGraphics,
                  PayStudyLinkbox: props => (
                    <PayStudyLinkbox seriesTag={seriesTag} {...props} />
                  ),
                  h2: H2
                }}
              >
                <MDXRenderer
                  components={{
                    PercentilePlot,
                    PayGraphics,
                    PayStudyLinkbox: props => (
                      <PayStudyLinkbox seriesTag={seriesTag} {...props} />
                    ),
                    h2: H2
                  }}
                >
                  {content}
                </MDXRenderer>
              </MDXProvider>
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

const PayStudyPage21 = ({ data }) => {
  const { mdx: post } = data;

  return (
    <>
      {post.tableOfContents.items && post.tableOfContents.items.length > 1 && (
        <InPageNavigation toc={post.tableOfContents} />
      )}
      <div
        className={`${post.tableOfContents.items.length > 1 &&
          "non-sticky-content"}`}
      >
        <ScrollToTop smooth color="#f31550" top={800} />
        <Layout>
          <SEO
            title={`${post.frontmatter.title}: ${post.frontmatter.subhed}`}
            description={post.frontmatter.description}
            pathname={post.fields.slug}
            article={true}
            image={"/img/Guild_WebsiteHeader.jpg"}
          />
          <PayStudyPageTemplate
            contentComponent={HTMLContent}
            title={`${post.frontmatter.title}`}
            subhed={post.frontmatter.subhed}
            seriesTag={post.frontmatter.seriesTag}
            byline={post.frontmatter.byline}
            content={post.body}
            toc={post.tableOfContents}
          />
        </Layout>
      </div>
    </>
  );
};

PayStudyPage21.propTypes = {
  data: PropTypes.object.isRequired
};

export default PayStudyPage21;

export const payStudyPageQuery = graphql`
  query PayStudyPage21($id: String!) {
    mdx(id: { eq: $id }) {
      body
      tableOfContents
      fields {
        slug
      }
      frontmatter {
        title
        subhed
        seriesTag
        byline
        description
      }
    }
  }
`;
