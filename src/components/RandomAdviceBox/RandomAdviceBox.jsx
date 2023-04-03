import React, { useState, useEffect } from "react"
import { useMediaQuery } from "../../hooks"

import style from './RandomAdviceBox.module.css'

import imgDividerPatternMobile from '../../assets/images/pattern-divider-mobile.svg'
import imgDividerPatternDesktop from '../../assets/images/pattern-divider-desktop.svg'
import iconDice from '../../assets/images/icon-dice.svg'

function RandomAdviceBox() {
    const media = useMediaQuery('(max-width: 768px)')
    const [adviceData, setAdviceData] = useState(null)
    const [isAdviceLoaded, setIsAdviceLoaded] = useState(false)
    const [loadingError, setLoadingError] = useState(null)

    async function loadData() {
        try {
            const res = await fetch('https://api.adviceslip.com/advice', { cache: 'no-store' })
            if (res.status !== 200)
                throw new Error(`${res.status} ${res.statusText}`)
            const data = await res.json()
            setAdviceData({
                id: data.slip.id,
                advice: data.slip.advice
            })
            setIsAdviceLoaded(true)
        }
        catch (e) {
            setLoadingError(e)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    if (loadingError) {
        return (
            <div className={style.adviceComponent}>
                <p className={style.errorMsg}>Error: {loadingError.message}</p>
            </div>
        )
    }

    if (!isAdviceLoaded)
        return null

    return (
        <div className={style.adviceBox}>
            <h2 className={style.adviceId}>Advice #{adviceData.id}</h2>
            <p className={style.advice}>&ldquo;{adviceData.advice}&rdquo;</p>
            <img
                className={style.imgDividerPattern}
                src={media.matches ? imgDividerPatternMobile : imgDividerPatternDesktop}
                alt=""
            />
            <button className={style.generateBtn} onClick={() => loadData()}>
                <img className={style.diceIcon} src={iconDice} alt="next advice" />
            </button>
        </div>
    )
}

export default RandomAdviceBox