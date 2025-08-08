import { Prisma, Form } from 'generated/prisma'
import { FormsRepository } from '../forms-repository'
import { prisma } from '@lib/prisma'

export class PrismaFormsRepository implements FormsRepository {
  async create(data: Prisma.FormCreateInput): Promise<Form> {
    const form = await prisma.form.create({ data })

    return form
  }

  async findById(id: string): Promise<Form | null> {
    const form = await prisma.form.findUnique({
      where: { id },
    })

    return form
  }

  async findByUserId(userId: string): Promise<Form[]> {
    const forms = await prisma.form.findMany({
      where: {
        user_id: userId,
      },
      include: {
        fields: true,
      },
    })

    return forms
  }

  async deleteById(id: string): Promise<void> {
    await prisma.form.delete({
      where: { id },
    })
  }
}
