const responseReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET_RESPONSE":
        return action.response;
      default:
        return state;
    }
  };
  
  export default responseReducer;
  