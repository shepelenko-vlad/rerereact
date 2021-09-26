import axios from "axios";

const getData = async (url) => {
  const data = await axios
      .get(url)
      .then(response => response.data);
  return data;
};

export default getData;