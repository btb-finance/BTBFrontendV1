import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OrcaWhirlpoolType } from "@/types/home/orca";
import { getOrcaWhirlpools } from "@/services/orca_api";
import { PAGE_SIZE } from "@/utils/home/orca_constants";

interface WhirlpoolState {
  data: OrcaWhirlpoolType[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: WhirlpoolState = {
  data: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
};

export const fetchWhirlpoolData = createAsyncThunk(
  "orca/fetchWhirlpoolData",
  async (_, { rejectWithValue }) => {
    try {
      const whirlpoolData = await getOrcaWhirlpools();
      return whirlpoolData;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch data");
    }
  }
);

const orcaWhirlpoolSlice = createSlice({
  name: "orcaWhirlpool",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWhirlpoolData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWhirlpoolData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.totalPages = Math.ceil(action.payload.length / PAGE_SIZE);
      })
      .addCase(fetchWhirlpoolData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage } = orcaWhirlpoolSlice.actions;

export default orcaWhirlpoolSlice.reducer;
