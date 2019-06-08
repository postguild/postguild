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
                <a href="/" title="The Washington Post Guild">
                  <img
                    className="header-logo"
                    src="/img/guildlogofinal-large.jpg"
                    alt="The Washington Post Guild Logo"
                  />
                </a>
                <div className="section content join-us">
                  <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                    Join Us
                  </h2>
                  <p>
                    Most non-managers at The Washington Post are guild-eligible.
                    If you're curious about your status, or interested in
                    joining the guild today, email us at{" "}
                    <a href="mailto:wapounion@gmail.com">wapounion@gmail.com</a>{" "}
                    and a member of guild leadership will get in touch.
                  </p>
                  <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                    How much are my dues?
                  </h2>
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
