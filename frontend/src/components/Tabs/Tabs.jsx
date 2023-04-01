import classNames from "classnames";
import React, { useState } from "react";
import "./tab.scss";

const Tabs = ({ children, labels, className }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={className}>
      <div className="tabs">
        {labels.map((value, key) => (
          <button
            key={`tab-${key}`}
            onClick={() => handleClick(key)}
            onFocus={() => {
              setSelectedIndex(key);
            }}
            className={classNames("tab-list-item", {
              "tab-list-active": selectedIndex === key,
            })}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="content">{children[selectedIndex]}</div>
    </div>
  );
};

export default Tabs;
