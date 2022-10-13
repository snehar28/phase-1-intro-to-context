// Your code here
function createEmployeeRecord(employeeDetails) {
    let employeeRecord = {   
        firstName : employeeDetails[0],
        familyName : employeeDetails[1],
        title : employeeDetails[2],
        payPerHour : employeeDetails[3],
        timeInEvents: [],
        timeOutEvents: []
     }
     return employeeRecord;
}

function createEmployeeRecords(arrays) {
    let employeeRecords = [];
    for (let arr of arrays) {
        employeeRecords.push(createEmployeeRecord(arr))
    }

    return employeeRecords;
}

function createTimeInEvent(employeeObj,dateInStamp) {
    let dateInArray = dateInStamp.split(" ");
    let timeInObj = {
        type: "TimeIn",
        hour: parseInt(dateInArray[1]),
        date: dateInArray[0]
    }

    employeeObj.timeInEvents.push(timeInObj);

    return employeeObj;
}

function createTimeOutEvent(employeeObj, dateOutStamp) {
    let dateOutArray = dateOutStamp.split(" ");
    let timeOutObj = {
        type: "TimeOut",
        hour: parseInt(dateOutArray[1]),
        date: dateOutArray[0]
    }

    employeeObj.timeOutEvents.push(timeOutObj);

    return employeeObj;
}

function hoursWorkedOnDate(employeeObj,dateStamp) {
    for (let i = 0; i < (employeeObj.timeInEvents).length; i++) {
        let dateToCheck = employeeObj.timeInEvents[i].date
        if (dateStamp === dateToCheck) {
            const hourIn = employeeObj.timeInEvents[i].hour
            const hourOut = employeeObj.timeOutEvents[i].hour

            const numberOfHoursWorked = (hourOut - hourIn)/100;
            return numberOfHoursWorked;
        }
    }
}

function wagesEarnedOnDate(employeeObj,dateStamp) {
    const payRate = employeeObj.payPerHour
    const hoursWorked = hoursWorkedOnDate(employeeObj,dateStamp)

    const payOwed = payRate * hoursWorked
    return payOwed;
}

function allWagesFor(employeeObj) {
    let datesWorked = employeeObj.timeInEvents.length
    const allWages = [];
    for (let j = 0; j < datesWorked; j++) {
        let dateCheck = employeeObj.timeInEvents[j].date
        let wagePerDate = wagesEarnedOnDate(employeeObj,dateCheck)

        allWages.push(wagePerDate)
    }

    let totalSum = 0;
    for (const wage of allWages) {
        totalSum += wage
    }

    return totalSum;
}

function calculatePayroll(allEmployees) {
    const fullPayroll = [];
    for (const employee of allEmployees) {
        const totalWageForEmployee = allWagesFor(employee)
        
        fullPayroll.push(totalWageForEmployee)
    }

    let fullPay = 0;
    for (const pay of fullPayroll) {
        fullPay += pay
    }

    return fullPay;

}
