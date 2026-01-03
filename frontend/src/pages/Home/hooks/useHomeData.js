import { useState, useEffect } from "react";
import api from '../../../api/axios'


 

function useHomeData() {

 const [popularTools, setPopularTools] = useState([]);
  const [featuredTools, setFeaturedTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);


useEffect(() => {
    const fetchData = async () => {
      try {
        const [popRes, featRes, catRes] = await Promise.all([
          api.get("/popular"),
          api.get("/featured"),
          api.get("/categories"),
        ]);

        setPopularTools(popRes.data);
        setFeaturedTools(featRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);







  return { popularTools , featuredTools , categories , loading}
}

export default useHomeData