import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./tab.scss";

const Tabs = ({ children, labels, className, Icons, selectedTab }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(selectedTab || 0);

  useEffect(() => {
    if (selectedTab || selectedTab === 0) {
      setSelectedIndex(selectedTab);
    } else {
      setSelectedIndex(0);
    }
  }, [selectedTab]);

  const handleClick = (index) => {
    if (selectedTab || selectedTab === 0) {
      navigate(`/my-account/${id}/${labels[index]}`);
    }
    setSelectedIndex(index);
  };

  return (
    <div className={className}>
      <div className="tabs">
        {labels.map((value, key) => (
          <button
            key={`tab-${key}`}
            onClick={() => {
              handleClick(key);
            }}
            onFocus={() => {
              setSelectedIndex(key);
            }}
            className={classNames("tab-list-item", {
              "tab-list-active": selectedIndex === key,
            })}
          >
            {Icons && <img src={Icons[key]} alt="icon" />}
            {value}
          </button>
        ))}
      </div>
      <div className="content">{children[selectedIndex]}</div>
    </div>
  );
};

export default Tabs;
