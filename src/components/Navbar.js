import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import logo from "../img/GuildLogoFinalBug.png";

import { payStudyLinks } from "./PayStudyLinkbox";

const Navbar = props => {
  const [active, setActive] = useState(false);
  const [navBarActiveClass, setNavBarActiveClass] = useState("");

  const toggleHamburger = () => {
    // toggle the active boolean in the state
    // this.setState(
    //   {
    //     active: !this.state.active
    //   },
    //   // after state has been updated,
    //   () => {
    //     // set the class in state for the navbar accordingly
    //     this.state.active
    //       ? this.setState({
    //           navBarActiveClass: "is-active"
    //         })
    //       : this.setState({
    //           navBarActiveClass: ""
    //         });
    //   }
    // );

    let newState = !active;

    setActive(newState);
    setNavBarActiveClass(newState ? "is-active" : "");
  };

  return (
    <nav
      className="navbar is-fixed-top"
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
            className={`navbar-burger burger ${navBarActiveClass}`}
            data-target="navMenu"
            onClick={() => toggleHamburger()}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div id="navMenu" className={`navbar-menu ${navBarActiveClass}`}>
          <div className="navbar-end has-text-centered">
            <Link className="navbar-item" to="/about-us/">
              About the Guild
            </Link>
            <Link className="navbar-item" to="/dues/">
              Join Us
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link is-arrowless">Pay Study</a>
              <div className="navbar-dropdown">
                <Link className="navbar-item" to="/2022-pay-study/">
                  {" "}
                  2022 report (
                  <span role="img" aria-label="New">
                    ✨
                  </span>{" "}
                  New!)
                </Link>
                {payStudyLinks.map(d => {
                  return (
                    <Link className="navbar-item" to={d.url}>
                      ‣ {d.title}
                    </Link>
                  );
                })}
                <hr className="navbar-divider" />
                <Link className="navbar-item" to="/2019-pay-study/">
                  2019 report
                </Link>
              </div>
            </div>
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
