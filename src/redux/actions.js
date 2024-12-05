// actions.js
export const loginUser = (credentials) => async (dispatch) => {
    const { email, password, role } = credentials;
  
    try {
      const response = await fetch("/api/login", { // Replace with your actual API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });
  
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
  
      const data = await response.json();
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      });
      return data; // Return user data on successful login
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.message,
      });
      throw error; // Rethrow error to be handled in the component
    }
  };
  
  export const setErrorMessage = (message) => {
    return {
      type: "SET_ERROR_MESSAGE",
      payload: message,
    };
  };
  