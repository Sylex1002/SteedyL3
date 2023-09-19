import { InstanceAxiosAdmin } from "../../Helpers/InstanceAxionsAdmin";

export const loginAdminAction = (formdata) => {
  return async () => {
    await InstanceAxiosAdmin.post("/login", formdata).then((res) => {
      console.log(res);
    });
  };
};

// sigup super user
export const signupAdminAction = (formdata) => {
  return async () => {
    const res = await InstanceAxiosAdmin.post("/superuser", formdata);
    return res;
  };
};
