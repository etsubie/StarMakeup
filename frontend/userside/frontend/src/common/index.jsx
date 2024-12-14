const backendDomain = "http://localhost:4200";

const SummaryApi = {
  current_user: (token) => ({
    url: `${backendDomain}/api/user-details`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
};

export default SummaryApi;
