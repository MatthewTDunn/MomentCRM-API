// establish js libraries

const express = require('express');
const moment = require('moment-timezone');

const app = express();
// utilise web host environment port variable or use port 3000 as fallback
const PORT = process.env.PORT || 3000;

app.use((req, res) => {
    res.send('Please refer to the GitHub README (https://github.com/Pyr1te/TakeHomeTechnical) for use instructions')
})

app.listen(PORT, () => {
    console.log('API listening on http://localhost:'+PORT)
})

// REQUEST 4 - Format conversion table for bool checks & math (conversions against day)
const formatConversion = {
    'seconds' : 86400,
    'second' : 86400,
    'minutes' : 1440,
    'minute' : 1440,
    'hours' : 24,
    'hour' : 24,
    'days' : 1,
    'day' : 1,
    'years' : 0.00273973,
    'year' : 0.00273973
};



// REQUEST 1 - Number of days between two dateTime parameters 
app.get('/days/:firstDateTime/:secondDateTime', (req,res) => {
    // API route parameters
    let firstDateTime = moment(req.params.firstDateTime);
    let secondDateTime = moment(req.params.secondDateTime);

    // REQUEST 4 - Determine if API query parameter 'format' is present and handle accordingly
    const returnFormatCheck = new URLSearchParams(req.query).has('format');
    // default handler to days
    let returnFormat = 'days';
    if (returnFormatCheck == true && req.query.format in formatConversion) {
        returnFormat = req.query.format
    };

    // REQUEST 5 - Allow the specification of a timezone for comparison of input parameters from different timezones (against reference UTC+00:00)
    const tz1Check = new URLSearchParams(req.query).has('tz1');
    const tz2Check = new URLSearchParams(req.query).has('tz2'); 
    if (tz1Check === true && moment.tz.names().includes(req.query.tz1)) {
        const tz1Offset = moment.tz(req.query.tz1).utcOffset();
        firstDateTime = firstDateTime.add(tz1Offset,'minutes')
    }
    if (tz2Check === true && moment.tz.names().includes(req.query.tz2)) {
        const tz2Offset = moment.tz(req.query.tz2).utcOffset();
        secondDateTime = secondDateTime.add(tz2Offset,'minutes')
    }

    // Respond with difference in datetime(s) accounting for timezone & user requested report format
    res.status(200).send(Math.abs(secondDateTime.diff(firstDateTime,`${returnFormat}`)).toString());
})



// REQUEST 2 - Handle the processing of WEEKDAYS between two dateTime periods
app.get('/weekdays/:firstDateTime/:secondDateTime', (req,res) => {
    // API route parameters (additionally, handle both cases of dates (higher first vs lower first))
    let firstDateTime = (moment(req.params.firstDateTime) <= moment(req.params.secondDateTime)) ? moment(req.params.firstDateTime) : moment(req.params.secondDateTime);
    let secondDateTime = (moment(req.params.firstDateTime) <= moment(req.params.secondDateTime)) ? moment(req.params.secondDateTime) : moment(req.params.firstDateTime);
      
    // REQUEST 4 - Determine if API query parameter format is present and handle accordingly
    const returnFormatCheck = new URLSearchParams(req.query).has('format');
    let returnFormat = 'days';
    if (returnFormatCheck == true && req.query.format in formatConversion) {
        returnFormat = req.query.format
    };

    // REQUEST 5 - Allow the specification of a timezone for comparison of input parameters from different timezones (against reference UTC+00:00)
    const tz1Check = new URLSearchParams(req.query).has('tz1');
    const tz2Check = new URLSearchParams(req.query).has('tz2'); 
    if (tz1Check === true && moment.tz.names().includes(req.query.tz1)) {
        const tz1Offset = moment.tz(req.query.tz1).utcOffset();
        firstDateTime = firstDateTime.add(tz1Offset,'minutes')
    }
    if (tz2Check === true && moment.tz.names().includes(req.query.tz2)) {
        const tz2Offset = moment.tz(req.query.tz2).utcOffset();
        secondDateTime = secondDateTime.add(tz2Offset,'minutes')
    }

    // function to calculate the amount of weekdays between two datetimes 
    function calcWeekday(initial,final) {
        let dateAccumulator = moment(initial);
        let weekdayCount = 0;
        // increment weekday count for each day between two dateTime periods (excluding Saturday (6) && Sunday (0))
        while (dateAccumulator < moment(final)) {
            // increment 1 user requested format number
            dateAccumulator.add(1,`${returnFormat}`);
            if (dateAccumulator.day() != 6 && dateAccumulator.day() !=0) {
                // increment count if weekday
                weekdayCount++
            };
        };
        return weekdayCount;
    }

    res.status(200).send(calcWeekday(firstDateTime,secondDateTime).toString()); 
})



// REQUEST 3 - Number of complete weeks between two dateTime parameters
app.get('/weeks/:firstDateTime/:secondDateTime', (req,res) => {
    // API route parameters
    let firstDateTime = moment(req.params.firstDateTime);
    let secondDateTime = moment(req.params.secondDateTime);
    // REQUEST 4 - Determine if API query parameter format is present and handle accordingly
    const returnFormatCheck = new URLSearchParams(req.query).has('format');
    let returnFormat = 'days';
    // REQUEST 5 - Allow the specification of a timezone for comparison of input parameters from different timezones (against reference UTC+00:00)
    const tz1Check = new URLSearchParams(req.query).has('tz1');
    const tz2Check = new URLSearchParams(req.query).has('tz2'); 
    if (tz1Check === true && moment.tz.names().includes(req.query.tz1)) {
        const tz1Offset = moment.tz(req.query.tz1).utcOffset();
        firstDateTime = firstDateTime.add(tz1Offset,'minutes')
    }
    if (tz2Check === true && moment.tz.names().includes(req.query.tz2)) {
        const tz2Offset = moment.tz(req.query.tz2).utcOffset();
        secondDateTime = secondDateTime.add(tz2Offset,'minutes')
    }
    
    // determine report format and return accordingly
    if (returnFormatCheck == true && req.query.format in formatConversion) {
        returnFormat = req.query.format
        // if format query param exists, change complete weeks to days (*7) & apply conversion from there against formatConversion obj.
        res.status(200).send((Math.abs(secondDateTime.diff(firstDateTime,'weeks'))*7*(formatConversion[`${returnFormat}`])).toString())
    } else {
        res.status(200).send((Math.abs(secondDateTime.diff(firstDateTime,'weeks'))).toString())
    };
})

// Send through array of moment valid timezones for user reference
app.get('/timezones', (req,res) => {
    res.send(moment.tz.names());
})
