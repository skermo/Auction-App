export const customStyle1 = {
  control: (base, state) => ({
    ...base,
    width: "262px",
    height: "48px",
    textAlign: "left",
    border: state.isSelected ? "1px solid #252525" : "1px solid #d8d8d8",
    borderRadius: "0",
    color: state.isSelected ? "white" : "#252525",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#252525",
    },
    padding: "0 5px",
  }),
  menu: (styles) => ({
    ...styles,
    width: "262px",
    textAlign: "left",
    borderRadius: "0",
  }),
  option: (base, state) => ({
    ...base,
    color: state.isSelected ? "white" : "#252525",
    backgroundColor: state.isSelected ? "#8367D8" : "white",
    "&:hover": {
      backgroundColor: "#8367D8",
      color: "white",
    },
    fontFamily: "Lato, sans-serif",
    fontWeight: "400",
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#252525",
    };
  },
};

export const customStyle2 = {
  control: (base, state) => ({
    ...base,
    margin: "15px 0",
    backgroundColor: "#fcfcfc",
    width: "100%",
    height: "48px",
    textAlign: "left",
    border: state.isSelected ? "1px solid #252525" : "1px solid #d8d8d8",
    borderRadius: "0",
    color: state.isSelected ? "white" : "#252525",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#252525",
    },
    padding: "0 5px",
  }),
  menu: (styles) => ({
    ...styles,
    width: "262px",
    textAlign: "left",
    borderRadius: "0",
  }),
  option: (base, state) => ({
    ...base,
    color: state.isSelected ? "white" : "#252525",
    backgroundColor: state.isSelected ? "#8367D8" : "white",
    "&:hover": {
      backgroundColor: "#8367D8",
      color: "white",
    },
    fontFamily: "Lato, sans-serif",
    fontWeight: "400",
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#252525",
    };
  },
};

export const customStyle3 = {
  control: (base, state) => ({
    ...base,
    margin: "15px 0",
    backgroundColor: "#fcfcfc",
    width: "100%",
    height: "30px",
    padding: "2%",
    textAlign: "left",
    border: state.isSelected ? "1px solid #252525" : "1px solid #d8d8d8",
    borderRadius: "0",
    color: state.isSelected ? "white" : "#252525",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#252525",
    },
  }),
  menu: (styles) => ({
    ...styles,
    width: "100%",
    textAlign: "left",
    borderRadius: "0",
  }),
  option: (base, state) => ({
    ...base,
    color: state.isSelected ? "white" : "#252525",
    backgroundColor: state.isSelected ? "#8367D8" : "white",
    "&:hover": {
      backgroundColor: "#8367D8",
      color: "white",
    },
    fontFamily: "Lato, sans-serif",
    fontWeight: "400",
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#252525",
    };
  },
  dropdownIndicator: (base) => ({
    ...base,
    paddingBottom: "2px",
  }),
};

export const customStyle4 = {
  container: () => ({
    position: "static",
    boxSizing: "border-box",
  }),
  control: (base, state) => ({
    ...base,
    width: "262px",
    height: "48px",
    textAlign: "left",
    border: state.isSelected ? "1px solid #252525" : "1px solid #d8d8d8",
    borderRadius: "0",
    color: state.isSelected ? "white" : "#252525",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#252525",
    },
    padding: "0 5px",
  }),
  menu: (styles) => ({
    ...styles,
    width: "262px",
    textAlign: "left",
    borderRadius: "0",
  }),
  option: (base, state) => ({
    ...base,
    color: state.isSelected ? "white" : "#252525",
    backgroundColor: state.isSelected ? "#8367D8" : "white",
    "&:hover": {
      backgroundColor: "#8367D8",
      color: "white",
    },
    fontFamily: "Lato, sans-serif",
    fontWeight: "400",
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#252525",
    };
  },
};
