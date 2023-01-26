const validator = require('validator')

function makeReadOrder(params, queryOrder) {

    return orderData(params.by, params.order, queryOrder)
}

function orderData(target, order, queryOrder) {
    
    try {
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
    } catch (err) {
        console.log(err)
        return {Error: err}
    }
}


module.exports = {
    makeReadOrder
}