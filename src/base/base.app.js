export const initializeState = (routes, currentState = window.location.pathname) => {

   const _importModule = (routes, currentState) => {
        let state = routes[currentState] || routes['*'];
        import(`../modules${state}`).then((d) => { console.log(d); });
        
    };

    _importModule(routes, currentState);

};