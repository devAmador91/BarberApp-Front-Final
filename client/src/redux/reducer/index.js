import * as ACTIONS from "../actions";

// para el login
import { types } from "../../types/types";
//para el login

const initialState = {
  servicios: [],
  productos: [],
  allProductos: [],
  allServicios: [],
  detalle: {},
  categorias: [],
  empleados: [],
  citas: [],
  compras: [],
  barberos: [],
  //login
  user: {},
  isAuth: false,
  //cierra login
  adminAllUsers: [],
  adminAllProducts: [],
  favourites:[]
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ALL_PRODUCTOS:
      return {
        ...state,
        productos: action.payload,
        allProductos: action.payload,
      };

    case ACTIONS.BUSCAR_PRODUCTOS:
      return {
        ...state,
        productos: action.payload,
      };

    case ACTIONS.DETALLE_PRODUCTO:
      return {
        ...state,
        detalle: action.payload,
      };

    case ACTIONS.DELETE_PRODUCT:
      const oldProduct = state.adminAllProducts.filter(prod => prod.id !== action.payload.id)
      return {
        ...state,
        allProductos: state.allProductos.filter((p) => p.id !== action.payload.id),
        adminAllProducts: oldProduct.concat(action.payload),
        productos: state.productos.filter(prod => prod.id !== action.payload.id)
      };

    case ACTIONS.ELIMINAR_INFO_DETALLE:
      return {
        detalle: [],
      };

    case ACTIONS.GET_SERVICES:
      return {
        ...state,
        servicios: action.payload,
        // categorias: action.payload,
        allServicios: action.payload,
      };
    case ACTIONS.ADD_EMPLOYEE:
      return {
        ...state,
      };

    case ACTIONS.GET_EMPLOYEE:
      return {
        ...state,
        empleados: action.payload,
      };

    case ACTIONS.FILTER_CATEGORIAS:
      const filterProductos = state.allProductos;

      const infoCategoria =
        action.payload === "All"
          ? filterProductos
          : filterProductos.filter(
              (e) => e.category.categorie === action.payload
            );

      return {
        ...state,
        allProductos: infoCategoria,
      };

    case ACTIONS.GET_CATEGORIES:
      return {
        ...state,
        categorias: action.payload,
      };

    case ACTIONS.SORT_NAME:
      let orderName = [...state.allProductos];
      orderName = orderName.sort((a, b) => {
        if (a.name < b.name) {
          return action.payload === "ASC" ? -1 : 1;
        }
        if (a.name > b.name) {
          return action.payload === "ASC" ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        allProductos:
          action.payload === "Filter" ? state.allProductos : orderName,
      };

    case ACTIONS.SORT:
      let orderedCharacters = [...state.allProductos];
      orderedCharacters = orderedCharacters.sort((a, b) => {
        if (a.price < b.price) {
          return action.payload === "ASCENDENTE" ? -1 : 1;
        }
        if (a.price > b.price) {
          return action.payload === "ASCENDENTE" ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        servicios:
          action.payload === "Filtro" ? state.allServicios : orderedCharacters,
      };

    case ACTIONS.ORDER_PRECIO:
      let ordenPrecio = [...state.allProductos];

      const info =
        action.payload === "All"
          ? ordenPrecio
          : action.payload === "max"
          ? ordenPrecio.sort((a, b) => b.price - a.price)
          : ordenPrecio.sort((a, b) => a.price - b.price);

      return {
        ...state,
        allProductos: info,
      };

    case ACTIONS.FILTER_RANGO_PRECIO:
      let productosFilter = state.productos;

      const res = productosFilter.filter(
        (e) => e.price >= action.payload[0] && e.price <= action.payload[1]
      );

      return {
        ...state,
        productos: res,
      };

    case ACTIONS.ALL_CITAS:
      return {
        ...state,
        citas: action.payload,
      };

    case ACTIONS.CREAR_CITA:
      return {
        ...state,
        citas: state.citas.concat(action.payload),
      };

      case ACTIONS.ALL_COMPRA:
      return {
        ...state,
        compras: action.payload,
      };


    case ACTIONS.ALL_BARBEROS:
      return {
        ...state,
        barberos: action.payload,
      };

    // PARA EL LOGIN!!!!!

    case types.login:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };

    case types.logout:
      return {
        ...state,
        user: {},
        isAuth: false,
      };

    // CIERRA EL LOGIN!!!!!

    // ===================ACCIONES DE DAVID=================
    case types.getAllUsers:
      return {
        ...state,
        adminAllUsers: action.payload,
      };

    case types.banearUser:
      let users = state.adminAllUsers.filter(
        (user) => user.id !== action.payload.id
      );
      let user = action.payload;
      return {
        ...state,
        adminAllUsers: users.concat(user),
      };

    case types.getAllProductsAdmin:
      return {
        ...state,
        adminAllProducts: action.payload,
      };

    case ACTIONS.ADD_PRODUCT:
      return {
        ...state,
        allProductos: state.allProductos.concat(action.payload),
        productos: state.productos.concat(action.payload)
      };

    case types.addProductsAdmin:
      return {
        ...state,
        adminAllProducts: state.adminAllProducts.concat(action.payload),
      };

    case types.activaProducto:
      let activarProductoAdmin = state.adminAllProducts.filter((pro) => pro.id !== action.payload.id);
      let productoActivar = action.payload;
      return {
        ...state,
        adminAllProducts: activarProductoAdmin.concat(productoActivar),
        allProductos: state.allProductos.concat(action.payload),
        productos: state.productos.concat(action.payload)
      };

    case ACTIONS.DELETE_PRODUCT:
      let arrDeProductos = state.adminAllProducts.filter(
        (p) => p.id !== action.payload.id
      );
      let productoActualizado = action.payload;
      return {
        ...state,
        allProductos: state.allProductos.filter(
          (p) => p.id !== action.payload.id
        ),
        adminAllProducts: arrDeProductos.concat(productoActualizado),
      };

    case ACTIONS.UPDATE_PRODUCT:
      let Oldproductos = state.allProductos.filter(
        (p) => p.id !== action.payload.id
      );
      let OldProductosAdmin = state.adminAllProducts.filter(
        (p) => p.id !== action.payload.id
      );

      return {
        ...state,
        allProductos: Oldproductos.concat(action.payload),
        adminAllProducts: OldProductosAdmin.concat(action.payload),
      };

      case ACTIONS.GET_FAVOURITES:
        return {
          ...state,
          favourites:action.payload
        }

    default:
      return state;
  }
}

export default rootReducer;
