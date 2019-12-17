import React from "react";

import Layout from "../../components/Layout";
import "./contract.scss";

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

                <div className="section">
                  <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                    Guild Contract
                  </h2>
                  <div className="content">
                    <p>
                      The Post Guild bargaining committee spent more than a year
                      negotiating our current contract, which expires in June
                      2020. It was a tough fight that yielded a solid contract,
                      but there’s much we wanted that The Post refused to give
                      us. We’ll do better next time — but we need your help.
                    </p>
                    <p>
                      We’ve compiled a round-up of new rights and key existing
                      ones, along with the pages where you can find them in the
                      contract:
                    </p>

                    <ul>
                      <li>
                        <span className="tag is-warning">NEW</span>{" "}
                        <strong>
                          You have the right to request a pay review from HR.
                        </strong>{" "}
                        Pay inequity is a pervasive issue in our industry and
                        newsroom, so during 2018 contract negotiations the Guild
                        fought for a clause in the contract that empowers
                        employees to ask for information about pay scales in
                        their departments.
                      </li>
                      <li>
                        <span className="tag is-warning">NEW</span>{" "}
                        <strong>
                          You get a Guild-negotiated cost of living raise.
                        </strong>{" "}
                        Every year, Post management grants merit raises to about
                        one-third of staffers. The pay increase in the contract
                        guarantees that, even without a merit raise, all
                        employees see an annual bump of at least $780. (Page 15)
                      </li>
                      <li>
                        <span className="tag is-warning">NEW</span>{" "}
                        <strong>
                          Your parental leave benefits have fewer restrictions.
                        </strong>{" "}
                        Before this contract, parents who were both Post
                        employees had to split their four weeks of paid leave.
                        The Guild convinced The Post to eliminate that
                        stipulation, though management refused to budge on other
                        parental leave asks.
                      </li>
                      <li>
                        <strong>
                          Shift workers earn extra for their nighttime hours.
                        </strong>{" "}
                        For each shift worked that starts between 2 p.m. and
                        9:59 p.m., employees receive $6. For each shift that
                        begins between 10 p.m. and 5:59 a.m., employees receive
                        $7.50. This is not automatically added to your salary.
                        You must manually enter your relevant shifts. (Page 15)
                      </li>
                      <li>
                        <strong>
                          You are entitled to overtime pay and/or comp time.
                        </strong>{" "}
                        Employees earning $1,352 per week or less ($70,304 per
                        year) are entitled to time and a half pay for all hours
                        worked beyond 40 in a week, with some exceptions. Anyone
                        who earns more than $1,352 per week is entitled to comp
                        time for any day worked outside their regular weekly
                        schedule. (Page 20)
                      </li>
                      <li>
                        <strong>
                          You have the right to opportunities for advancement.
                        </strong>{" "}
                        The Post must publish notices of all job openings and
                        give first consideration to current employees. If you
                        are not selected for a promotion or transfer, you have
                        the right to request an explanation for the decision and
                        guidance about whether you would be considered for such
                        a job in the future. (Pages 17 and 18)
                      </li>
                    </ul>

                    <p>
                      View the full contract{" "}
                      <a
                        title="PDF of the latest contract"
                        href="http://www.wbng.org/wp-content/uploads/2016/10/Post_Guild_Contract_2018-2020_OCR_optimized1.pdf"
                      >
                        here (PDF)
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
