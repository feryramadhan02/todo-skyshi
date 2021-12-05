import { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap'
import Cards from '../components/Cards'
import Empty from '../assets/images/activity-empty-state.png'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, getAllTodo } from '../store/actions/auth';

import '../assets/style/MainPage.scss';

const Home = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { todoData, isLoading } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getAllTodo("feryblackid@gmail.com"))
    }, [dispatch])

    const addNewTodo = async () => {
        let value = {
            email: "feryblackid@gmail.com",
            title: "New Activity"
        }
        setLoading(true)
        await dispatch(addTodo(value))
        dispatch(getAllTodo(value.email))
        setLoading(isLoading)
    }

    return (
        <>
            <div className="main-layout">
                <section className="head-action">
                    <h1 data-cy="activity-title" className="title">
                        Activity
                    </h1>
                    {loading ?
                        <Button data-cy="activity-add-button" disabled className="btn-add-todo">
                            <Spinner animation="border" variant="light" />
                        </Button>
                        :
                        <Button data-cy="activity-add-button" onClick={addNewTodo} className="btn-add-todo">
                            <span data-cy="tabler:plus">+</span> Tambah
                        </Button>
                    }
                </section>
                <section className="data-card-wrapper">
                    {todoData.length !== 0 ?
                        <>
                            {todoData.map((item) => (
                                <div key={item.id}>
                                    <Cards id={item.id} title={item.title} time={item.created_at} />
                                </div>
                            ))}
                        </>
                        :
                        <div data-cy="activity-empty-state" className="icon-no-data">
                            <img src={Empty} alt="no-data" />
                        </div>
                    }
                </section>
            </div>
        </>
    )
}

export default Home;