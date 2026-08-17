# Step 1: Build React Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Set up Python Backend & Serve
FROM python:3.11-slim
WORKDIR /app
COPY SAP/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt gunicorn
COPY SAP/ ./
COPY --from=frontend-builder /app/dist ./static

EXPOSE 5000
CMD ["python", "backend_api.py"]
