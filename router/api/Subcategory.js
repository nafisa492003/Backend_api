const { Router } = require("express");
const {
 SubcategoryController,
  UpdateSubCategory,
  DeleteSubCatagory,
} = require("../../controllers/SubcategoryController");

const router = Router();

router.post("/createsubcategory", SubcategoryController);
router.put("/updateSubCategory/:id", UpdateSubCategory);
router.delete("/deleteSubCatagory/:id",DeleteSubCatagory)
module.exports = router;
