# Microservices Take Home Technical Challenge

Technical challenge API developed to take two date inputs in <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO-8601</a> format and return one of the following based on API endpoint used:

1) The number of _days_ between two datetime parameters
2) The number of _weekdays_ between two datetime parameters
3) The number of _complete weeks_ between two datetime parameters

Additionally, the ability to convert the return response to one of _seconds, minutes, hours & years_ and the specification of timezone comparsion has been included. 

# Direct URL Access

This API can be accessed directly via the render host under base URL:

```
https://aligenttakehometechnical.onrender.com/
```
<strong>NOTE: This is hosted on a free tier and may take some time to begin operation when called</strong>

Please refer to input parameters section below if looking to make direct requests.

# Local Hosting/Installation

Clone the repository to your local machine:
```
git clone https://github.com/Pyr1te/TakeHomeTechnical.git
```
> 

Navigate to the newly cloned directory
```
cd TakeHomeTechnical
```

Install the appropriate libraries/dependencies
```
npm install express moment-timezone --save
```

Run the API locally:
```
npm start
```

With the local server listening on port 3000, you can utilise the browser to access the API by navigating to:
```
http://localhost:3000/days/{firstDateTime}/{secondDateTime}/?format={timeFormat}
```

Noting that parameters outlined in {} should be replaced with your input parameters - Populating API path & accepted parameters outlined below in usage section


# Input Parameters (Route & Query)

<h3>Route Parameters:</h3>
This API accepts three route parameters in the following order:

<br>
<br>

> /{datetimeDiffMethod}/{firstDateTime}/{secondDateTime}

{dateTimeDiffMethod} must be one of the following (case sensitive):
<ul>
  <li>days</li>
  <li>weekdays</li>
  <li>weeks</li>
</ul>

{firstDateTime} & {secondDateTime} are the datetime input(s) in <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO-8601</a> format: <strong>YYYY-MM-DDTHH:MM:SS</strong>

As an example, the following datetimes can be used to calculate the number of days from when I received the technical take home to when I returned it - <strong>returning 10</strong>.

```
/days/2022-09-08T00:00:00/2022-09-18T00:00:00/
```

<h3>Query Parameters:</h3>

There are three query parameters available to the user in this API (case sensitive).
<ul>
  <li>format</li>
  <ul>
    <li>seconds</li>
    <li>minutes</li>
    <li>hours</li>
    <li>days</li>
    <li>years</li>
  </ul>
  <li>tz1</li>
  <li>tz2</li>
</ul>

A list of available timezones can be found by hitting the API endpoint <strong>/timezones</strong> alternatively, <a href="https://gist.github.com/diogocapela/12c6617fc87607d11fd62d2a4f42b02a">this GitHub repo</a> contains a list of many available options. Utilising this information we can extract the amount of <strong>minutes</strong> between <strong>two date time parameters</strong>, taking into account inidivdual <strong>timezones</strong> as outlined below.

```
/days/2022-09-08T00:00:00/2022-09-18T00:00:00/?format=minutes&tz1=America/Boise&tz2=Africa/Conakry
```

<strong>tz1</strong> represents the timezone to be associated with datetime <strong>input 1</strong> and <strong>tz2</strong> represents the timezone to be associated with datetime <strong>input 2</strong>

# Testing

This repo has 32 in-built tests to validate the operation of the main.js API and can be performed locally (please note, the local installation instructions above must be followed prior to this).

In the <strong>TakeHomeTechnical</strong> directory, install the following developer dependencies:

```
npm install jest supertest --save-dev
```

With two terminal windows open, use one to run the API locally:

```
npm start
```

On the other run the test script with

```
npm test
```

The script will run and process all test work locally and should return 

<img src="https://github.com/Pyr1te/TakeHomeTechnical/blob/main/testImage.JPG">

Further test development can be implemented by populating the <strong>main.test.js</strong> file

# Further Improvements Possibilities

Although effort has been made to ensure the code is commented & as readable as possible, I am relatively inexperienced in having professionally established programmers reviewing my code and understand there is likely readability & DRY, reused code that can be cleaned up. Additionally, further experience in unit testing code would assist in developing a comprehensive and well rounded testing paradigm.

Addtionally, the logic around the processing of weekdays could be improved.
