// import { Requests, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// /**
//  *
//  * @param {Requests} req
//  * @param {Response} res
//  * @param {NextFunction} next
//  */
export const authMiddleware = async (req, res, next) => {
  try {
    const hash = req.query.hash;
    const payload = await jwt.verify(hash, process.env.SECRET_KEY);
    if (payload) {
      req.payload = payload;
      next();
    } else {
      throw new Error("Authentication failed");
    }
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: error.message || "Client Error",
    });
  }
};
