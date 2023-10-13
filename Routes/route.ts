import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({message: "Welcome To Server 2"});
});



export default router;