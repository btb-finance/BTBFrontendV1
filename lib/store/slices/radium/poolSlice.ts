import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRadiumData } from '@/lib/services/radium_api';

interface RadiumPool {
  id: string;
  mintA: {
    symbol: string;
  };
  mintB: {
    symbol: string;
  };
  day: {
    volume: number;
    volumeFee: number;
    apr: number;
    feeApr: number;
  };
  tvl: number;
}

interface RadiumPoolState {
  pools: RadiumPool[];
  loading: boolean;
  error: string | null;
}

const initialState: RadiumPoolState = {
  pools: [],
  loading: false,
  error: null,
};

export const fetchRadiumPools = createAsyncThunk(
  'radiumPools/fetchPools',
  async (poolType: string) => {
    try {
      const response = await fetchRadiumData(1, 100, 'tvl', 'desc', poolType);
      if (!response.success || !response.data?.data) {
        throw new Error('Failed to fetch pools data');
      }
      return response.data.data;
    } catch (error) {
      throw error instanceof Error ? error : new Error('Unknown error occurred');
    }
  }
);

const radiumPoolSlice = createSlice({
  name: 'radiumPools',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRadiumPools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRadiumPools.fulfilled, (state, action) => {
        state.loading = false;
        state.pools = action.payload;
        state.error = null;
      })
      .addCase(fetchRadiumPools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch pools';
      });
  },
});

export default radiumPoolSlice.reducer;
