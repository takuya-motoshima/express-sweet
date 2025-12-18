import {Router} from 'express';
import TodoModel from '../../models/TodoModel.js';

const router = Router();

// Get all todos for current user
router.get('/', async (req, res) => {
  const todos = await TodoModel.findAll({
    where: {userId: req.user.id},
    order: [['created', 'DESC']],
    raw: true
  });
  res.json(todos);
});

// Create new todo
router.post('/', async (req, res) => {
  const todo = await TodoModel.create({
    userId: req.user.id,
    title: req.body.title,
    completed: false
  });
  res.json(todo);
});

// Toggle todo completion
router.put('/:id/toggle', async (req, res) => {
  const todo = await TodoModel.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id
    }
  });
  if (todo) {
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } else {
    res.status(404).json({error: 'Todo not found'});
  }
});

// Delete todo
router.delete('/:id', async (req, res) => {
  const deleted = await TodoModel.destroy({
    where: {
      id: req.params.id,
      userId: req.user.id
    }
  });
  res.json({success: deleted > 0});
});

export default router;
