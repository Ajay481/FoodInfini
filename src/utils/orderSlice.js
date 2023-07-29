import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "./constants";

export const addOrderList = createAsyncThunk(
  "users/orderListPost",
  async (param, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/orderlist/${param.userId}/order.json`,
        {
          item: param.item,
          amount: param.amount,
        }
      );
    } catch (error) {
      toast.error("Order List post unsuccessful", {
        position: toast.POSITION.TOP_CENTER,
      });
      return rejectWithValue(error);
    }
  }
);

export const getOrderList = createAsyncThunk(
  "users/orderList",
  async (newEmailId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/orderlist/${newEmailId}/order.json`
      );
      const finalData = [];
      const objKeys = Object.keys(response.data === null ? {} : response.data);
      objKeys.forEach((keys) => {
        const objElement = response.data[keys];
        objElement.id = keys;
        finalData.push(objElement);
      });
      return finalData;
    } catch (error) {
      toast.error("Order List fetched unsuccessful", {
        position: toast.POSITION.TOP_CENTER,
      });
      return error;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    items: [],
    isLoading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(addOrderList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addOrderList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.items = action.payload;
    });
    builder.addCase(addOrderList.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(getOrderList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.items = action.payload;
    });
    builder.addCase(getOrderList.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default orderSlice.reducer;
