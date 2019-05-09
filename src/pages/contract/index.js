import React from "react";

import Layout from "../../components/Layout";
import { PDFObject } from "react-pdfobject";
import "./contract.sass";
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
                  <p>Contract text here</p>
                  <PDFObject url="/pdf/Post_Guild_Contract_2018-2020_OCR_optimized1.pdf" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
