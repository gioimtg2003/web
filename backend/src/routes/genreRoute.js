import express from "express";

const router = express.Router();


router.get("/", (req, res) => {
    const listGenre = [
        "Rock", "Pop", "EDM", "Hip-hop", "Nhạc đồng quê", "Jazz", "Nhạc cổ điển", "Nhạc trẻ", "Nhạc trữ tình", "Nhạc rap", "Nhạc dance", "Nhạc hòa tấu", "Nhạc thiếu nhi", "Nhạc không lời",
    ];
    res.json(listGenre);
});

export default router;
