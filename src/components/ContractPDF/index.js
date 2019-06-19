import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import pdfpath from "./Post_Guild_Contract_2018-2020_OCR_optimized1.pdf";

import "./pdf.scss";

const Pagination = ({ pageNumber, numPages, previousPage, nextPage }) => (
  <nav className="pagination" role="navigation" aria-label="pagination">
    <div className="is-field is-group is-left">
      <button
        type="button"
        className="button"
        disabled={pageNumber <= 1}
        onClick={previousPage}
      >
        Previous
      </button>
      <button
        type="button"
        className="button"
        disabled={pageNumber >= numPages}
        onClick={nextPage}
      >
        Next
      </button>
    </div>

    <div className="is-field is-group is-right">
      <p>
        Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
      </p>
    </div>
  </nav>
);

export default class ContractPDF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1
    };
  }

  componentDidMount() {
    // https://github.com/wojtekmaj/react-pdf#standard-browserify-and-others
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
      pdfjs.version
    }/pdf.worker.js`;
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  changePage = offset =>
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + offset
    }));

  previousPage = _ => this.changePage(-1);

  nextPage = _ => this.changePage(1);

  render() {
    const { numPages, pageNumber } = this.state;

    return (
      <React.Fragment>
        <Document file={pdfpath} onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
          <Pagination
            pageNumber={pageNumber}
            numPages={numPages}
            previousPage={this.previousPage}
            nextPage={this.nextPage}
          />
        </Document>
      </React.Fragment>
    );
  }
}
