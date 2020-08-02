import React, { useReducer } from 'react'

export const GlobalContext = React.createContext();

const initialState = {
    themeSelectValue: "default"
}

const reducer = (state, action) => {
    switch (action.type) {
        case "setThemeSelectValue":
            return {
                ...state,
                themeSelectValue: action.snippet
            }
        default:
            return state;
    }
}

export const GlobalState = props => {
    const globalState = useReducer(reducer, initialState);
    return (
        <GlobalContext.Provider value={globalState}>
            {props.children}
        </GlobalContext.Provider>
    )
}