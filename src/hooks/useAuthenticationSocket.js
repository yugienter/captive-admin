import { useSocket } from "socket.io-react-hook";

export const useAuthenticatedSocket = () => {
  return useSocket(process.env.REACT_APP_API_URL ?? "", {
    enabled: !!localStorage.id_token,
    auth: {
      token: localStorage.id_token,
    },
  });
};
