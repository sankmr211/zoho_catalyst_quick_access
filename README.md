# QuickAccess Serverless Application

**QuickAccess** is a serverless application developed using **Zoho Catalyst**, designed to deliver scalable and efficient solutions for streamlined application workflows.

---

## Platform Overview: Catalyst

**Catalyst** is a serverless application development platform that provides tools, frameworks, and resources for building robust and scalable applications without managing server infrastructure.

---

## Features

- **Serverless Framework**: Catalyst handles infrastructure, allowing developers to focus on code.  
- **Local Development**: Test and debug locally before deploying to the cloud.  
- **Separate Environments**: Manage separate development and production environments for efficient workflows.  

---

## Prerequisites

Ensure the following tools are installed on your system:

1. **Node.js**: v20.0.0  
   Download: [Node.js Official Website](https://nodejs.org)

   **nvm CLI:**
   ```bash
   nvm use v20.0.0
   ```

2. **Catalyst CLI**:  
   Install via npm:
   ```bash
   npm install -g zcatalyst-cli
   ```

3. **Check version**: 
    ```bash
    catalyst --version
    ```

4. **Login**: 
    ```bash
    catalyst login
    ```
5. **Initialize**: 
    ```bash
    catalyst init
    ```

6. **Setup client**: 
    ```bash
    catalyst client:setup
    ```
7. **Serve locally**: 
    ```bash
    catalyst serve
    ```

8. **Serve specific components**: 
    ```bash
    catalyst serve --only functions or catalyst serve --only client
    ```
9. **Deploy**: 
    ```bash
    catalyst deploy
    ```