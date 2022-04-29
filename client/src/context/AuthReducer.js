const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    case "DESC":
      return {
        ...state,
        user: {
          ...state.user,
          desc: action.payload,
        },
      };
    case "CITY":
      return {
        ...state,
        user: {
          ...state.user,
          city: action.payload,
        },
      };
    case "PROFILEPIC":
      return {
        ...state,
        user: {
          ...state.user,
          profilePicture: action.payload,
        },
      };
    case "COVERPIC":
      return {
        ...state,
        user: {
          ...state.user,
          coverPicture: action.payload,
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
