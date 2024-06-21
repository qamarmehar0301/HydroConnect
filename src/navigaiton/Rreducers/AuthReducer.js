export const SignInReducer = (state, action) => {
    switch (action.type) {
        case 'SIGN_IN_STATE':
            return {
                userToken: action.payload.userToken
            }
        case 'LOGOUT':
            return {
                userToken: null
            };
        default:
            return state
    }
}