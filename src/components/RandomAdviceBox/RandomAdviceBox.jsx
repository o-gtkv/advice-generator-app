import React, { useState, useEffect } from "react"
import axios from "axios"
import _ from 'lodash'
import Media from "react-media"

import styles from './RandomAdviceBox.module.css'

import imgDividerPatternMobile from '../../static/images/pattern-divider-mobile.svg'
import imgDividerPatternDesktop from '../../static/images/pattern-divider-desktop.svg'
import imgDice from '../../static/images/icon-dice.svg'

async function generateAdvice(setState) {
    const id = _.random(1, 200)
    const res = await axios({
        method: 'get',
        url: `https://api.adviceslip.com/advice/${id}`,
    })
    setState({
        id, advice: res.data.slip.advice
    })
}

function RandomAdviceBox() {
    const [adviceData, setAdviceData] = useState(null)

    useEffect(() => {
        generateAdvice(setAdviceData)
    }, [])

    return (
        <>
            {
                adviceData ? // waiting for data
                    <div className={styles.adviceComponent}>
                        <h4 className={styles.adviceId}>Advice #{adviceData.id}</h4>
                        <p className={styles.advice}>&ldquo;{adviceData.advice}&rdquo;</p>
                        <Media queries={{
                            mobile: "(max-width: 768px)",
                            desktop: "(min-width: 769px)"
                        }}>
                            {matches => (
                                <>
                                    {matches.mobile && <img className={styles.imgDividerPattern} src={imgDividerPatternMobile} alt="divider pattern" />}
                                    {matches.desktop && <img className={styles.imgDividerPattern} src={imgDividerPatternDesktop} alt="divider pattern" />}
                                </>
                            )}
                        </Media>

                        {/* <img className={styles.imgDividerPattern} src={imgDividerPatternMobile} alt="divider pattern" /> */}
                        <div className={styles.generateBtn} role="button" onClick={() => generateAdvice(setAdviceData)}>
                            <img className={styles.imgDice} src={imgDice} alt="dice icon" />
                        </div>
                    </div>
                    :
                    null
            }
        </>
    )
}

export default RandomAdviceBox