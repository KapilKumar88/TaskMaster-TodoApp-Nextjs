import z, { object } from 'zod';

export const addCategorySchema = object({
  categoryName: z
    .string({ required_error: 'Category name is required' })
    .trim()
    .min(1, 'Category name is required')
    .default('Category name is required'),
  categoryColor: z
    .string({ required_error: 'Category color is required' })
    .trim()
    .min(1, 'Category color is required'),
});
