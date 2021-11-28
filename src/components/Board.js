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

    const toggleExcuse = id => {
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
        checkWinner(newExcuses)
    }

    const checkWinner = excuses => {
        if(checkWinnerHorizontal(excuses) || checkWinnerVerticalAndDiagonal(excuses)){
            callConfetti()
        }


    }

    const checkWinnerHorizontal = excuses => {
        let isWinnerHorizontal = false
        excuses.map((excuseLine, lineNumber) => {  
            let lineCompleted = true
            excuseLine.map((excuse, colNumber) => {
                lineCompleted = lineCompleted && excuse.flag
            })
            
            if(lineCompleted){
                isWinnerHorizontal = true
                return
            }
        })

        return isWinnerHorizontal
    }

    const checkWinnerVerticalAndDiagonal = excuses => {
        let isVerticalWinner = false
        const diagonalOne = []
        const diagonalTwo = []
        for (let col = 0; col < excuses[0].length; col++) {
            let colWinner = true
            for(let line = 0; line < excuses.length; line++){
                colWinner = colWinner && excuses[line][col].flag
                if(line == col){
                    diagonalOne.push(excuses[line][col].flag)
                }
                if(line + col == excuses.length -1){
                    diagonalTwo.push(excuses[line][col].flag)
                }
            }

            if(colWinner){
                isVerticalWinner = true
                break
            }
        }

        let isDiagonalWinner = !diagonalOne.includes(false) || !diagonalTwo.includes(false)

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
