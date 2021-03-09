const redux = require('redux');
const combinereducer = redux.combineReducers;
const createStore = redux.createStore;
const applymiddleware = redux.applyMiddleware;

const buy_book="Buy_Book";
const buy_pen="Buy_PEN";

const initialStateb = {
    numberofBooks :10

}

const initialStatep = {
    numberofPen :15

}
function buyBook(){
    return{
        type:buy_book,
        info:"My first Action"

    }
}

function buyPen(){
    return{
        type:buy_pen,
        info:"My second action"

    }
} 
// (prevState,action)=>newState

const penreducer =(state=initialStatep,action)=>{
    switch(action.type)
    {
        case "Buy_PEN":return{
            ...state,
            numberofPen:state.numberofPen-1
        }
        default:return state;
    }
}
const bookreducer=(state=initialStateb,action)=>{
    switch(action.type)
    {

        case "Buy_Book":return{
            ...state,
            numberofBooks:state.numberofBooks-1
        }
        default: return state;
    }
}
const reducer =combinereducer( {
    book:bookreducer,
    pen:penreducer
});
const logger = store=>{
  return next=>{
        return  action => {
            const result = next(action);
            console.log("Middleware log",result);
            return result;

        }
    }
}
const store = createStore(reducer,applymiddleware(logger));
console.log("Initial State",store.getState());
const unsubscribe = store.subscribe(()=>{console.log('Updated State',store.getState())});
store.dispatch(buyBook());
store.dispatch(buyBook());
store.dispatch(buyPen());
store.dispatch(buyPen());

unsubscribe();