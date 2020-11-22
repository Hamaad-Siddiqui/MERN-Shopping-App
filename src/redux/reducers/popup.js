const popup = (state = false, action) => {
  switch (action.type) {
    case "OPEN":
      return (state = true);
    case "CLOSE":
      return (state = false);
    default:
      return state;
  }
};

export default popup;
