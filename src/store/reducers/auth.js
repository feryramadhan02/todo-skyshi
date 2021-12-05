import * as type from "../actions/types";

const initialState = {
    token: null,
    isAuthenticate: false,
    isLoading: true,
    todoData: [],
    detailTodo: []
}

export const auth = (state = initialState, action) => {
    switch (action.type) {
        default:
            return {
                ...state
            }
        case type.Success_add_data:
            return {
                ...state,
                isAuthenticate: true,
                isLoading: false
            }
        case type.Failed_add_data:
            return {
                ...state,
                isAuthenticate: initialState.isAuthenticate,
                isLoading: initialState.isLoading
            }
        case type.Success_get_data:
            return {
                ...state,
                isAuthenticate: true,
                isLoading: false,
                todoData: action.payload
            }
        case type.Failed_get_data:
            return {
                ...state,
                isAuthenticate: initialState.isAuthenticate,
                isLoading: initialState.isLoading,
                todoData: initialState.todoData
            }
        case type.Success_delete_data:
            return {
                ...state,
                isAuthenticate: true,
                isLoading: false,
                todoData: state.todoData.filter((item) => item.id !== action.payload)
            }
        case type.Failed_delete_data:
            return {
                ...state,
                isAuthenticate: initialState.isAuthenticate,
                isLoading: initialState.isLoading
            }
        case type.Get_detail:
            return {
                ...state,
                isAuthenticate: true,
                isLoading: false,
                detailTodo: action.payload
            }
        case type.Get_detail_failed:
            return {
                ...state,
                isAuthenticate: initialState.isAuthenticate,
                isLoading: initialState.isLoading,
                detailTodo: initialState.detailTodo
            }
        case type.Success_add_todo:
            return {
                ...state,
                isAuthenticate: true,
                isLoading: false
            }
        case type.Failed_add_todo:
            return {
                ...state,
                isAuthenticate: initialState.isAuthenticate,
                isLoading: initialState.isLoading
            }
    }

}
