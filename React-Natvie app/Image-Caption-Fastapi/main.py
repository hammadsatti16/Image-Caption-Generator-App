# 1. Load important libraries
from distutils.log import debug
import uvicorn
from fastapi import FastAPI,File,UploadFile
from test_model import extract_features, word_for_id, generate_desc
from fastapi.responses import FileResponse
import pickle
from pickle import load
from PIL import Image
from tensorflow.keras.utils import load_img 
from tensorflow.keras.utils import get_file
from keras.models import load_model
from starlette.responses import HTMLResponse 
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import pillow_heif

# 2. Create the app object

app = FastAPI()
db = []
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Load the model
models = load_model("./modelA_3.h5")
#pic = extract_features("/content/1.jpg") #path of picture 
tokenizer = load(open('./tokenizer.pkl', 'rb')) #path to tokenizer file

# 4. post request and do pre processing and generate caption
@app.post("/api/File")
async def create_upload_file(file: UploadFile= File(...)): #bytes instead of Upload File
    print("File:", file.filename, file.content_type)
    
    contents = await file.read() 

    db.append(file)
    
    with open(file.filename, "wb") as f:
        f.write(contents)

    features = extract_features(file.filename)
    caption = generate_desc(models, tokenizer, features, 31)
    caption = caption.strip("startseq")
    caption = caption.strip("endseq")

    return {'Caption': caption}
# 5. Run the API with uvicorn
#    Will run on http://127.0.0.1:8000
if __name__ == '__main__':
    uvicorn.run(app, host='192.168.10.10', port=5000, debug=True)