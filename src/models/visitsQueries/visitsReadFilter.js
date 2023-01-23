const validator = require('validator')

function makeReadFilter(params, queryCondition) {
    params = JSON.parse(params)
    console.log(params)
    if(params.loc) queryCondition = selFilter('loc', params.loc, queryCondition, params.selClause)
    if(params.dates) queryCondition = spanFilter('date', params.dates, queryCondition)
    if(params.startTimeRange) queryCondition = spanFilter('startTime', params.startTimeRange, queryCondition)
    if(params.endTimeRange) queryCondition = spanFilter('endTime', params.endTimeRange, queryCondition)
    if(params.workedTime) queryCondition = spanFilter('HOUR(TIMEDIFF(endTime, startTime))', params.workedTime, queryCondition)
    if(params.allVisitors) queryCondition = selFilter('allVisitors', params.allVisitors, queryCondition, params.selClause)
    if(params.workSearch) queryCondition = stringFilter('workDone', params.workSearch, queryCondition)
    if(params.cost) queryCondition = spanFilter('cost', params.cost, queryCondition)
    
    return queryCondition
}

// check if input is arr
// according to targetdata check if the input is true
function spanFilter(targetData, spanInput, queryCondition) {

    const prevQuery = queryCondition
    if(queryCondition) queryCondition += ` AND`
    else queryCondition += `WHERE`

    const [min, max] = spanInput

    if(min > max) return prevQuery

    if (min && !max) {
        queryCondition += ` ${targetData} >= '${min}'`
    }  else if (!min && max) {
        queryCondition += ` ${targetData} <= '${max}'`
    } else if (min && max) {
        queryCondition += ` ${targetData} >= '${min}' AND
                            ${targetData} <= '${max}'`
    } else {
        return prevQuery
    }

    return queryCondition
}

//check if input arr
//check if string according to input
function selFilter(target, selInput, queryCondition, clause = 'or') {
    const prevQuery = queryCondition
    if(queryCondition) queryCondition += ` AND`
    else queryCondition += `WHERE`

    if(!['and', 'or'].includes(clause.toLowerCase())) {
        queryCondition = prevQuery
        return prevQuery
    }

    if(clause.toLowerCase() === 'and') {
        queryCondition += ` JSON_CONTAINS(${target}, '"${selInput}"')`
        return queryCondition

    } else if(clause.toLowerCase() === 'or') {
        queryCondition += selInput.map( el => ` JSON_CONTAINS(${target}, '"${el}"')`).join(' OR')
        return queryCondition
    }
}

//check if string
function stringFilter(targetData, searchInput, queryCondition) {
    if(queryCondition) queryCondition += ` AND`
    else queryCondition += `WHERE`

    queryCondition += ` ${targetData} LIKE '%${searchInput}%'`

    return queryCondition
}

module.exports = {
    makeReadFilter
}