import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const CreateOrderSchema = z.object({
  quantity: z
    .number({ message: '数量は数値で指定してください' })
    .int({ message: '数量は整数で指定してください' })
    .min(1, { message: '数量は1以上で指定してください' })
    .max(999, { message: '数量は999以下で指定してください' }),
  userId: z
    .string({ message: 'ユーザーIDは文字列で指定してください' })
    .min(1, { message: 'ユーザーIDは必須です' })
    .regex(/^[0-9A-HJKMNP-TV-Z]{26}$/, { 
      message: 'ユーザーIDの形式が正しくありません' 
    }),
  bookId: z
    .string({ message: '書籍IDは文字列で指定してください' })
    .min(1, { message: '書籍IDは必須です' })
    .regex(/^[0-9A-HJKMNP-TV-Z]{26}$/, { 
      message: '書籍IDの形式が正しくありません' 
    }),
});

export class CreateOrderDto extends createZodDto(CreateOrderSchema) {}

export type CreateOrderType = z.infer<typeof CreateOrderSchema>;
