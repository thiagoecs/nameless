// getting logged in user information
const getMyProfile = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(URL_BASE + "/me", fetchOptions);
    const myProfile = await response.json();
    console.log("me:", myProfile);
    return myProfile;
  } catch (e) {
    console.log(e);
  }
};
