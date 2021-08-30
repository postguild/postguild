import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";

export const HTMLContent = ({ content, className }) => (
  <MDXRenderer>{content}</MDXRenderer>
);

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
);

HTMLContent.propTypes = Content.propTypes;

export default Content;
