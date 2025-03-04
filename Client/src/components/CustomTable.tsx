import { useEffect, useState } from "react";
import { employeeProps } from "../App";

type tableProps = {
  list: employeeProps[];
};

const CustomTable = ({ list }: tableProps) => {
  let names: string[] = [];
  let positionLevel: string[] = [];
  console.log(list, "list");
  list.forEach((employee) => {
    if (employee.salary < 50000) {
      names.push(employee.name + " ");
      names.push("-> Entry level , ");
    } else {
      names.push(employee.name + " ");
      names.push("-> Senior , ");
    }
  });

  console.log(names);
  console.log(positionLevel);

  return (
    <div className={`w-[60vw] h-[70vh] bg-red-600 rounded-lg shadow-lg`}>
      <div className="justify-self-center">Table</div>
      <div className=" grid grid-cols w-full h-full bg-yellow-300">
        <div className="grid grid-rows-11 h-full bg-purple-400">
          <div className="row-span-1 flex justify-self-center">Employees</div>
          <div className="justify-self-center row-span-10 w-full flex self-start text-center  h-full">
            {names.join(" ")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
