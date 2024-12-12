import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store/store';
import RadiumTable from './RadiumTable';
import { fetchRadiumPools } from '@/lib/store/slices/radium/poolSlice';

interface RadiumComponentProps {
  onClick: (poolId: string) => void;
}

const RadiumComponent: React.FC<RadiumComponentProps> = ({ onClick }) => {
  const dispatch: AppDispatch = useDispatch();
  const { pools, loading, error } = useSelector((state: RootState) => state.radiumPools);

  useEffect(() => {
    console.log('Fetching Radium pools...');
    dispatch(fetchRadiumPools('concentrated'));
  }, [dispatch]);

  useEffect(() => {
    console.log('Radium state:', {
      loading,
      error,
      poolsLength: pools?.length || 0,
      firstPool: pools?.[0],
    });
  }, [pools, loading, error]);

  if (loading) {
    return <div className="text-center p-4">Loading Radium pools...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  if (!pools || pools.length === 0) {
    return <div className="text-center p-4">No CLMM pools available</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Raydium CLMM Pools ({pools.length})</h2>
      <RadiumTable data={pools} handleClick={onClick} />
    </div>
  );
};

export default RadiumComponent;
