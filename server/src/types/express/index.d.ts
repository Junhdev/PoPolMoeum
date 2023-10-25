import express from "express";

declare global {
  namespace Express {
    interface Request {
      file?: Record<string,any>
    }
  }
}