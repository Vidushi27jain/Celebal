const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Dummy data
let users = [
  { id: 1, name: 'Rahul Jain', email: 'rahul27@gmail.com' },
  { id: 2, name: 'Tina  Sharma', email: 'tina@gmail.com' },
];


const router = express.Router();


router.get('/', (req, res) => {
  res.json(users);
});

// Get user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// Create a new user
router.post(
  '/',
  [
    check('name').isLength({ min: 1 }).withMessage('Name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newUser = {
      id: users.length + 1,
      name: req.body.name,
      email: req.body.email,
    };
    users.push(newUser);
    res.status(201).json(newUser);
  }
);

// Update a user
router.put(
  '/:id',
  [
    check('name').isLength({ min: 1 }).withMessage('Name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = users.find(u => u.id == req.params.id);
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  }
);

// Delete a user
router.delete('/:id', (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.status(204).send();
});

app.use('/users', router);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
