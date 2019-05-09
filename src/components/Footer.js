import React from "react";

import logo from "../img/GuildLogoFinalAlt.png";
import facebook from "../img/social/facebook.svg";
import twitter from "../img/social/twitter.svg";

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="columns">
          <div className="column is-8 has-text-centered">
            <img
              src={logo}
              alt="The Washington Post Guild logo"
              style={{ width: "14em" }}
            />
          </div>

          <div className="column is-4 social has-text-centered">
            <a
              title="facebook"
              href="https://www.facebook.com/groups/WaPoGuild/"
            >
              <img
                src={facebook}
                alt="Facebook"
                style={{ width: "1em", height: "1em" }}
              />
            </a>
            <a title="twitter" href="https://twitter.com/postguild?lang=en">
              <img
                className="fas fa-lg"
                src={twitter}
                alt="Twitter"
                style={{ width: "1em", height: "1em" }}
              />
            </a>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
