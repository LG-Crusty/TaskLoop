import {Router} from "express";

const router = Router();

router.route("/update").post((req, res) => {
    const name = req.body
  res.status(200).json({
      message: "mkb",
      name
  });
});

export default router;
