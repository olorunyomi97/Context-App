import React, { Component, createContext } from 'react';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
    state = { 
        isAuthenticated: false
    }
    toggleAuth = () => {
        this.setState({ isAuthenticated : !this.state.isAuthenticated })
    }
    render() { 
        return ( 
            <AuthContextProvider value={{...this.state, toggleAuth: this.toggleAuth}}>
                { this.props.children } 
            </AuthContextProvider>
        );
    }
}
 
export default AuthContextProvider ;

