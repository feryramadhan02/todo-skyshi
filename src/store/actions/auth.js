import * as type from "./types";
import axios from "axios";
import Swal from 'sweetalert2'
import '../../assets/style/Alert.scss'
import Icon from '../../assets/images/modal-information-icon.png'

const baseUrl = 'https://todo.api.devcode.gethired.id/activity-groups'
const baseUrlTodo = "https://todo.api.devcode.gethired.id/todo-items"

export const getAllTodo = (email) => async (dispatch) => {
    try {
        const res = await axios.get(`${baseUrl}`, {
            params: {
                email: email
            }
        });
        if (res.status === 200) {
            dispatch({
                type: type.Success_get_data,
                payload: res.data.data
            });
        }
    } catch (error) {
        dispatch({
            type: type.Failed_get_data,
            payload: error.response.data
        });
    }
};

export const addTodo = (value) => async (dispatch) => {
    try {
        const res = await axios.post(`${baseUrl}`, value);
        if (res.status === 200 || res.status === 201) {
            dispatch({
                type: type.Success_add_data,
                payload: res.data
            });
        }
    } catch (error) {
        dispatch({
            type: type.Failed_add_data,
            payload: error.response.data
        });
    }
};

export const deleteTodo = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`${baseUrl}/${id}`);
        if (res.status === 200) {
            dispatch({
                type: type.Success_delete_data,
                payload: id
            });
            Swal.fire({
                html: `<img src=${Icon} alt="info" /> Activity berhasil dihapus`
            })
        }
    } catch (error) {
        dispatch({
            type: type.Failed_delete_data,
            payload: error.response.data
        });
    }
};

export const getDetailTodo = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${baseUrl}/${id}`)
        if (res.status === 200) {
            dispatch({
                type: type.Get_detail,
                payload: res.data
            });
        }
    } catch (error) {
        dispatch({
            type: type.Get_detail_failed,
            payload: error.response.data
        });
    }
};

export const addTodoList = (value) => async (dispatch) => {
    try {
        const res = await axios.post(`${baseUrlTodo}`, value);
        if (res.status === 200 || res.status === 201) {
            dispatch({
                type: type.Success_add_todo,
                payload: res.data
            });
        }
    } catch (error) {
        dispatch({
            type: type.Failed_add_todo,
            payload: error.response.data
        });
    }
};
