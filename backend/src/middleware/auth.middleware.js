import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { CandidateRegistration } from "../models/candidateRegistration.model.js";

export const authMiddleware = async (req, res, next) => {
  let token;

  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Unauthorized. Token missing.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const candidate = await CandidateRegistration.findById(decoded.id).select("-password");

    if (!candidate) {
      throw new ApiError(401, "Unauthorized. Candidate not found.");
    }

    req.user = candidate;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
};
