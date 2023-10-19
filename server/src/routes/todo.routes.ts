import express, { Request, Response } from "express";
const router = express.Router();
import db from "../utils/database";


router.get("/", async (req: Request, res: Response) => {
  try {
    const sql = await db.execute("SELECT * FROM todo");
    const [todo] = sql;

    res.status(200).json({
      message: "Thành công",
      todo: todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "lỗi server",
      error: error,
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { todoName } = req.body;
  try {
    const sql = await db.execute("INSERT INTO todo (todoName) VALUES (?)", [
      todoName,
    ]);
    const [result] = sql;
    res.json({
      message: "Thêm công việc thành công",
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error,
    });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { todoName } = req.body;
  try {
    const sql = await db.execute(
      "UPDATE todo SET todoName = ? WHERE todoId = ?",
      [todoName, id]
    );
    const [result]: any = sql;
    console.log("result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Công việc không tồn tại",
      });
    }
    res.json({ message: "Cập nhật công việc thành công" });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error,
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const sql = await db.execute("DELETE FROM todo WHERE todoId = ?", [id]);
    const [result]: any = sql;

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Công việc không tồn tại",
      });
    }
    res.json({ message: "Xóa công việc thành công" });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error,
    });
  }
});


export default router;
