import React, { useState } from "react";
import Context from "./Context";

const Provider = (props) => {
  const [searchCriteria, setSearchCriteria] = useState("");

  const aCallback = () => {
    alert(`viva ${searchCriteria}`);
  };

  const logSearchCriteria = () => {
    console.log(`el search criteria es laconchade${searchCriteria}`);
  };

  return (
    <Context.Provider
      value={{
        searchCriteria,
        updateSearchCriteria: (searchCriteria) => setSearchCriteria(searchCriteria),
        logSearchCriteria: logSearchCriteria,
        aCallback: aCallback
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
