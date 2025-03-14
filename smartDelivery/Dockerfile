# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set environment variables to prevent Python from writing pyc files and buffer stdout/stderr
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container and install Python dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the entire project into the container
COPY . /app/

# (Optional) Collect static files during build
# RUN python manage.py collectstatic --noinput

# Expose port 8000 (the default port for Django)
EXPOSE 8000

# Use gunicorn to run the Django application
CMD ["gunicorn", "smartDelivery.wsgi:application", "--bind", "0.0.0.0:8000"]
