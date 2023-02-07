const validator = require('validator')

function makeReadOrder(params, queryOrder) {

    return orderData(params.order[0], params.order[1], queryOrder)
}

function orderData(target, order, queryOrder) {
    
    try {
        const prevQuery = queryOrder

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
        console.log(err)
        return {Error: err}
    }
}


module.exports = {
    makeReadOrder
}