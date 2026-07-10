const testController={
    getTest: async(req,res)=>{
    res.send('Hello from test controller!');
    },
    postTest: async(req,res)=>{
        const {name,roll}=req.body;
        if (!name ||!roll) {
            return res.status(400).json({ message: "All fields are required." });
        }
        if(isNaN(roll)){
            return res.status(400).send('roll must be a number')
        }
        return res.status(201).json({
            message:"test route, controller for post",
            name,
            roll
        });
    }
}
module.exports=testController;