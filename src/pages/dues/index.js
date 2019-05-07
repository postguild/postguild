import React from "react";

import Layout from "../../components/Layout";
import Calculator from "./calculator";
// import { graphql, StaticQuery } from "gatsby";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <section className="section section--gradient">
          <div className="container">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="section">
                  <Calculator />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
