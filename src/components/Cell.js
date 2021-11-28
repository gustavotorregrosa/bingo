import React from 'react'
import styles from '../styles/Cell.module.css'
import { bounceInDown, flip } from 'react-animations';
import Radium, {StyleRoot} from 'radium';


export default function Cell(props) {

    const selectedStyle = {
        flip: {
            animation: 'x 1s',
            animationName: Radium.keyframes(flip, 'flip')
        }
    }

    let style = {}

    if(props.flag){
        style = {
            ...style,
            ...selectedStyle.flip
        }
    }

    if(!props.text){
        return <div className={`${styles.sizing} ${styles.active} `}><p className={styles.text}>LAZY DEV PHRASES</p></div>
    }

    return <StyleRoot><div style={style} onClick={props.toggleExcuse} className={`${styles.sizing} ${styles.clickable} ${props.flag ? styles.active : null} `}><p className={styles.text}>{props.text}</p></div></StyleRoot>
    }
