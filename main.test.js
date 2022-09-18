const { text } = require('express');
const request = require('supertest');
const baseURL = 'http://localhost:3000';

describe('check assessment requirement 1 "Find the number of days between two datetime parameters"', () => {
    it("should return response status code 200", async() => {
        const response = await request(baseURL).get('/days/2022-09-01T00:00:00/2022-09-08T00:00:00/')
        expect(response.statusCode).toBe(200);
    })
    it("should return 7 days over the course of a complete week", async() => {
        const response = await request(baseURL).get('/days/2022-09-01T00:00:00/2022-09-08T00:00:00/');
        expect(response.text).toBe("7");
    })
    it("should return the entire September 2022 count of days (30)", async() => {
        const response = await request(baseURL).get('/days/2022-09-01T00:00:00/2022-10-01T00:00:00/');
        expect(response.text).toBe("30");
    })
    it("should return an entire year in days (365)", async() => {
        const response = await request(baseURL).get('/days/2022-01-01T00:00:00/2023-01-01T00:00:00/');
        expect(response.text).toBe("365");
    })
})

describe('check assessment requirement 2 "Find out the number of weekdays between two datetime parameters"', () => {
    it("should return response status code 200", async() => {
        const response = await request(baseURL).get('/weekdays/2022-09-01T00:00:00/2022-09-08T00:00:00/')
        expect(response.statusCode).toBe(200);
    })
    it('should return 5 weekdays over a 7 calendar day period', async() => {
        const response = await request(baseURL).get('/weekdays/2022-09-04T00:00:01/2022-09-10T23:59:59/');
        expect(response.text).toBe("5");
    })
    it('should return number of weekdays in the complete calendar month of September 22', async() => {
        const response = await request(baseURL).get('/weekdays/2022-09-01T00:00:00/2022-10-01T00:00:00/');
        expect(response.text).toBe("23");
    })
    it('should return number of weekdays in the complete 2022 calendar', async() => {
        const response = await request(baseURL).get('/weekdays/2022-01-01T00:00:00/2023-01-01T00:00:00/');
        expect(response.text).toBe("260");
    })
})

describe('check assessment requirement 3 "Find out the number of complete weeks between two datetime parameters', () => {
    it("should return response status code 200", async() => {
        const response = await request(baseURL).get('/weeks/2022-09-01T00:00:00/2022-09-08T00:00:00/')
        expect(response.statusCode).toBe(200);
    })
    it('should return a single week over a 7 day period', async() => {
        const response = await request(baseURL).get('/weeks/2022-09-01T00:00:00/2022-09-08T00:00:00/');
        expect(response.text).toBe("1");
    })
    it('should return 4 complete weeks over the September 2022 calendar period', async() => {
        const response = await request(baseURL).get('/weeks/2022-09-01T00:00:00/2022-10-01T00:00:00/');
        expect(response.text).toBe("4");
    })
    it('should return 52 weeks over the 2022 calendar', async() => {
        const response = await request(baseURL).get('/weeks/2022-01-01T00:00:00/2023-01-01T00:00:00/');
        expect(response.text).toBe("52");
    })
})

describe('check assessment requirement 4 "Accept a third parameter to convert the result of (1,2 or 3) into one of seconds, minutes, hours, years"', () => {
    describe('Test against ASSESSMENT REQUIREMENT 1', () => {
        it("Convert two year period of ASSESSMENT REQUIREMENT 1 to seconds", async() => {
            const response = await request(baseURL).get('/days/2022-01-01T00:00:00/2024-01-01T00:00:00/?format=seconds');
            expect(response.text).toBe("63072000");
        })
        it("Convert two year period of ASSESSMENT REQUIREMENT 1 to minutes", async() => {
            const response = await request(baseURL).get('/days/2022-01-01T00:00:00/2024-01-01T00:00:00/?format=minutes');
            expect(response.text).toBe("1051200");
        })
        it("Convert two year period of ASSESSMENT REQUIREMENT 1 to hours", async() => {
            const response = await request(baseURL).get('/days/2022-01-01T00:00:00/2024-01-01T00:00:00/?format=hours');
            expect(response.text).toBe("17520");
        })
        it("Convert two year period of ASSESSMENT REQUIREMENT 1 to years", async() => {
            const response = await request(baseURL).get('/days/2022-01-01T00:00:00/2024-01-01T00:00:00/?format=years');
            expect(response.text).toBe("2");
        })
    })
    describe('Test against ASSESSMENT REQUIREMENT 2', () => {
        it("Convert two year period of ASSESSMENT REQUIREMENT 2 to seconds", async() => {
            const response = await request(baseURL).get('/weekdays/2022-01-01T00:00:00/2024-01-01T00:00:00/?format=seconds');
            expect(response.text).toBe((520*86400).toString());
        })
        it("Convert two year period of ASSESSMENT REQUIREMENT 2 to minutes", async() => {
            const response = await request(baseURL).get('/weekdays/2022-01-01T00:00:00/2024-01-01T00:00:00/?format=minutes');
            expect(response.text).toBe((520*1440).toString());
        })
        it("Convert two year period of ASSESSMENT REQUIREMENT 2 to hours", async() => {
            const response = await request(baseURL).get('/weekdays/2022-01-01T00:00:00/2024-01-01T00:00:00/?format=hours');
            expect(response.text).toBe((520*24).toString());
        })
        it("Convert two year period of ASSESSMENT REQUIREMENT 2 to years", async() => {
            const response = await request(baseURL).get('/weekdays/2022-01-01T00:00:00/2024-01-01T00:00:00/?format=years');
            expect(response.text).toBe((520*0.00273973).toString());
        })
    })
    describe('Test against ASSESSMENT REQUIREMENT 3', () => {
        it("Convert two year period of ASSESSMENT REQUIREMENT 3 to seconds", async() => {
            const response = await request(baseURL).get('/weeks/2022-01-01T00:00:00/2024-01-01T00:00:00/?format=seconds');
            expect(response.text).toBe((104*7*86400).toString());
        })
        it("Convert two year period of ASSESSMENT REQUIREMENT 3 to minutes", async() => {
            const response = await request(baseURL).get('/weeks/2022-01-01T00:00:00/2024-01-01T00:00:00/?format=minutes');
            expect(response.text).toBe((104*7*1440).toString());
        })
        it("Convert two year period of ASSESSMENT REQUIREMENT 3 to hours", async() => {
            const response = await request(baseURL).get('/weeks/2022-01-01T00:00:00/2024-01-01T00:00:00/?format=hours');
            expect(response.text).toBe((104*7*24).toString());
        })
        it("Convert two year period of ASSESSMENT REQUIREMENT 3 to years", async() => {
            const response = await request(baseURL).get('/weeks/2022-01-01T00:00:00/2024-01-01T00:00:00/?format=years');
            expect(response.text).toBe((104*7*0.00273973).toString());
        })
    })
})

describe('check assessment requirement 5 "Allow the specification of a timezone for comparison of input parameters from different time zones"', () => {
    describe('Test against ASSESSMENT REQUIREMENT 1', () => {
        it("Compare America/Catamarca (tz1) against UTC (tz2) - expect 180 minutes", async() => {
            const response = await request(baseURL).get('/days/2022-01-01T00:00:00/2022-01-01T00:00:00/?format=minutes&tz1=America/Catamarca&tz2=UTC');
            expect(response.text).toBe("180");
        })
        it('Compare UTC (tz1) against America/Catamarca (tz2) - expect 180 minutes', async() => {
            const response = await request(baseURL).get('/days/2022-01-01T00:00:00/2022-01-01T00:00:00/?format=minutes&tz1=UTC&tz2=America/Catamarca');
            expect(response.text).toBe("180");
        })
        it('Compare two offset timezones against one another - Hongkong (+08:00) vs Europe/Belfast (+01:00)', async() => {
            const response = await request(baseURL).get('/days/2022-01-01T00:00:00/2022-01-01T00:00:00/?format=minutes&tz1=Hongkong&tz2=Europe/Belfast');
            expect(response.text).toBe("420");
        })
    })

    describe('Test against ASSESSMENT REQUIREMENT 2', () => {
        // offset of America/Catamarca is +03:00. If we set datetime 3 hours before elapse of day, the tz should push it over.
        // the second date is greater than 1 day however the timezone 
        it("Check whether applying a +03:00 timezone prevents roll over & date increment", async() => {
            const response = await request(baseURL).get('/weekdays/2022-09-12T00:10:00/2022-09-13T00:12:00/?tz1=America/Catamarca&tz2=Africa/Abidjan');
            expect(response.text).toBe((1).toString());
        })
        // add three hours via tz to make it a full working day
        it('Check whether applying a +03:00 timezone rolls over & increments date', async() => {
            const response = await request(baseURL).get('/weekdays/2022-09-12T00:10:00/2022-09-13T00:12:00/?tz1=Africa/Abidjan&tz2=America/Catamarca');
            expect(response.text).toBe("2");
        })
        it('Compare two offset timezones against one another - Hongkong (+08:00) vs Europe/Belfast (+01:00)', async() => {
            // there is 7 hours between these two offsets. By setting the date 6 hours before the close of a weekday. The day will clock over because of the time difference
            const response = await request(baseURL).get('/weekdays/2022-09-11T00:00:00/2022-09-11T18:00:00/?tz2=Hongkong&tz1=Europe/Belfast');
            expect(response.text).toBe((1).toString());
        })
    })

    describe('Test against ASSESSMENT REQUIREMENT 3', () => {
        it("Check to see if -02:00 tz2 with datetimes set 1 hours after weeklength ends, rollback the potential week increment", async() => {
            const response = await request(baseURL).get('/weeks/2022-09-01T00:00:00/2022-09-08T00:01:00/?tz1=UTC&tz2=Brazil/DeNoronha');
            expect(response.text).toBe("0");
        })
        it('Check to see if -02:00 tz1 with datetimes set 1 hour before weeklength still increments week', async() => {
            const response = await request(baseURL).get('/weeks/2022-01-01T00:00:00/2022-01-07T23:00:00/?tz1=Brazil/DeNoronha&tz2=UTC');
            expect(response.text).toBe("1");
        })
    })
})