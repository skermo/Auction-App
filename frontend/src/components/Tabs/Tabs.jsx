import classNames from "classnames/bind";
import React, { useRef, useState } from "react";
import "./tab.scss";

const Tabs = ({ children, labels }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  const tabRefs = useRef({});

  return (
    <div>
      <div className="tabs">
        {labels.map((value, key) => (
          <button
            key={`tab-${key}`}
            onClick={() => handleClick(key)}
            ref={(element) => (tabRefs.current[key] = element)}
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
      <div>{children[selectedIndex]}</div>
    </div>
  );
};

export default Tabs;
