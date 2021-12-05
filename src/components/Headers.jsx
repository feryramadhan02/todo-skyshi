import '../assets/style/Headers.scss'

const Headers = () => {
    return (
        <>
            <header data-cy="header-background" className="header-layout">
                <div className="header-title-wrapper">
                    <h2 data-cy="header-title">To do list App</h2>
                </div>
            </header>
        </>
    )
}

export default Headers;