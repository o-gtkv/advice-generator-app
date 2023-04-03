import React from "react"
import RandomAdviceBox from './components/RandomAdviceBox/RandomAdviceBox'

import style from './App.module.css'

function App() {
    return (
        <main className={style.main}>
            <h1 className="sr-only">Advice generator</h1>
            <RandomAdviceBox />
        </main>
    )
}

export default App;
