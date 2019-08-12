import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";

class BlogList extends React.Component {
  render() {
    const { data, title } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <>
        <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
          Latest News
        </h2>
        <ul className="content">
          {posts &&
            posts.map(({ node: post }) => (
              <li>
                <p>
                  <Link className="has-text-primary" to={post.fields.slug}>
                    {post.frontmatter.title}
                  </Link>
                  <span> &bull; </span>
                  <span className="">{post.frontmatter.date}</span>
                </p>
              </li>
            ))}
        </ul>
      </>
    );
  }
}

BlogList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query BlogListQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogList data={data} count={count} />}
  />
);
