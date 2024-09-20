import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OrcaDataType, TokenDataType } from "@/types/home/orca";
import {
  combineOrcaAndTokenData,
  getOrcaData,
  getOrcaTokens,
} from "@/services/orca_api";
import { PAGE_SIZE } from "@/utils/home/orca_constants";

interface OrcaState {
  // data: (OrcaDataType & { tokenA?: TokenDataType; tokenB?: TokenDataType })[];
  tokens: TokenDataType[];
  loading: boolean;
  error: string | null;
  // currentPage: number;
  // totalPages: number;
}

const initialState: OrcaState = {
  // data: [],
  tokens: [],
  loading: false,
  error: null,
  // currentPage: 1,
  // totalPages: 0,
};

export const fetchOrcaData = createAsyncThunk(
  "orca/fetchOrcaData",
  async (limit: number, { rejectWithValue }) => {
    try {
      // const [orcaDataResult, orcaTokensResult] = await Promise.all([
      //   getOrcaData(limit),
      //   getOrcaTokens(limit),
      // ]);

      const [orcaTokensResult] = await Promise.all([
        getOrcaTokens(limit),
      ]);

      // const combined = combineOrcaAndTokenData(
      //   orcaDataResult,
      //   orcaTokensResult
      // );
      return { tokens: orcaTokensResult };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const orcaSlice = createSlice({
  name: "orca",
  initialState,
  reducers: {
    // setPage: (state, action) => {
    //   state.currentPage = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrcaData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrcaData.fulfilled, (state, action) => {
        // state.data = action.payload.combined;
        state.tokens = action.payload.tokens;
        state.loading = false;
        // state.totalPages = Math.ceil(
        //   action.payload.combined.length / PAGE_SIZE
        // );
      })
      .addCase(fetchOrcaData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const { setPage } = orcaSlice.actions;

export default orcaSlice.reducer;
