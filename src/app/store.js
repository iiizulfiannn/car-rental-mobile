import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { authApi } from '../entity/auth/authService';
import authSlice from '../entity/auth/authSlice';
import { orderApi } from '../entity/order/orderService';
import orderSlice from '../entity/order/orderSlice';
import { carApi } from '../entity/car/carService';
import { userApi } from '../entity/user/userService';
import { adminApi } from '../entity/admin/adminService';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    order: orderSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [carApi.reducerPath]: carApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      orderApi.middleware,
      carApi.middleware,
      userApi.middleware,
      adminApi.middleware,
    ]),
});
