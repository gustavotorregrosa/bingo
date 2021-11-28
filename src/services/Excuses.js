export default class ExcusesService{

    excuses = [
        {
            id: 1,
            text: `It works on my machine`
        },
        {
            id: 2,
            text: `There was too little data`
        },
        {
            id: 3,
            text: `We outsourced that months ago`
        },
        {
            id: 4,
            text: `It was working in my head`
        },
        {
            id: 5,
            text: `That's already fixed it just hasn't taken effect yet`
        },
        {
            id: 6,
            text: `Well, that's a first`
        },
        {
            id: 7,
            text: `I only check my email for that on a Friday`
        },
        {
            id: 8,
            text: `I haven't had any experience with that before`
        },
        {
            id: 9,
            text: `It seemed so simple I didn't think it needed testing`
        },
        {
            id: 10,
            text: `THIS can't be the source of THAT`
        },
        {
            id: 11,
            text: `That's not a bug it's a configuration issue`
        },
        {
            id: 12,
            text: `It worked yesterday`
        },
        {
            id: 13,
            text: `There's currently a problem with our hosting company`
        },
        {
            id: 14,
            text: `It's a browser compatibility issue`
        },
        {
            id: 15,
            text: `They must have cancelled that subscription`
        },
        {
            id: 16,
            text: `I couldn't find any examples of that`
        },
        {
            id: 17,
            text: `You must have the wrong version`
        },
        {
            id: 18,
            text: `The third party documentation is wrong`
        },
        {
            id: 19,
            text: `The download must have been corrupted`
        },
        {
            id: 20,
            text: `I heard there was a solar flare today`
        },
        {
            id: 21,
            text: `You're doing it wrong`
        },
        {
            id: 22,
            text: `It's always been like that`
        },
        {
            id: 23,
            text: `Oh, that was only supposed to be a placeholder`
        },
        {
            id: 24,
            text: `That isn't covered by my job description`
        },
        {
            id: 25,
            text: `That process requires too much oversight`
        },
        {
            id: 26,
            text: `That code was written by the last guy`
        },
        {
            id: 27,
            text: `Somebody must have changed my code`
        }, 
        {
            id: 28,
            text: `The client wanted it changed at the last minute`
        },
        {
            id: 29,
            text: `I told you it would be done by the end of today`
        },
        {
            id: 30,
            text: `Did you check for a virus on your system?`
        },
        {
            id: 31,
            text: `I'm surprised it works as well as it does`
        },
        {
            id: 32,
            text: `That behaviour is in the original specification`
        },
        {
            id: 33,
            text: `I can't test everything`
        }

    ]

    getRandomNum = () => {
        return Math.ceil(Math.random() * this.excuses.length)
    }

    getRandomArray = () => {
        const finalArray = []
        while (finalArray.length < 24){
            const randomNum = this.getRandomNum()
            if(finalArray.includes(randomNum)){
                continue
            }
            finalArray.push(randomNum)
        }

        return finalArray
    }

    getExcuses = () => {
        const finalArray = this.getRandomArray()
        const board = []
        let i = 0
        for (let row = 0; row <= 4; row++) {
            const line = []
            for (let col = 0; col <= 4; col++) {
                if(row == 2 && col == 2){
                    line.push({
                        id: null,
                        text: null,
                        flag: true
                    })
                    continue
                }

                line.push({
                    ...this.excuses.find(e => e.id == finalArray[i]),
                    flag: false
                })
                i++
            }

            board.push(line)
        }

        return board
    }




}