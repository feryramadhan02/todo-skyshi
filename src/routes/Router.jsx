import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Headers from "../components/Headers"
import DetailTodo from "../views/DetailTodo"

const Home = lazy(() => import("../views"))

const Router = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Headers />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/detail/:id" element={<DetailTodo />} />
                </Routes>
            </Suspense>
        </>
    )
}

export default Router;