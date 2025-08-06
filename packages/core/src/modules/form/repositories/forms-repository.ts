import { Form, Prisma } from 'generated/prisma'

export interface FormsRepository {
  create(data: Prisma.FormCreateInput): Promise<Form>
  findById(id: string): Promise<Form | null>
  findByUserId(userId: string): Promise<Form[]>
}
