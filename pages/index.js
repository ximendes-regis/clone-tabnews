import React from "react";
import ReactDOM from "react-dom";

function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-gray-800">Site em Construção</h1>
      <p className="text-lg text-gray-600 mt-4">
        Estamos trabalhando para trazer algo incrível em breve!
      </p>
      <div className="mt-6">
        <span className="inline-block w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></span>
      </div>
    </div>
  );
}

// ReactDOM.render(<UnderConstruction />, document.getElementById("root"));
export default UnderConstruction;
