import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TokenDataType } from "@/types/home/orca";
import { getOrcaTokens, getOrcaTokensPrice } from "@/services/orca_api";

interface OrcaState {
  tokens: (TokenDataType & { price?: string })[];
  loading: boolean;
  error: string | null;
}

const initialState: OrcaState = {
  tokens: [],
  loading: false,
  error: null,
};

export const fetchOrcaData = createAsyncThunk(
  "orca/fetchOrcaData",
  async (limit: number, { rejectWithValue }) => {
    try {
      const orcaTokensResult = await getOrcaTokens(limit);
      const tokenPrices = await getOrcaTokensPrice();

      const tokensWithPrices = orcaTokensResult.map((token) => ({
        ...token,
        price: tokenPrices[token.address] || undefined,
      }));

      return { tokens: tokensWithPrices };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const orcaSlice = createSlice({
  name: "orca",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrcaData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrcaData.fulfilled, (state, action) => {
        state.tokens = action.payload.tokens;
        state.loading = false;
      })
      .addCase(fetchOrcaData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orcaSlice.reducer;