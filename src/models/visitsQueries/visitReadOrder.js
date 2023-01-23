const validator = require('validator')

function makeReadOrder(params, queryOrder) {
    params = JSON.parse(params)

    return orderData(params.by, params.order, queryOrder)
}

function orderData(target, order, queryOrder) {
    
    const prevQuery = queryOrder

    if(!['asc', 'desc'].includes(order.toLowerCase())) {
        return prevQuery
    }

    if(target === 'loc') {
        queryOrder += ` ORDER BY 
        JSON_EXTRACT(${target}, '$[0]') ${order}`
    } else if(target === 'allVisitors') {
        queryOrder += ` ORDER BY 
        JSON_LENGTH(${target}) ${order}`
    } else {
        queryOrder += `ORDER BY ${target} ${order}`
    }
    
    return queryOrder
}


module.exports = {
    makeReadOrder
}