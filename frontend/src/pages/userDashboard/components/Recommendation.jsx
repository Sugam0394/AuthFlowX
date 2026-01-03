import React, {useEffect} from 'react'
import  { useDispatch, useSelector } from 'react-redux'
import { fetchRecommendedTools } from '../store/slices/recommendedToolsSlice'
import ToolsGrid from './ToolGrid'

function Recommendation() {

   const dispatch = useDispatch();

  const userField = useSelector((state) => state.auth.user?.field);
  const { tools, loading, error } = useSelector(
    (state) => state.recommendedTools
  );

  console.log("👤 User field:", userField);


  useEffect(() => {
    if (userField) {
      dispatch(fetchRecommendedTools(userField));
    }
  }, [dispatch, userField]);


console.log("👤 User field:", userField);








  return (
    <section className="dashboard-section">
      <h2>Recommended for You</h2>

      {loading && <p className="muted-text">Loading recommendations…</p>}

      {error && <p className="error-text">Something went wrong</p>}

      {!loading && tools.length === 0 && (
        <p className="muted-text">
          No recommendations available right now
        </p>
      )}

      {!loading && tools.length > 0 && (
        <ToolsGrid tools={tools} />
      )}
    </section>
  )
}

export default Recommendation