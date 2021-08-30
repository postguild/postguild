import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import logo from "../img/GuildLogoFinalBug.png";

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: ""
    };
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: "is-active"
            })
          : this.setState({
              navBarActiveClass: ""
            });
      }
    );
  };

  render() {
    return (
      <nav
        className="navbar is-dark is-fixed-top"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              <img src={logo} alt="Washington Post Guild" />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-end has-text-centered">
              <Link className="navbar-item" to="/about-us/">
                About the Guild
              </Link>
              <Link className="navbar-item" to="/dues/">
                Join Us
              </Link>
              <Link className="navbar-item" to="/2019-pay-study/">
                <b>
                  <span role="img" aria-label="New">
                    ✨
                  </span>{" "}
                  Pay Study
                </b>
              </Link>
              <Link className="navbar-item" to="/leadership/">
                Leadership
              </Link>
              <Link className="navbar-item" to="/contract/">
                Our contract
              </Link>
              <Link className="navbar-item" to="/faq/">
                FAQ
              </Link>
              <Link className="navbar-item" to="/get-in-touch/">
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};

Navbar.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query NavbarQuery {
        allMdx(filter: { frontmatter: { templateKey: { eq: "about-page" } } }) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Navbar data={data} />}
  />
);
