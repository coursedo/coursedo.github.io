import * as yup from 'yup'

export const chapterSchema = yup.object({
  numberId: yup.number(),
  name: yup
    .string()
    .trim()
    .required('* Please input chapter name')
    .max(255, 'Chapter name must contain at most 255 characters'),
  description: yup.string().trim().nullable(),
  video: yup.string().trim().nullable()
})

export const validationCourseSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('* Please input name of course')
    .max(255, 'Course name must contain at most 255 characters'),
  price: yup
    .number()
    .required('* Please input price')
    .min(0, 'Please input valid price'),
  promotionPrice: yup
    .number()
    .nullable()
    .min(0, 'Please input valid price')
    .lessThan(
      yup.ref('price'),
      'Promotion price must be less than original price'
    ),
  categoryId: yup.number().nullable().required('* Please choose category'),
  teacherId: yup.string().nullable().required('* Please choose teacher'),
  chapters: yup
    .array()
    .required('* Please input at least 1 chapter')
    .of(chapterSchema),
  thumbnail: yup
    .string()
    .nullable()
    .required('* Please choose thumbnail for course')
})
