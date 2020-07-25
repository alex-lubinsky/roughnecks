import React from "react";
import { countClassOccurences, buildClassArray } from "../functions/levels";

const ClassBuilder = (props) => {
  const classArray = buildClassArray(props.pcClasses, props.subclasses);

  const getClass = (classes) => {
    const result = countClassOccurences(classes);
    let className = "";
    Object.keys(result).forEach((pcc) => {
      if (result[pcc].hasSubclass) {
        className = `${className} / ${pcc} - ${result[pcc].subclassName} (${result[pcc].level})`;
      } else {
        className = `${className} / ${pcc} (${result[pcc].level})`;
      }
    });

    return className.substring(3, className.length);
  };

  return <>{getClass(classArray)}</>;
};

export default ClassBuilder;
