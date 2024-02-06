
import { userValidation } from "../validation/validationSchema.js";
export const validateUser = async (req, res, next) => {
  try {
    await userValidation.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ message: error.errors.join(", ") });
  }
};