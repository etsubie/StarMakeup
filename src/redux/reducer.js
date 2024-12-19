const initialState = {
    user: null,
    errorMessage: "",
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN_SUCCESS":
        return {
          ...state,
          user: action.payload,
        };
      case "LOGIN_FAILURE":
        return {
          ...state,
          errorMessage: action.payload,
        };
      case "SET_ERROR_MESSAGE":
        return {
          ...state,
          errorMessage: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  