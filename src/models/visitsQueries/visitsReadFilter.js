
function makeReadFilter(params, queryCondition) {
    try {   
        for (const key in params) {
            if (Object.hasOwnProperty.call(params, key)) {
                const element = params[key];
                params[key] = JSON.parse(element)
            }
        }
        if(params.loc) queryCondition = selFilter('loc', params.loc, queryCondition, 'or')
        if(params.dates) queryCondition = spanFilter('date', params.dates, queryCondition)
        if(params.startTimeRange) queryCondition = spanFilter('startTime', params.startTimeRange, queryCondition)
        if(params.endTimeRange) queryCondition = spanFilter('endTime', params.endTimeRange, queryCondition)
        if(params.workedTime) queryCondition = spanFilter('HOUR(TIMEDIFF(endTime, startTime))', params.workedTime, queryCondition)
        if(params.allVisitors) queryCondition = selFilter('allVisitors', params.allVisitors, queryCondition, 'and')
        if(params.workSearch) queryCondition = stringFilter('workDone', params.workSearch, queryCondition)
        if(params.cost) queryCondition = spanFilter('cost', params.cost, queryCondition)
        
        if(queryCondition.Error) throw queryCondition.Error
        return queryCondition
    } catch (err) {
        return {Error: err}
    }
}

// Go to function to make a query of range of values
// It can handle handle having only one range value or none

function spanFilter(targetData, spanInput, queryCondition) {
    try {
        const prevQuery = queryCondition
        if(queryCondition) queryCondition += ` AND`
        else queryCondition += `WHERE`
    
        const [min, max] = spanInput
    
        if (min && !max) {
            queryCondition += ` ${targetData} >= '${min}'`
        }  else if (!min && max) {
            queryCondition += ` ${targetData} <= '${max}'`
        } else if (min && max) {
            if(min > max) return prevQuery
            queryCondition += ` ${targetData} >= '${min}' AND
                                ${targetData} <= '${max}'`
        } else {
            return prevQuery
        }
    
        return queryCondition
    } catch (err) {
        return {Error: err}
    }
}

// Handles creating a query string that...
// finds a value in JSON data type in given column 

function selFilter(target, selInput, queryCondition, clause = 'or') {
    try {
        const prevQuery = queryCondition
        if(queryCondition) queryCondition += ` AND`
        else queryCondition += `WHERE`
    
    
        if(!['and', 'or'].includes(clause.toLowerCase())) {
            queryCondition = prevQuery
            return prevQuery
        }
        if(clause.toLowerCase() === 'and') {
            queryCondition += selInput.map( el => ` JSON_CONTAINS(${target}, '"${el}"')`).join(' AND')
            return queryCondition
    
        } else if(clause.toLowerCase() === 'or') {
            queryCondition += selInput.map( el => ` JSON_CONTAINS(${target}, '"${el}"')`).join(' OR')
            return queryCondition
        }
    } catch (err) {
        return {Error: err}
    }
}

// Creates query that searches a string in given column

function stringFilter(targetData, searchInput, queryCondition) {
    try {
        if(queryCondition) queryCondition += ` AND`
        else queryCondition += `WHERE`
    
        queryCondition += ` ${targetData} LIKE '%${searchInput}%'`
    
        return queryCondition
    } catch (err) {
        return {Error: err}
    }
}

module.exports = {
    makeReadFilter
}