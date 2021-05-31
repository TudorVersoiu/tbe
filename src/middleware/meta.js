// Helper function that creates anonymous middleware which
// will append specified info to the request pipeline

// The point of this is to act similar to a decorator when specifying routes

module.exports = (routeInfo) => {
    return (req, res, next) => {
        if ( !req.meta )
            req.meta = {}

        for ( var property in routeInfo )
            req.meta[property] = routeInfo[property];
        next();
    }
}
