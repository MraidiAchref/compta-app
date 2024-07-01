import React from "react";
import "./ManualReconsiliationPageStyle.css";
import ComptaTab from "../molecules/ComptaTab";
import BankStatementTab from "../molecules/BankStatementTab";
import ReconciliationGap from "../atoms/ReconciliationGap";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    console.log(checkedData);
  }, [checkedData]);

  const handlePrint = () => {
    const printableElement = document.getElementById(
      "gap-calculator-container"
    );
    const originalContents = document.body.innerHTML;
    const printContents = printableElement.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

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
      <div id="gap-calculator-container">
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
