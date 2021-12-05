import { Button } from 'react-bootstrap';
import DeleteIcon from '../assets/images/activity-item-delete-button.png'
import EditTodo from '../assets/images/todo-title-edit-button.png';

import '../assets/style/Todo.scss'

const TodoList = ({ title, priority }) => {

    const Bullet = () => {
        if (priority === "very-high") {
            return <div className="label-indicator-very-high"></div>
        }
        else if (priority === "high") {
            return <div className="label-indicator-high"></div>
        }
        else if (priority === "normal") {
            return <div className="label-indicator-normal"></div>
        }
        else if (priority === "low") {
            return <div className="label-indicator-low"></div>
        }
        else if (priority === "very-low") {
            return <div className="label-indicator-low"></div>
        }
    }

    return (
        <>
            <div className="todo-card-list" data-cy="todo-item">
                <div className="left-menu">
                    <form action="#">
                        <input data-cy="todo-item-checkbox" type="checkbox" name="check" className="input-check" />
                    </form>
                    <Bullet />
                    <p data-cy="todo-item-title">{title}</p>
                    <Button data-cy="todo-item-edit-button" className="back">
                        <img src={EditTodo} alt="edit" />
                    </Button>
                </div>
                <div className="right-menu">
                    <Button data-cy="todo-item-delete-button" className="btn-delete-todo">
                        <img src={DeleteIcon} alt="icon-delete" />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default TodoList;