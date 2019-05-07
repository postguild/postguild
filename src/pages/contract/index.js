import React from "react";

import Layout from "../../components/Layout";
import { Document, Page, Outline } from "react-pdf";
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
                  <PDFDisplay file="/pdf/Post_Guild_Contract_2018-2020_OCR_optimized1.pdf" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

class PDFDisplay extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  handlePageBack = () => {
    if (this.state.pageNumber > 1) {
      this.setState({ pageNumber: this.state.pageNumber - 1 });
    }
  };

  handlePageNext = () => {
    if (this.state.pageNumber < this.state.numPages) {
      this.setState({ pageNumber: this.state.pageNumber + 1 });
    }
  };

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <Document
          file={this.props.file}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Outline />
          <Page pageNumber={pageNumber} />
        </Document>
        <p className="page-number">
          <span
            className={
              "page-control page-back " +
              (this.state.pageNumber > 1 ? "active" : "inactive")
            }
            onClick={this.handlePageBack}
          >
            {"<<"}
          </span>{" "}
          Page {pageNumber} of {numPages}{" "}
          <span
            className={
              "page-control page-next " +
              (this.state.pageNumber < this.state.numPages
                ? "active"
                : "inactive")
            }
            onClick={this.handlePageNext}
          >
            {">>"}
          </span>
        </p>
      </div>
    );
  }
}
