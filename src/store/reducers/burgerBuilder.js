import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    // ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = { 
        building: true, ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIngredient2 = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngredients2 = updateObject(state.ingredients, updatedIngredient2);
    const updatedState2 = { 
        building: true, ingredients: updatedIngredients2,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatedState2);
};

const setIngredients = (state, action) => {
    const updatedState3 = { ingredients: action.ingredients, error: false, totalPrice: 4, building: false }
    return updateObject(state, updatedState3);
};

const fetchIngredientsFail = (state, action) => {
    return updateObject(state, { error: true });
};



const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);

        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);

        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFail(state, action);
            
        default: return state;
    }
}

export default reducer;