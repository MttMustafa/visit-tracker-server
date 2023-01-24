const db = require('../db/mysql')
const { makeReadFilter } = require('./visitsQueries/visitsReadFilter')
const { makeReadOrder } = require('./visitsQueries/visitReadOrder')

// TODO: Add validation for query inputs
// TODO: Handle and return errors properly

async function createVisit(params) {

    const result =  await db.query(`
        INSERT INTO visits
        (id ,loc, date, startTime, endTime, allVisitors, workDone, cost)
        VALUES
        (${params.id}, '${params.loc}', '${params.date}',
                 '${params.startTime}', '${params.endTime}',
                 '${params.allVisitors}', '${params.workDone}', ${params.cost})
    `)

    console.log(params)
    console.log(result)
    return result
}

async function readVisit(params) {

    let queryCondition = ``
    let queryOrder = ``

    if(params.filter) queryCondition = makeReadFilter(params.filter, queryCondition)
    if(params.sort) queryOrder = makeReadOrder(params.sort, queryOrder)

    const finalQuery = `SELECT * FROM visits
                        ${queryCondition}
                        ${queryOrder}`

    console.log(finalQuery)

    const result = await db.query(finalQuery)

    return result
    
}


async function updateVisit(id, params) {

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
}

async function deleteVisit(id) {
    const result = await db.query(`
        DELETE FROM visits WHERE id='${id}'
    `)
    return result
}

module.exports = {
    createVisit,
    readVisit,
    updateVisit,
    deleteVisit
}