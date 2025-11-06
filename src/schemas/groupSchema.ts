import { z } from 'zod';

export const groupSchema = z.object({
  name: z
    .string()
    .min(3, 'Group name must be at least 3 characters')
    .max(100, 'Group name must be less than 100 characters')
    .trim(),
  
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters')
    .trim(),
  
  groupFor: z.enum(['students', 'teachers', 'both']),
  
  gender: z.array(z.enum(['male', 'female'])).optional(),
  
  type: z.enum(['academic', 'hall', 'jobs', 'others']),
  
  privacy: z.enum(['public', 'private', 'closed']),
  
  educationLevel: z
    .enum([
      'UNIVERSITY',
      'MEDICAL_COLLEGE',
      'NATIONAL_UNIVERSITY',
      'COLLEGE',
      'POLYTECHNIC',
      'SCHOOL',
    ])
    .optional(),
  
  tags: z.string().optional(),
  
  rules: z.string().optional(),
  
  // University fields
  universityName: z
    .enum(['BUET', 'DU', 'RUET', 'CUET', 'KUET'])
    .optional(),
  
  department: z
    .enum(['CSE', 'EEE', 'ME', 'CE', 'CHE'])
    .optional(),
  
  section: z.enum(['A', 'B', 'C']).optional(),
  
  subsection: z.enum(['1', '2']).optional(),
  
  year: z.enum(['1', '2', '3', '4', '5']).optional(),
  
  semester: z.enum(['1', '2']).optional(),
  
  // College fields
  collegeName: z
    .enum([
      'Notre Dame College',
      'Holy Cross College',
      'Dhaka College',
      'Rajuk College',
    ])
    .optional(),
  
  collegeDepartment: z
    .enum(['science', 'commerce', 'arts'])
    .optional(),
  
  collegeYear: z.enum(['1', '2', 'admission']).optional(),
  
  boardType: z.enum(['madrasah', 'general']).optional(),
  
  board: z.enum(['dhaka', 'chittagong']).optional(),
  
  version: z.enum(['bangla', 'english']).optional(),
  
  medium: z.enum(['bangla', 'english']).optional(),
});

export type GroupFormData = z.infer<typeof groupSchema>;
