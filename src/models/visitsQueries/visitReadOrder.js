
function makeReadOrder(params, queryOrder) {
    try {
        queryOrder = orderData(params[0], params[1], queryOrder)
        if (queryOrder.Error) throw queryCondition.Error
        return queryOrder
    } catch (err) {
        return {Error: err}
    }
}

// Builds up and SQL order query string from given parameters

function orderData(target, order, queryOrder) {
    
    try {

        if(!['asc', 'desc'].includes(order.toLowerCase())) {
                throw "Invalid order type."
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
        return {Error: err}
    }
}


module.exports = {
    makeReadOrder
}