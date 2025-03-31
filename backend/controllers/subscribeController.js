import Subscriber from "../models/Subscriber.js"

export const subscribeController = async (req, res) => {
    const {email} = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    // Check if email is already subscribed
    try {
        const existingSubscriber= await Subscriber.findOne({email})
        if (existingSubscriber) return res.status(400).json({ message: "Already subscribed" });
        // Create new subscriber    
        const newSubscriber = new Subscriber({email})
        await newSubscriber.save()
        res.status(201).json({ message: "Subscribed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}