import z, { object } from 'zod';

export const addCategorySchema = object({
  categoryName: z
    .string({ error: 'Category name is required' })
    .trim()
    .min(1, 'Category name is required')
    .default('Category name is required'),
  categoryColor: z
    .string({ error: 'Category color is required' })
    .trim()
    .min(1, 'Category color is required'),
});
