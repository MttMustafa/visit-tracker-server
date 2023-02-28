const db = require('../db/mysql')
const { makeReadFilter } = require('./visitsQueries/visitsReadFilter')
const { makeReadOrder } = require('./visitsQueries/visitReadOrder')

// With the received parameters, MySQL creates SQL create query

async function createVisit(params) {
    try {
        const result =  await db.query(`
        INSERT INTO visits
        (id ,loc, date, startTime, endTime, allVisitors, workDone, cost)
        VALUES
        (UUID(), '${params.loc}', '${params.date}',
                 '${params.startTime}', '${params.endTime}',
                 '${params.allVisitors}', '${params.workDone}', ${params.cost})
        `)

        return result
    } catch (err) {
        return {Error: err}
    }
}

// Calls filter or order query functions if parameters there

async function readVisit(params) {

    try {
        let queryCondition = ``
        let queryOrder = ``
    
        if (params.loc || params.dates || 
            params.startTimeRange || params.endTimeRange || 
            params.workedTime || params.allVisitors ||
            params.workSearch || params.cost)
           queryCondition = makeReadFilter(params, queryCondition)
        if (queryCondition.Error) throw (queryCondition.Error)

        if (params.order) queryOrder = makeReadOrder(params.order, queryOrder)
        if (queryCondition.Error) throw (queryCondition.Error)

        const finalQuery = `SELECT * FROM visits
                            ${queryCondition}
                            ${queryOrder}`
    
        const result = await db.query(finalQuery)
    
        return result
    } catch (err) {
        return {Error: err}
    }
    
}


async function updateVisit(id, params) {
    try {
        let colsToUpdate = ``

        for (let i = 0; i < Object.keys(params).length; i++) {
            const key = Object.keys(params)[i];
            if(typeof params[key] === 'number') {
                colsToUpdate= colsToUpdate + `${key}=${params[key]}`
            } else {
                colsToUpdate = colsToUpdate + `${key}='${params[key]}'`
            }

            if(i !== Object.keys(params).length - 1) {
                colsToUpdate += ', '
            }

        }

        let updateQuery = `UPDATE visits SET ${colsToUpdate} WHERE id='${id}'`

        if(colsToUpdate) {
            const result = await db.query(updateQuery)
            return result
        }

        return "No change"
    } catch (err) {
        return {Error: err}
    }
}

async function deleteVisit(id) {
    try {
        const result = await db.query(`
        DELETE FROM visits WHERE id='${id}'
        `)
        return result
    } catch (err) {
        return {Error: err}
    }
}

module.exports = {
    createVisit,
    readVisit,
    updateVisit,
    deleteVisit
}