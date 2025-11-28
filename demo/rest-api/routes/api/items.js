import express from 'express';

const router = express.Router();

// In-memory data store (for demo purposes)
let items = [
  { id: 1, name: 'Item 1', description: 'First item' },
  { id: 2, name: 'Item 2', description: 'Second item' },
  { id: 3, name: 'Item 3', description: 'Third item' }
];
let nextId = 4;

/**
 * GET /api/items
 * Get all items
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: items,
    count: items.length
  });
});

/**
 * GET /api/items/:id
 * Get a single item by ID
 */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      error: {
        status: 404,
        message: `Item with ID ${id} not found`
      }
    });
  }

  res.json({
    success: true,
    data: item
  });
});

/**
 * POST /api/items
 * Create a new item
 */
router.post('/', (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      error: {
        status: 400,
        message: 'Name is required'
      }
    });
  }

  const newItem = {
    id: nextId++,
    name,
    description: description || ''
  };

  items.push(newItem);

  res.status(201).json({
    success: true,
    data: newItem
  });
});

/**
 * PUT /api/items/:id
 * Update an existing item
 */
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      error: {
        status: 404,
        message: `Item with ID ${id} not found`
      }
    });
  }

  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      error: {
        status: 400,
        message: 'Name is required'
      }
    });
  }

  items[itemIndex] = {
    ...items[itemIndex],
    name,
    description: description !== undefined ? description : items[itemIndex].description
  };

  res.json({
    success: true,
    data: items[itemIndex]
  });
});

/**
 * DELETE /api/items/:id
 * Delete an item
 */
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      error: {
        status: 404,
        message: `Item with ID ${id} not found`
      }
    });
  }

  const deletedItem = items.splice(itemIndex, 1)[0];

  res.json({
    success: true,
    data: deletedItem
  });
});

export default router;
