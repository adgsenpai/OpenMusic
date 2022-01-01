from flask import Flask,render_template,send_from_directory

app = Flask(__name__,template_folder='.')

@app.route('/')
def home():
  return render_template('index.html')

@app.route('/songs/<path:path>')
def send_song(path):
    return send_from_directory('songs', path)

if __name__ == "__main__":
  app.run(host="0.0.0.0",port=3000)