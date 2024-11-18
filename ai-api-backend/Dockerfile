# Use the official Python image as base
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

RUN python -m nltk.downloader stopwords

# Copy the rest of the application code
COPY app ./app


# Set the command to run the Flask app
CMD ["python", "app/app.py"]
