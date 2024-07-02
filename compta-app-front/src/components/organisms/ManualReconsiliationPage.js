import React from "react";
import "./ManualReconsiliationPageStyle.css";
import ComptaTab from "../molecules/ComptaTab";
import BankStatementTab from "../molecules/BankStatementTab";
import ReconciliationGap from "../atoms/ReconciliationGap";
import { useState, useEffect, useRef } from "react";

export default function ManualReconsiliationPage() {
  const [totalDebitCompta, setTotalDebitCompta] = useState(0);
  const [totalCreditCompta, setTotalCreditCompta] = useState(0);
  const updateTotalsCompta = (debitTotal, creditTotal) => {
    setTotalDebitCompta(debitTotal);
    setTotalCreditCompta(creditTotal);
  };

  const [totalDebitBank, setTotalDebitBank] = useState(0);
  const [totalCreditBank, setTotalCreditBank] = useState(0);
  const updateTotalsBank = (debitTotal, creditTotal) => {
    setTotalDebitBank(debitTotal);
    setTotalCreditBank(creditTotal);
  };

  const [checkedData, setcheckedData] = useState([]);
  const printableRef = useRef(null); 

  const handlePrint = () => {
    const currentHTML = document.documentElement.outerHTML;

    const newWindow = window.open('', '_blank');
      newWindow.document.open();
      newWindow.document.write(currentHTML);
      newWindow.document.body.innerHTML = document.getElementById('gap-calculator-container').innerHTML;
      newWindow.print();

    } 

  

  return (
    <div>
      <div className="tables-wrapper">
        <ComptaTab
          totalDebitCompta={totalDebitCompta}
          totalCreditCompta={totalCreditCompta}
          updateTotalsCompta={updateTotalsCompta}
          setcheckedData={setcheckedData}
        />
        <BankStatementTab
          totalDebitBank={totalDebitBank}
          totalCreditBank={totalCreditBank}
          updateTotalsBank={updateTotalsBank}
        />
      </div>
      <div id="gap-calculator-container" ref={printableRef}>
        <ReconciliationGap
          totalDebitCompta={totalDebitCompta}
          totalCreditCompta={totalCreditCompta}
          totalDebitBank={totalDebitBank}
          totalCreditBank={totalCreditBank}
          tableData={checkedData}
        />
      </div>
      <button onClick={handlePrint}>Imprimer</button>
    </div>
  );
}
