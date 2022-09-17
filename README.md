# Microservices Take Home Technical Challenge

Technical challenge API developed to take two date inputs in <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO-8601</a> format and return one of the following based on API endpoint used:

1) The number of _days_ between two datetime parameters
2) The number of _weekdays_ between two datetime parameters
3) The number of _complete weeks_ between two datetime parameters

Additionally, the ability to convert the return response to one of _seconds, minutes, hours & years_ and the specification of timezone comparsion has been included. 

# Installation

This API can be accessed

_alternatively it can be cloned and utilised locally by performing the following_:

Clone the repository to your local machine:
> git clone https://github.com/Pyr1te/TakeHomeTechnical.git

Navigate to the directory
> cd TakeHomeTechnical

Install the appropriate libraries/dependencies
> npm install express moment moment-timezone jest --save

Run the API locally:
> node main.js


# Visual


# Utilising the API

This TakeHomeTechnical API follows the following route "/api/days || weekdays || weeks/:initialDatetime/:finalDatetime/?format=
