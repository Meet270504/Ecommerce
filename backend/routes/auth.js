const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../dbconfig');

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

// Helper to validate token
const validateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = decoded;
        next();
    });
};

// Register a new user
router.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (user) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.run(sql, [email, hashedPassword], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error registering user' });
            }
            res.status(200).json({ message: 'User registered successfully' });
        });
    });
});

// Login a user
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        res.status(200).json({ message: 'Login successful' });
    });
});

// Middleware to validate token
router.use(validateToken);

// Add product to cart
router.post('/cart/add', (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    const sql = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)';
    db.run(sql, [userId, productId], (err) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(200).json({ message: 'Product added to cart successfully' });
    });
});

// Other cart-related routes remain as they were
module.exports = router;