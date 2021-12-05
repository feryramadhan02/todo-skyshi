import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import DeleteIcon from '../assets/images/activity-item-delete-button.png'
import ModalDeleteIcon from '../assets/images/modal-delete-icon.png'
import { deleteTodo, getAllTodo } from '../store/actions/auth'

import '../assets/style/Cards.scss'

const Cards = ({ id, title, time }) => {
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false);

    const delTodo = (val) => {
        dispatch(deleteTodo(val))
        dispatch(getAllTodo("feryblackid@gmail.com"))
        setModalShow(false)
    }

    const ModalDelete = (props) => {
        return (
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <div data-cy="modal-delete-icon" className="icon-modal">
                        <img src={ModalDeleteIcon} alt="modal-delete-icon" />
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-title">
                        <h3 data-cy="modal-delete-title">Apakah anda yakin menghapus activity <strong>"{title}"</strong> ?</h3>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button data-cy="modal-delete-cancel-button" className="cancel-delete" onClick={props.onHide}>Batal</Button>
                    <Button data-cy="modal-delete-confirm-button" className="confirm-delete btn-danger" onClick={() => delTodo(id)}>
                        Hapus
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    let arrbulan = [null, "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    let dates = time.slice(8, 10)
    let months = time.slice(5, 7)
    let years = time.slice(0, 4)

    return (
        <>
            <div data-cy="activity-item" className="card">
                <div data-cy="activity-item-title" className="card-title">
                    <Link to={`/detail/${id}`}>{title}</Link>
                </div>
                <div className="footer-card">
                    <p data-cy="activity-item-date" className="time">{dates} {arrbulan[months]} {years}</p>
                    <Button data-cy="activity-item-delete-button" onClick={() => setModalShow(true)} className="btn-delete-todo">
                        <img src={DeleteIcon} alt="icon-delete" />
                    </Button>
                </div>
            </div>
            <ModalDelete
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default Cards;