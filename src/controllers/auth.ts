import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    const data = { "message": "Requested all users" };
    return res
        .status(200)
        .json(data);
});

export default router;
