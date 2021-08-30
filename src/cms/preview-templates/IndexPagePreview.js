import React from "react";
import PropTypes from "prop-types";
import IndexPage from "../../templates/index-page";

const IndexPagePreview = ({ entry, widgetFor }) => (
  <IndexPage
    title={entry.getIn(["data", "title"])}
    content={widgetFor("body")}
  />
);

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default IndexPagePreview;
