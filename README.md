# Note: 
> App run to Cloudflare Worker environment and does not use Node.js runtime. Therefore, "pnpm build" is only used for deploy. If you want to start production mode without deploying, you can try running it in development mode with  "--remote" flag.


# **Steps to Run the App**

## **Step 1: Installation Wrangler**
```bash
  pnpm add -g wrangler@4.14.4
```
---
## **Step 2: Login with Wrangler**
```bash
  wrangler login
```
---
## **Step 3: Create database**
  ```bash
  wrangler d1 create d1-demo
  ```
  ***Note: After create database, you should update `wrangler.jsonc`:*** 
  ```json
	{
		"binding": "<your binding env>",
		"database_name": "<database name>",
		"database_id": "<your database id generated>",
	}
  ```
---
## **Step 4: Create table**
  - Local: 
    ```bash
    wrangler d1 execute d1-demo --command "
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER
      );" --local
    ```
  - Production: 
    ```bash
    wrangler d1 execute d1-demo --command "
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER
      );" --remote
    ```
---

## **Step 5: Follow with these commands**

1. **Install Packages:**
   ```bash
   pnpm i
   ```
2. **Start apps:**
    - For development:
      ```bash
      pnpm start:dev
      ```
    - For local:
      ```bash
      pnpm start:local
      ```
3. **Deploy app:**
   ```bash
   pnpm deploy:d1-demo
   ```
---

# **API Routes and Steps for Drizzle D1 Demo**

## **1. List Users**
- **Endpoint:** `/list-users`
- **Method:** `GET`

## **2. Create User**
- **Endpoint:** `/create-user`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
   "name": "<YOUR NAME>",
   "age": 0
  }
  ```
## **3. Update User**
- **Endpoint:** `/update-user`
- **Method:** `PUT`
- **Request Params:**
  ```ts
  "userId": x
  ```
- **Request Body:**
  ```json
  {
   "name": "<YOUR NAME>",
   "age": 0
  }
  ```
## **4. Delete One User**
- **Endpoint:** `/delete-one-user`
- **Method:** `DELETE`
- **Request Params:**
  ```ts
  "userId": x
  ```

## **5. Delete All Users**
- **Endpoint:** `/delete-all-users`
- **Method:** `DELETE`