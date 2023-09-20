import Charts from "../components/Chart";
import React from "react";
import Form from "../components/Form";

const Expense = () => {
  return (
    <div className="container  text-center drop-shadow-lg text-g">
      <h1 className="text-4xl py-8 w-full bg-slate-800 text-white rounded">
        Money Manager
      </h1>

      <div className="grid md:grid-cols-2 mt-16 gap-4 h-full w-full">
        <Charts className="w-full" />
        <Form className="w-full" />
      </div>
    </div>
  );
};

export default Expense;
