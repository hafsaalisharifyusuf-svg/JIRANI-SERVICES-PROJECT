from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allows frontend to talk to backend

@app.route("/")
def home():
    return {"message": "Jirani Services API is running 🚀"}

if __name__ == "__main__":
    app.run(debug=True)
