# Step 1: Use an official Node.js runtime as a parent image
FROM node:18 AS builder

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the NestJS application
RUN npm run build

# Step 7: Use a smaller image for running the application
FROM node:18-slim

# Step 8: Set the working directory in the container
WORKDIR /usr/src/app

# Step 9: Copy only the built application and dependencies from the builder stage
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

# Step 10: Install only the production dependencies
RUN npm install --only=production

# Step 11: Expose the port the app runs on
EXPOSE 3000

# Step 12: Define the command to run the application
CMD ["node", "dist/main"]
