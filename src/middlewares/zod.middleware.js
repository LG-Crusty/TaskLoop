import { z } from "zod";
import { ApiError } from "../utils/apiError.js";



const check = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,20}$"
);


const user = z.object({
  username: z
    .string()
    .min(3, "username should be minimum of 3 char")
    .max(10, "username shouldn't be more then 10characters"),
  email: z.string().email().includes("@"),
  password: z.string().regex(check),
});

const zodMiddleware = (req, res, next) => {
  const data = req.body;

    const validation = user.safeParse(data);
    
    if (validation.success) {
    req.body = validation.data ;
    next();
  } else {
    throw new ApiError(400, validation.error, "invalid credentials");
  }
};

export default zodMiddleware;