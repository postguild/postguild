import React, { useEffect, useState } from "react";
// import payData from "../../static/data/pay_study_int_data.csv"
const d3 = require("d3");
const payData = require("../../static/data/pay_study_int_data.json");

export default function PayGraphics(props) {
  return (
    <div>
      {console.log(payData)
      //     payData.map(d => {
      //       return d['level1']
      //   })
      }
    </div>
  );
}
