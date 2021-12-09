import express from 'express';
import mongoose from 'mongoose';

import UserMessage from '../models/usermodel.js';

const router = express.Router();

export const getUsers = async (req, res) => { 
    try {
        const postMessages = await UserMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUser = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await UserMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createuser = async (req, res) => {
    const { Name, Email, Hobbies, Address} = req.body;

    const newPostMessage = new UserMessage({ Name, Email, Hobbies, Address})

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { Name, Email, Hobbies, Address} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { Name, Email, Hobbies, Address, _id: id };

    await UserMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await UserMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}




export default router;