# SAMS Supabase Setup Guide

This project uses Supabase for authentication and profile management. Follow these steps to set up your own Supabase instance.

## 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create an account.
2. Click **New Project**, select an organization, and give your project a name (e.g., "SAMS Database").
3. Generate a secure database password and choose the region closest to you.
4. Click **Create new project** and wait for the database to provision.

## 2. Get API Keys
1. In your Supabase dashboard, go to **Project Settings** (gear icon) -> **API**.
2. Copy the **Project URL**.
3. Copy the **anon / public** key.
4. Copy the **service_role** key (keep this secret!).

## 3. Configure Environment Variables

**Frontend (`sams-frontend/.env.local`)**:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SUPABASE_URL=YOUR_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_KEY
```

**Backend (`sams-backend/.env`)**:
```
PORT=5000
SUPABASE_URL=YOUR_PROJECT_URL
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
JWT_SECRET=YOUR_JWT_SECRET (generate a random string)
FRONTEND_URL=http://localhost:3000
```

## 4. Create the Profiles Table
1. In the Supabase dashboard, go to **SQL Editor**.
2. Paste and run the following SQL snippet to create the `profiles` table:

```sql
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  role text not null check (role in ('student', 'lecturer', 'admin')),
  full_name text not null,
  reg_number text, -- Only for students
  batch text, -- Only for students
  employee_id text, -- Only for lecturers
  department text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS
alter table profiles enable row level security;

-- Allow users to read their own profile
create policy "Users can view own profile"
  on profiles for select
  using ( auth.uid() = id );
```

## 5. Add an Admin User
Since admins cannot register via the frontend:
1. Go to **Authentication** -> **Users** in the Supabase dashboard.
2. Click **Add User** -> **Create new user**.
3. Enter an email (e.g., `admin@sjp.ac.lk`) and a password.
4. After creation, copy the new user's `User UID`.
5. Go to the **Table Editor** -> `profiles`.
6. Insert a new row manually:
   - `id`: The copied User UID
   - `role`: 'admin'
   - `full_name`: 'System Administrator'
   - Leave `reg_number`, `batch`, `employee_id` empty.

## 6. Run the App
1. In the `sams-backend` directory, run `npm run dev`.
2. In the `sams-frontend` directory, run `npm run dev`.
3. Go to `http://localhost:3000/auth/login` to start testing!
