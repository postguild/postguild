import React from "react";

import Layout from "../../components/Layout";
import Counter from "./calculator";
import { graphql, StaticQuery } from "gatsby";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div>Hello, hello</div>
        <Counter />
      </Layout>
    );
  }
}
