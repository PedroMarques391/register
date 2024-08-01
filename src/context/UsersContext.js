import { createContext, useReducer } from "react";
import users from "../data/users";

const UsersContext = createContext({})
const initialState = { users }

const actions = {
    createUser(state, action) {
        const user = action.payload
        user.id = Math.round(Math.random() * (Math.random() * 10000))
        return {
            ...state,
            users: [...state.users, user]
        }
    },
    updateUser(state, action) {
        const updated = action.payload
        return {
            ...state,
            users: state.users.map(
                user => user.id
                    === updated.id
                    ? updated
                    : user
            )
        }
    },
    deleteUser(state, action) {
        const user = action.payload
        return {
            ...state,
            users: state.users.filter(id => id.id !== user.id)
        }
    }
}

export const UsersProvider = ({ children }) => {

    function reducer(state, action) {
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <UsersContext.Provider value={{
            state,
            dispatch
        }}>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersContext


