import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OrcaWhirlpoolType } from "@/lib/types/home/orca";
import { getOrcaWhirlpools } from "@/lib/services/orca_api";
import { PAGE_SIZE } from "@/lib/utils/home/orca_constants";

interface WhirlpoolState {
  data: OrcaWhirlpoolType[];
  filteredData: OrcaWhirlpoolType[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  searchAddresses: string[];
}

const initialState: WhirlpoolState = {
  data: [],
  filteredData: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  searchAddresses: [],
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
    setTokenSearch: (state, action) => {
      const addresses = action.payload;
      state.searchAddresses = addresses;

      if (addresses.length === 0) {
        state.filteredData = state.data;
      } else if (addresses.length === 1) {
        const address = addresses[0];
        state.filteredData = state.data.filter(
          (whirlpool) =>
            whirlpool.tokenA.mint === address ||
            whirlpool.tokenB.mint === address
        );
      } else if (addresses.length === 2) {
        const [address1, address2] = addresses;
        state.filteredData = state.data.filter(
          (whirlpool) =>
            (whirlpool.tokenA.mint === address1 &&
              whirlpool.tokenB.mint === address2) ||
            (whirlpool.tokenA.mint === address2 &&
              whirlpool.tokenB.mint === address1)
        );
      }
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
        state.filteredData = action.payload;
        state.loading = false;
        state.totalPages = Math.ceil(action.payload.length / PAGE_SIZE);
      })
      .addCase(fetchWhirlpoolData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage, setTokenSearch } = orcaWhirlpoolSlice.actions;

export default orcaWhirlpoolSlice.reducer;
