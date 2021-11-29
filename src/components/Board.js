import React, { useEffect, useState } from 'react'
import Cell from './Cell'
import styles from '../styles/Table.module.css'
import { bounceInDown } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import ExcusesService from '../services/Excuses';
import { callConfetti } from '../services/Confetti';



const animations = {
    bounceInDown: {
        animation: 'x 1s',
        animationName: Radium.keyframes(bounceInDown, 'bounceInDown')
    }
}

export default function Board() {

    const excusesService = new ExcusesService()
    const [excuses, setExcuses] = useState(excusesService.getExcuses())
    // const [isBingo, setBingo] = useState(false)

    const toggleExcuse = id => {

        // if(isBingo){
        //     return
        // }

        let newExcuses = []
        excuses.map(excuseLine => {
            let newExcuseLine = []
            excuseLine.map(excuse => {
                const newExcuse = {
                    ...excuse
                }
                if (newExcuse.id == id) {
                    newExcuse.flag = !excuse.flag
                }

                newExcuseLine.push(newExcuse)
            })
            newExcuses.push(newExcuseLine)
        })

        setExcuses(newExcuses)
        checkWinner(newExcuses, id)
    }

    const checkWinner = (excuses, id) => {
        if(checkWinnerHorizontal(excuses, id) || checkWinnerVerticalAndDiagonal(excuses, id)){
            callConfetti()
            // setBingo(true)
            // setTimeout(() => {
            //     window.location.href = "/"
            // }, 4000)
        }


    }

    const checkWinnerHorizontal = (excuses, id) => {
        let isWinnerHorizontal = false
        excuses.map((excuseLine, lineNumber) => {  
            let lineCompleted = true
            let isCurrentClick = false
            excuseLine.map((excuse, colNumber) => {
                lineCompleted = lineCompleted && excuse.flag
                isCurrentClick = isCurrentClick || excuse.id == id
            })
            
            if(lineCompleted & isCurrentClick){
                isWinnerHorizontal = true
                return
            }
        })

        return isWinnerHorizontal
    }

    const checkWinnerVerticalAndDiagonal = (excuses, id) => {
        let isVerticalWinner = false
        const diagonalOne = []
        const diagonalTwo = []
        let isCurrentClickDiagonalOne = false
        let isCurrentClickDiagonalTwo = false
        for (let col = 0; col < excuses[0].length; col++) {
            let colWinner = true
            let isCurrentClickVertical = false

            for(let line = 0; line < excuses.length; line++){
                isCurrentClickVertical = isCurrentClickVertical || excuses[line][col].id == id
                colWinner = colWinner && excuses[line][col].flag
                
                if(line == col){
                    diagonalOne.push(excuses[line][col].flag)
                    isCurrentClickDiagonalOne = isCurrentClickDiagonalOne || excuses[line][col].id == id
                }

                if(line + col == excuses.length -1){
                    diagonalTwo.push(excuses[line][col].flag)
                    isCurrentClickDiagonalTwo = isCurrentClickDiagonalTwo || excuses[line][col].id == id
                }
            }

            if(colWinner && isCurrentClickVertical){
                isVerticalWinner = true
                break
            }
        }

        let isDiagonalWinner = (!diagonalOne.includes(false) && isCurrentClickDiagonalOne ) || (!diagonalTwo.includes(false) && isCurrentClickDiagonalTwo) 

        return isVerticalWinner || isDiagonalWinner
    }


    const tbody = () => {
        let _tbody = []
        excuses.map(line => {
            _tbody.push(tr(line))
        })

        return <tbody>{_tbody}</tbody>
    }

    const tr = line => {
        let _tr = []
        line.map((item, index) => {
            _tr.push(<td className={styles.no_padding}><Cell toggleExcuse={() => toggleExcuse(item.id)}  {...item} index={index} /></td>)
        })
        return <tr className={styles.remove_lines}>{_tr}</tr>
    }


    return (
        <StyleRoot>
            <div
                style={animations.bounceInDown}
                className={styles.espacing}>
                <table>
                    {tbody()}
                </table>
            </div>
        </StyleRoot>
    )
}
