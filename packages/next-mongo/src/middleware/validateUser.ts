// const bcrypt = require('bcrypt')
import bcrypt from 'bcryptjs'
import { getUserByQueryService } from '../service/user.service'

export const userExistValidate = async (queryInput: any) => {
  try {
    if (queryInput?.email) {
      const email = queryInput.email
      const user = await getUserByQueryService({ email })
      return user
    }
  } catch (e) {
    throw e
  }
}

export const userPasswordValidate = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  try {
    const user = await getUserByQueryService({ email })
    if (!user) return false

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return false
    return user
  } catch (e) {
    throw e
  }
}
