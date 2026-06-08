from flask import Flask, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    print(f'\n🏝️  蒼蠅王遊戲伺服器啟動中...')
    print(f'   請在瀏覽器開啟：http://localhost:{port}\n')
    app.run(debug=False, port=port)
