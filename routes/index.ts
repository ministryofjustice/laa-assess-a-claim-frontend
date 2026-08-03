import { viewClaimPage } from "#src/controllers/claims/viewClaimController.js";
import { handleYourClaimsPage } from "#src/controllers/viewClaimsController.js";
import express from "express";
import type { Request, Response, NextFunction } from "express";

export const ROUTES = {
  CLAIMS: "/",
  VIEW_CLAIM: "/claims/:claimId",
} as const;

// Create a new router
const router = express.Router();

/* GET home page. */
router.get(
  ROUTES.CLAIMS,
  async function (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    await handleYourClaimsPage(req, res, next);
  },
);

/* GET view claim page. */
router.get(
  ROUTES.VIEW_CLAIM,
  async function (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    await viewClaimPage(req, res, next);
  },
);

// Make an API call with `Axios` and `middleware-axios`
// GET users from external API
router.get(
  "/users",
  async function (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      // Use the Axios instance attached to the request object
      const response = await req.axiosMiddleware.get(
        "https://jsonplaceholder.typicode.com/users",
      );
      res.json(response.data);
    } catch (error) {
      next(error);
    }
  },
);

/* TEST show user properties */
router.get("/user", function (req: Request, res: Response): void {
  res.render("main/user.njk");
});

export default router;
