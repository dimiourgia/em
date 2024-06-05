import {
    DELETE_PRODUCT_SUCCESS,
    FILTER_PRODUCTS_FAILURE,
    FILTER_PRODUCTS_REQUEST,
    FILTER_PRODUCTS_SUCCESS,
    FIND_PRODUCTS_FAILURE,
    FIND_PRODUCTS_REQUEST,
    FIND_PRODUCTS_SUCCESS,
    FIND_PRODUCT_BY_ID_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST,
    FIND_PRODUCT_BY_ID_SUCCESS,
} from "./ActionType";

const initialState = {
    products: [],
    filteredProducts: [],
    product: null,
    loading: false,
    error: null
};

export const customerProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCTS_REQUEST:
        case FIND_PRODUCT_BY_ID_REQUEST:
        case FILTER_PRODUCTS_REQUEST:
            return { ...state, loading: true, error: null };

        case FIND_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: action.payload, filteredProducts: action.payload };
            
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return { ...state, loading: false, product: action.payload };

        case FIND_PRODUCTS_FAILURE:
        case FIND_PRODUCT_BY_ID_FAILURE:
        case FILTER_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FILTER_PRODUCTS_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                filteredProducts: state.products.filter(product => 
                    product.name.toLowerCase().includes(action.payload.toLowerCase())
                ) 
            };

        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: action.payload,
                filteredProducts: action.payload
            };

        default:
            return state;
    }
};


// import { 
//     DELETE_PRODUCT_SUCCESS, 
//     FILTER_PRODUCTS_FAILURE, 
//     FILTER_PRODUCTS_REQUEST, 
//     FILTER_PRODUCTS_SUCCESS, 
//     FIND_PRODUCTS_FAILURE, 
//     FIND_PRODUCTS_REQUEST, 
//     FIND_PRODUCTS_SUCCESS, 
//     FIND_PRODUCT_BY_ID_FAILURE, 
//     FIND_PRODUCT_BY_ID_REQUEST, 
//     FIND_PRODUCT_BY_ID_SUCCESS 
// } from "./ActionType";

// const initialState = {
//     products: [], // Initialize products as an array
//     filteredProducts: [], // Initialize filteredProducts as an array
//     product: null,
//     loading: false,
//     error: null
// };

// export const customerProductReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case FIND_PRODUCTS_REQUEST:
//         case FIND_PRODUCT_BY_ID_REQUEST:
//             return { ...state, loading: true, error: null };

//         case FIND_PRODUCTS_SUCCESS:
//             return { ...state, loading: false, error: null, products: action.payload, filteredProducts: action.payload };
            
//         case FIND_PRODUCT_BY_ID_SUCCESS:
//             return { ...state, loading: false, error: null, product: action.payload };

//         case FIND_PRODUCTS_FAILURE:
//         case FIND_PRODUCT_BY_ID_FAILURE:
//             return { ...state, loading: false, error: action.payload };
            
//         case DELETE_PRODUCT_SUCCESS:
//             return { ...state, loading: false, error: null, products: action.payload };
            
//         default:
//             return state;
//     }
// };

// export const filterProductsReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case FILTER_PRODUCTS_REQUEST:
//             return { ...state, loading: true, error: null };

//         case FILTER_PRODUCTS_SUCCESS:
//             const query = action.payload;
//             if (!query || query.length === 0) {
//                 return { ...state, filteredProducts: state.products, loading: false, error: null };
//             }

//             const filteredProducts = state.products.filter(product => 
//                 product.brand.includes(query) || 
//                 product.title.includes(query) || 
//                 product.description.includes(query)
//             );
//             return { ...state, filteredProducts, loading: false, error: null };

//         case FILTER_PRODUCTS_FAILURE:
//             return { ...state, loading: false, error: action.payload };

//         default:
//             return state;
//     }
// };
