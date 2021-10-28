const initialstate = {    
    users: [    
        { id: 1, firstName: "Banky", lastName: "McWhin", phoneNumber: "9884025845" },    
        { id: 2, firstName: "Jennilee", lastName: "Lippatt", phoneNumber: "9658425635" },    
        { id: 3, firstName: "Reynolds", lastName: "Delve", phoneNumber: "8654752589" }    
    ]    
};    
    
const reducer = (state = initialstate, action) => {    
    switch (action.type) {    
        case 'GET_USER':    
            return {    
                ...state    
            };    
        case 'ADD_USER':    
            return {    
                ...state,    
                users: state.users.concat(action.payload)    
            };    
        case 'EDIT_USER':    
            return {    
                ...state,    
                users: state.users.map(    
                    (content, i) => content.id === action.payload.id ? 
                    {...content, firstName : action.payload.firstName ,
                          lastName : action.payload.lastName ,
                         phoneNumber : action.payload.phoneNumber }    
                    : content)    
            };    
        case 'DELETE_USER':    
            return {    
                ...state,    
                users: state.users.filter(item => item.id !== action.payload)    
            };    
        default:    
            return state;    
    }    
};    
    
export default reducer; 