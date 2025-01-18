import { toast } from "react-toastify";
import axios from "axios";

const useFetchProjects = () => {
  return async () => {
    try {
      const response = await axios.post(
        "https://api.mockaroo.com/api/c4c2bc50?count=6&key=148a1fd0"
      );
      return response.data;
    } catch {
      toast.error("Failed to fetch Projects");
    }
  };
};

export default useFetchProjects;
