'use server'

import { createSession } from '@/app/lib/session'
import {
  SignupFormSchema,
  LoginFormSchema,
  FormState,
} from '@/app/lib/definitions'
import { cookies } from 'next/headers'
import { deleteSession } from '@/app/lib/session'
import { redirect } from 'next/navigation'
import { dbSecret } from '@/key.mjs'
import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  database: 'direct_chat',
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  password: dbSecret,
})

export async function signup(prevState: FormState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 2. Prepare data for insertion into database
  const { username, email, password } = validatedFields.data

  // 3. Insert the user into the database or call an Auth Library's API
  const data = await pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
    [username, email, password]
  )

  const r = await pool.query('SELECT * FROM users WHERE username = $1', [
    username,
  ])

  const user = r.rows[0]

  if (!user) {
    return {
      message: 'An error occured while creating your account',
    }
  }

  // 4. Create user session
  await createSession(user.user_id)
  // 5. Redirect user
  redirect('/')
}

export async function login(prevState: FormState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 2. Prepare data for login check
  const { username, password } = validatedFields.data

  // 3. Insert the user into the database or call an Auth Library's API
  const response = await pool.query('SELECT * FROM users WHERE username = $1', [
    username,
  ])
  const user = response.rows[0]

  if (user.password === password) {
    // 4. Create user session
    await createSession(user.user_id)
  } else {
    return {
      message: 'Password or username are wrong, try again',
    }
  }
  // 5. Redirect user
  redirect('/')
}

export async function logout() {
  try {
    deleteSession()
  } catch (error) {
    console.log('failed to logout')
    return {
      message: 'Ooops. something went wrong'
    }
  }
  redirect('/login')

}
