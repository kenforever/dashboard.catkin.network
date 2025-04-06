# 🐱 Catkin Dashboard – Crypto Payment Admin Panel

Welcome to the **Catkin Network** dashboard – a Web3 admin panel that empowers merchants to:

- 🧾 Create and manage products  
- 💵 Set USD prices  
- 🔐 Authenticate via wallet + JWT  
- ✅ Receive on-chain payments (via 1inch Fusion, gasless & MEV-protected)

---

## 🚀 Features

- **🛒 Product Management**
  - Add, edit, delete products
  - Prices stored in **USD**

- **🔐 JWT Authentication**
  - On wallet connect, a JWT token is issued and stored in localStorage

- **📦 API Integration**
  - All product data is synced with FastAPI backend (`/product/my-products`)

- **🎨 Beautiful UI**
  - Built with Next.js, Tailwind CSS, shadcn/ui

- **💱 Cross-chain quote via 1inch Fusion (frontend only)**
  - Preview incoming token and USDC settlement

---

## 🖼️ Preview

> Product Management UI:

![Product dashboard preview](./public/demo-dashboard.png)

> Payment Flow (from 1inch frontend integration):

![Swap preview](./public/demo-swap.png)

---

## 📦 Tech Stack

| Layer        | Stack                           |
|--------------|----------------------------------|
| Frontend     | Next.js 14 (App Router)          |
| Backend      | FastAPI (Python)                 |
| Styling      | Tailwind CSS + shadcn/ui         |
| Web3 SDK     | wagmi v2 + viem                  |
| Cross-chain  | [1inch Fusion](https://1inch.io/fusion) |
| Auth         | WalletConnect + JWT              |
| Token Storage| `localStorage.setItem("token", "xxx")` |

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-org/dashboard.catkin.network.git
cd dashboard.catkin.network
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run the frontend (Next.js)

```bash
pnpm run dev
```

### 4. Run the backend (FastAPI, in another terminal)

```bash
uvicorn main:app --reload
```

> Note: Make sure your FastAPI runs on `http://localhost:8000`

---

## 🔑 Token-based Auth (JWT)

Before using the dashboard, store your JWT token in localStorage:

```js
localStorage.setItem("token", "your-JWT-here");
```

---

