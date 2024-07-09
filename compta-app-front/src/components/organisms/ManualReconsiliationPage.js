import React from "react";
import "./ManualReconsiliationPageStyle.css";
import ComptaTab from "../molecules/ComptaTab";
import BankStatementTab from "../molecules/BankStatementTab";
import ReconciliationGap from "../atoms/ReconciliationGap";
import AddButton from "../atoms/AddButton";
import ManualBankStatementMenu from "../atoms/ManualBankStatementMenu";

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

  const [bankStatementData, setBankStatementData] = useState([]) ;
  const [checkedBankStatementData_Ids, setCheckedBankStatementData_Ids] = useState([]) ;
  

  const [checkedData, setcheckedData] = useState([]);
  const printableRef = useRef(null); 

  const handlePrint = () => {
    const currentHTML = document.documentElement.outerHTML;

    const newWindow = window.open('', '_blank');
      newWindow.document.open();
      newWindow.document.write(currentHTML);
      newWindow.document.body.innerHTML = printableRef.current.innerHTML;
      newWindow.print();
      newWindow.close();
    } 
    const [isAddMenuVisible, setAddMenuVisibility] = useState(false);

    const showAddMenu = () => {
      setAddMenuVisibility(!isAddMenuVisible);
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
        <AddButton onClick={showAddMenu}/>
        <BankStatementTab
          totalDebitBank={totalDebitBank}
          totalCreditBank={totalCreditBank}
          updateTotalsBank={updateTotalsBank}
          setCheckedBankStatementData_Ids={setCheckedBankStatementData_Ids}
          bankStatementData={bankStatementData}
          setBankStatementData={setBankStatementData}
        />
      </div>
      <ManualBankStatementMenu  isVisible={isAddMenuVisible} onCloseAction={showAddMenu}  
        bankStatementData={bankStatementData}
        setBankStatementData={setBankStatementData}



      />
      <div id="gap-calculator-container" ref={printableRef}>
        <ReconciliationGap
          totalDebitCompta={totalDebitCompta}
          totalCreditCompta={totalCreditCompta}
          totalDebitBank={totalDebitBank}
          totalCreditBank={totalCreditBank}
          tableData={checkedData}
          bankStatementData={bankStatementData}
          checkedBankStatementData_Ids={checkedBankStatementData_Ids}
        />
      </div>
      <button onClick={handlePrint}>Imprimer</button>
    </div>
  );
}
