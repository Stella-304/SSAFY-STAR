import { useMutation } from "react-query";
import axios from "axios";
import { FIND_ID_URL } from "../../utils/urls";

interface Payload {
  email: string;
}
const fetcher = (payload: Payload) =>
  axios
    .get(FIND_ID_URL, {
      params: { email: payload.email },
    })
    .then(({ data }) => data);

const useFindId = () => {
  return useMutation(fetcher, {});
};

export default useFindId;
