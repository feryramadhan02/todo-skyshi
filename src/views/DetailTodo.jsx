import { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Modal, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import ArrowBack from '../assets/images/todo-back-button.png'
import { addTodoList, getDetailTodo } from '../store/actions/auth';
import EmptyTodo from '../assets/images/todo-empty-state.png';
import EditTodo from '../assets/images/todo-title-edit-button.png';
import SortTodo from '../assets/images/arrow-sort.png';
import Select from "react-select";
import TodoList from '../components/TodoList';

import '../assets/style/Detail.scss'

const DetailTodo = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const [priority, setPriority] = useState("very-high");
    const { detailTodo, isLoading } = useSelector((state) => state.auth)
    const [body, setBody] = useState({
        text: "",
    })

    const handleInput = (e) => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
    }

    const items = detailTodo.todo_items

    useEffect(() => {
        dispatch(getDetailTodo(id))
    }, [dispatch, id, show])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const options = [
        {
            value: "very-high",
            label: "Very High",
        },
        {
            value: "high",
            label: "High",
        },
        {
            value: "normal",
            label: "Medium",
        },
        {
            value: "low",
            label: "Low",
        },
        {
            value: "very-low",
            label: "Very Low",
        },
    ];

    const formatOptionLabel = ({ value, label }) => (
        <div
            data-cy="modal-add-priority-item"
            className="d-flex align-items-center"
        >
            <div className={`label-indicator-${value}`}></div>
            <div>{label}</div>
        </div>
    )
    const DropdownList = () => {
        return <div data-cy="modal-add-priority-dropdown" className="icon-dropdown mr-2"></div>;
    }

    const addNewTodo = async (e) => {
        e.preventDefault()
        let data = {
            "activity_group_id": id,
            "priority": priority,
            "title": body.text
        }
        setLoading(true)
        await dispatch(addTodoList(data))
        setLoading(isLoading)
        setShow(false)
    }

    return (
        <>
            <div className="main-layout">
                <section className="head-action">
                    <div className="title-todo-action">
                        <Button data-cy="todo-back-button" className="back" onClick={() => navigate(-1)}>
                            <img src={ArrowBack} alt="back" />
                        </Button>
                        <h1 data-cy="todo-title" className="title">
                            {detailTodo.title}
                        </h1>
                        <Button data-cy="todo-title-edit-button" className="back">
                            <img src={EditTodo} alt="edit" />
                        </Button>
                    </div>
                    <div className="add-sort-action">
                        <Button data-cy="todo-sort-button" className="sorting">
                            <img src={SortTodo} alt="edit" />
                        </Button>
                        {loading ?
                            <Button data-cy="todo-add-button" disabled className="btn-add-todo">
                                <Spinner animation="border" variant="light" />
                            </Button>
                            :
                            <Button data-cy="todo-add-button" className="btn-add-todo" onClick={handleShow}>
                                <span data-cy="tabler:plus">+</span> Tambah
                            </Button>
                        }
                    </div>
                </section>
                <section className="data-todo-wrapper">
                    {items ?
                        <>
                            {items.length !== 0 ?
                                <>
                                    {detailTodo.todo_items.map((item) => (
                                        <div key={item.id} style={{ width: '100%' }}>
                                            <TodoList title={item.title} priority={item.priority} />
                                        </div>
                                    ))}
                                </>
                                :
                                <div data-cy="todo-empty-state" className="icon-no-todo">
                                    <img src={EmptyTodo} alt="no-todo" />
                                </div>
                            }
                        </>
                        :
                        <h2>Loading...</h2>
                    }
                </section>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="mod-header">
                    <Modal.Title className="modals-title" data-cy="modal-add-title">Tambah List Item</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mod-body">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label data-cy="modal-add-name-title" className="label">NAMA LIST ITEM</Form.Label>
                            <Form.Control
                                data-cy="modal-add-name-input"
                                className="name-activity"
                                type="text" name="text"
                                placeholder="Tambahkan nama activity"
                                value={body.text}
                                onChange={handleInput}
                            />
                        </Form.Group>

                        <FormGroup className="mb-3" controlId="formBasicSelect">
                            <Form.Label data-cy="modal-add-priority-title" className="label">PRIORITY</Form.Label>
                            <Select
                                defaultValue={options[0]}
                                formatOptionLabel={formatOptionLabel}
                                options={options}
                                className="select-priorities"
                                onChange={(e) => setPriority(e.value)}
                                id="AddPriority"
                                components={{ DropdownList }}
                            />
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="mod-footer">
                    {loading ?
                        <Button data-cy="modal-add-save-button" disabled className="add-todos">
                            <Spinner animation="border" variant="light" />
                        </Button>
                        :
                        <Button data-cy="modal-add-save-button" className="add-todos" type="submit" onClick={addNewTodo}>
                            Simpan
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DetailTodo;