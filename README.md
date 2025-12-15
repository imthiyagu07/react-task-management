# React Task Management App

A role-based task management application with Drag-and-Drop functionality.

## Features
- **Admin Role**: Create tasks, assign them to users, and reassign using Drag-and-Drop.
- **User Role**: View assigned tasks and mark them as Completed.
- **Persistence**: All data is saved in LocalStorage.
- **State Management**: Zustand for auth, React Context for DnD.

## Setup Instructions

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run the App**
    ```bash
    npm run dev
    ```

3.  **Login Credentials**
    *   **Admin**: username: `admin` / password: `admin123`
    *   **User 1**: username: `user1` / password: `user123`
    *   **User 2**: username: `user2` / password: `user123`

## Tech Stack
*   React 18
*   Zustand (State)
*   React-DnD (Drag and Drop)
*   Vite