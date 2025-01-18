import { toast } from "react-toastify";
import axios from "axios";

const useGetSummary = () => {
  return async () => {
    try {
      const response = await axios.post(
        "https://api.mockaroo.com/api/4eb52e70?count=6&key=148a1fd0"
      );
      return response.data;
    } catch {
      toast.error("Failed to fetch Authors");
    }
  };
};

export default useGetSummary;
