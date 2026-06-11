import { viewClaimPage } from "#src/controllers/claims/viewClaimController.js";
import { handleYourClaimsPage } from "#src/controllers/viewClaimsController.js";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import { rateLimit } from "express-rate-limit";
import { lineItemsPage, evidencePage, lineItemPage } from "#src/controllers/demo/demoController.js"

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per minute
});

export const ROUTES = {
  CLAIMS: '/',
  VIEW_CLAIM: '/claims/:claimId',
} as const;

// Create a new router
const router = express.Router();

/* GET home page. */
router.get(ROUTES.CLAIMS, limiter, async function (req: Request, res: Response, next: NextFunction): Promise<void> {
  await handleYourClaimsPage(req, res, next);
});

/* GET view claim page. */
router.get(ROUTES.VIEW_CLAIM, limiter, async function (req: Request, res: Response, next: NextFunction): Promise<void> {
  await viewClaimPage(req, res, next);
});

/* GET line items page. */
router.get("/demo/line-items", lineItemsPage);

/* GET line item page. */
router.get("/demo/line-item", lineItemPage);

/* GET evidence page. */
router.get("/demo/evidence", evidencePage);

// Make an API call with `Axios` and `middleware-axios`
// GET users from external API
router.get(
  "/users",
  limiter,
  async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Use the Axios instance attached to the request object
      const response = await req.axiosMiddleware.get("https://jsonplaceholder.typicode.com/users");
      res.json(response.data);
    } catch (error) {
      next(error);
    }
  }
);

/* TEST show user properties */
router.get('/user', function (req: Request, res: Response): void {
	res.render('main/user.njk');
});

export default router;
