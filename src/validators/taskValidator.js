const { z } = require('zod');

const taskSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(3, { message: 'Title must be at least 3 characters' }),

  description: z
    .string({ required_error: 'Description is required' })
    .trim()
    .min(20, { message: 'Description must be at least 20 characters' }),

  date: z.string({ required_error: 'Date is required' }).trim(),

  taskOf: z.string({ required_error: 'User id is required' }).trim(),
});

module.exports = taskSchema;
