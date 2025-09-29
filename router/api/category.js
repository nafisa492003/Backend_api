const { Router } = require("express");
const {
  createCategory,
  getAllCategory,
  getSingalCategory,
  UpdateCategory,
  DeleteCatagory,
} = require("../../controllers/CategoryproductController");

const router = Router();

router.post("/createCategory", createCategory);
router.put("/updateCatagory/:id", UpdateCategory);
router.get("/getAllCategory", getAllCategory);
router.get("/getSingalCategory/:id", getSingalCategory);
router.delete("/deleteCatagory/:id",DeleteCatagory)
module.exports = router;
