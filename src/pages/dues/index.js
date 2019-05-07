import React from "react";

import Layout from "../../components/Layout";
import Counter from "./calculator";
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
                  <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                    How much are my dues?
                  </h2>
                  <Counter />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
