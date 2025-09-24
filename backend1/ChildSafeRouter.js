import express from 'express';
const router = express.Router();
import Child from './ChildSafeModel.js';
import Counter from './CounterModel.js';
router.get('/:qrId', async (req, res) => {
    try {
        const qrId = req.params.qrId;
        const childData = await Child.findOne({ QRID: qrId });
        if (!childData) {
            return res.status(404).json({ 
                success: false, 
                message: 'No data found for this QR ID' 
            });
        }

        res.status(200).json({
            success: true,
            data: childData
        });



    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});
router.post('/', async (req, res) => {
    try {
        const newChild = new Child(req.body);
        const savedChild = await newChild.save();
        res.status(201).json({
            success: true,
            data: savedChild
        });
        await Counter.findOneAndUpdate(
          { name: "childCounter" },
          { $inc: { count: 1 } },
          { upsert: true, new: true } 
      );
    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
});

router.get('/count/total', async (req, res) => {
  try {
      const counter = await Counter.findOne({ name: "childCounter" });
      res.status(200).json({
          success: true,
          count: counter ? counter.count : 0
      });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
});


export default router;
