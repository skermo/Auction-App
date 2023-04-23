import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./tab.scss";

const Tabs = ({
  children,
  labels,
  className,
  Icons,
  selectedTab = 0,
  navigateTo = false,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(selectedTab);

  useEffect(() => {
    setSelectedIndex(selectedTab);
  }, [selectedTab]);

  const handleClick = (index) => {
    if (navigateTo) {
      labels[index] = labels[index].toLowerCase();
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
