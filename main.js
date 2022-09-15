// establish js libraries
const express = require('express');
const moment = require('moment');
const momentTZ = require('moment-timezone');

const app = express();
// const m = moment();

app.listen(3000, () => {
    console.log('listening on port 3000')
})

// REQUEST 1 - Number of days between two dateTime parameters 
app.get('/api/days/:initial/:final', (req,res) => {
    // API route parameters
    const initialDate = moment(req.params.initial);
    const finalDate = moment(req.params.final);
    // API query parameters
    const returnFormat = req.query.format;
    
    res.status(200).send(Math.abs(finalDate.diff(initialDate,`${returnFormat}`)).toString());
})

// REQUEST 2 - Handle the processing of WEEKDAYS between two dateTime periods
app.get('/api/weekdays/:initial/:final', (req,res) => {
    // API route parameters
    const initialDate = moment(req.params.initial);
    const finalDate = moment(req.params.final);
    // API query parameters
    const returnFormat = req.query.format;
    function calcWeekday(initial,final) {
        let dateAccumulator = moment(initial);
        let weekdayCount = 0
        // count all datetime increments (format specified in query param) between two dateTime periods (excluding Saturday (6) && Sunday (0))
        while (dateAccumulator < moment(final)) {
            dateAccumulator.add(1,`${returnFormat}`);
            if (dateAccumulator.day() != 6 && dateAccumulator.day() !=0) {
                // increment count if weekday
                weekdayCount++
            }
        }
        return weekdayCount;
    }
    res.status(200).send(calcWeekday(initialDate,finalDate).toString()); 
})


// REQUEST 3 - Number of complete weeks between two dateTime parameters
app.get('/api/weeks/:initial/:final', (req,res) => {
    // API route parameters
    const initialDate = moment(req.params.initial);
    const finalDate = moment(req.params.final);
    // API query parameters
    const returnFormat = req.query.format;

    const formatConversion = {
        'seconds' : 604800,
        'minutes' : 10080,
        'hours' : 168,
        'years' : 0.0192308
    };
 
    if (res.status(200)) {
        // handle response with/without query parameter
        if (returnFormat in formatConversion) {
            res.status(200).send((Math.abs(finalDate.diff(initialDate,'weeks'))*(formatConversion[`${returnFormat}`])).toString());
        } else {
            res.status(200).send(Math.abs(finalDate.diff(initialDate,'weeks')).toString());
        }
    } else {
        res.send('err404')
    }
})