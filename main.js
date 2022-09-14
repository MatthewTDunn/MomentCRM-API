// establish js libraries
const express = require('express');
const moment = require('moment');
const app = express();
// const m = moment();

app.listen(3000, () => {
    console.log('listening on port 3000')
})



// REQUEST 1 - Number of days between two dateTime parameters 
app.get('/api/days', (req,res) => {
    // API query parameters
    const initialDate = moment(req.query.initial);
    const finalDate = moment(req.query.final);
    const returnFormat = req.query.format;

    res.status(200).send((finalDate.diff(initialDate,`${returnFormat}`)).toString());
})

// REQUEST 2 - Handle the processing of WEEKDAYS between two dateTime periods
app.get('/api/weekdays', (req,res) => {
    function calcWeekday(initial,final) {
        let dateAccumulator = moment(initial);
        let count = 0
        // count all days between two dateTime periods (excluding Saturday (6) && Sunday (0))
        while (dateAccumulator < moment(final)) {
            dateAccumulator.add(1,'day');
            if (dateAccumulator.day() != 6 && dateAccumulator.day() !=0) {
                // increment count if weekday
                count++
            }
        }
        return count;
    }
    calcWeekday(moment(req.query.initial),moment(req.query.final))

})


// REQUEST 3 - Number of complete weeks between two dateTime parameters
app.get('/api/weeks', (req,res) => {
    console.log('request 3')
})







// app.get('/api/:initial/:final/:format', (req, res) => {
//     // Store moment.js converted Express route parameters
//     let momentInitial = moment(req.params.initial)
//     let momentFinal = moment(req.params.final)
//     // Store URL endpoint query parameter

//     let queryParameter = req.query
//     console.log(queryParameter)
    
//     // obj to hold response components
//     let responseObj = {
//         "Request 1" : 0,
//         "Request 2" : 0,
//         "Request 3" : 0
//     }

//     // REQUEST 1 - Number of days between two dateTime parameters
//     responseObj["Request 1"] = momentFinal.diff(momentInitial,'days');

//     // REQUEST 2 - Handle the processing of WEEKDAYS between two dateTime periods
//     function calcWeekday(initial,final) {
//         let dateAccumulator = moment(initial);
//         let count = 0
//         // count all days between two dateTime periods (excluding Saturday (6) && Sunday (0))
//         while (dateAccumulator < moment(final)) {
//             dateAccumulator.add(1,'day');
//             if (dateAccumulator.day() != 6 && dateAccumulator.day() !=0) {
//                 // increment count if weekday
//                 count++
//             }
//         }
//         return count;
//     }
//     responseObj["Request 2"] = calcWeekday(momentInitial,momentFinal);

//     // REQUEST 3 - Number of complete weeks between two dateTime parameters

//     responseObj["Request 3"] = Math.floor(momentFinal.diff(momentInitial,'days')/7)

//     // REQUEST 4 - Convert API output to specific format

//     console.log(momentFinal.diff(momentInitial,'seconds'))

//     res.send(responseObj)
// })