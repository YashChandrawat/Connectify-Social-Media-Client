import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../Utils/axiosClient";
export const getMyInfo = createAsyncThunk(
  "user/getMyInfo",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.get("/user/getMyInfo");
      return response.result;
    } catch (e) {
      return Promise.reject(e);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
export const updateMyProfile = createAsyncThunk(
  "user/updateMyProfile",
  async (body, thunkAPI) => {
    try {
      // console.log("the body is ", body)
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.put("/user/", body);
      return response.result;
    } catch (e) {
      return Promise.reject(e);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
const appConfigSlice = createSlice({
  name: "appConfigSlice",
  initialState: {
    isLoading: false,
    myProfile: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toastData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.myProfile = action.payload?.user;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        // console.log(action.payload.user)
        state.myProfile = action.payload?.user;
      });
  },
});
export default appConfigSlice.reducer;
export const { setLoading, showToast } = appConfigSlice.actions;
