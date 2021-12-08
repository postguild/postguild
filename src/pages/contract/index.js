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
                    
                    <p className="c1">Thanks to the National Labor Relations Act, <span className="bold">you have a federally protected right to join a union</span> and strive alongside colleagues for a fair, safe and equitable workplace. This law protects wearing union buttons, shirts or stickers on the job, signing petitions and asking other employees to support the union. It means you can't be fired or otherwise retaliated against for participating in Guild activities or refusing to do work you feel is dangerous.</p>

                    <p className="c1"><span className="bold">Being a member of the Guild means you are not alone in any conflict with your boss or the company</span>. If a manager is discriminating against you, if you are unfairly disciplined, if you are being prevented from using sick time or other benefits guaranteed by the contract — these are all situations in which the Guild can help.</p>

                    <p className="c1">Below are some of the rights all Guild-covered employees should know about. The full Guild contract is available <a className="c12" href="https://www.wbng.org/wp-content/uploads/2016/10/Post_Guild_Contract_2018-2020_OCR_optimized1.pdf">here</a>.</p>

                    <p className="c1"><span className="c15 bold">You have a right to union representation at investigatory or disciplinary meetings with management.</span></p>
                    <p className="c1"><a className="c12" href="http://www.nage.org/login/assets/images/Weingarten%20Rights%20Q%20and%20A.pdf">Weingarten Rights</a> (named for a 1975 Supreme Court case) allow employees to request the presence of a steward at any meeting that could result in disciplinary measures. The steward can act as a witness, take notes and offer advice. We encourage employees to reach out to the Guild even if they are unsure whether a meeting qualifies.</p>

                    <p className="c1"><span className="c15 bold">You have a right to comp time, overtime, holiday and shift pay. </span></p>
                    <p className="c1">Most employees who earn less than $1,352 per week ($70,304 per year) are entitled to overtime pay whenever they work holidays or more than 40 hours in a week. Staffers who work evenings and overnights are also entitled to extra pay.</p>
                    <p className="c1">People who don't qualify for overtime are entitled to comp time for days they work outside their normal schedules. "On call" days also count, if they significantly interfere with employees' ability to enjoy their days off.</p>
                    <p className="c1"><span className="bold">Eligible employees must fill out their time sheets on Workday </span>to ensure they receive their comp time, overtime pay or night shift differential. If your manager denies your overtime or comp time, or instructs you not to mark extra hours on your timesheet, please reach out to a guild steward or <a className="c12" href="mailto:wapounion@gmail.com">wapounion@gmail.com</a>. The complete Guild guide to hours and pay is available <a href="https://postguild.org/the-post-guild-guide-to-hours-and-pay/">here</a>.</p>

                    <p className="c1"><span className="c15 bold">You have a right to paid sick leave.</span></p>
                    <p className="c1">Most employees earn up to 15 paid sick days per year for a mental or physical illness or doctor's appointments, or to care for a sick family member. You are not obligated to tell your boss why you are taking a sick day. <span className="bold">Your boss cannot require you to "make up" hours of work missed while you are on sick leave</span>. Nor can they hold your sick leave against you — for example, denying a pay raise because of an absence for a medical treatment. Employees should enter any sick leave they take on their time sheets.</p>

                    <p className="c1"><span className="c15 bold">You have a right to a pay review.</span></p>
                    <p className="c1">Employees who believe that they are being underpaid based on race, gender, religion or another aspect of their identity can initiate a pay equity review conducted by the Human Resources Department. HR will compare your salary to those of people doing similar jobs within and outside the company, then share findings with the employee and management. Trained guild members can assist you with the request and walk you through the steps. Contact <a className="c12" href="mailto:wapounion@gmail.com">wapounion@gmail.com</a> for help.</p>

                    <p className="c1"><span className="c15 bold">You have a right to object to unfair treatment.</span></p>
                    <p className="c1">If you feel you have been subject to unfair discipline or a contract violation — such as denial of overtime pay — you have 10 working days to file a grievance through the Guild. (So please contact the Guild as soon as possible!) The Guild will present the company with a written notice and arrange for a meeting at which you and Guild representatives can discuss the issue with management. <span className="bold">These meetings can force the company to reverse disciplinary actions or make reparations for unfair treatment.</span> Contact <a className="c12" href="mailto:sarahkaplan48@gmail.com">sarahkaplan48@gmail.com</a> if you want to file a grievance.</p>

                    <p className="c1"><span className="c15 bold">You have the right to opportunities for professional advancement.</span></p>
                    <p className="c1">Current employees have the right to first consideration for all job openings. If you are not selected for a job, you have the right to ask for an explanation of the company's choice and how you can prepare to be a better candidate in the future.</p>

                    <p className="c1"><span className="c8 bold">You have the right to fair and equal treatment.</span></p>
                    <p className="c1">If you believe you are being discriminated against based on regardless of race, sex, disability, religious affiliation or other protected status, please contact the Guild. In cases where groups of people are subject to discrimination — say, sections in which employees of color are consistently underpaid — the Guild can organize a grievance on the entire group's behalf. Remember that strength comes from solidarity and numbers; <span className="bold">our greatest power to make The Post a better, fairer workplace is in our capacity to act as a group.</span></p>

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
