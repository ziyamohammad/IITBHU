from fastapi import FastAPI
from pydantic import BaseModel
from model import RandomForest
import uvicorn

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://iitbhu-one.vercel.app","http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = RandomForest("tox21.csv")
model.train()
print(">>>>>Model feeded<<<<<<<")

class SmileFormat(BaseModel):
    smile : str

@app.post("/pred")
def pred(request: SmileFormat):
    predict = model.predict_smiles(request.smile)

    return predict


# app.mount("/", StaticFiles(directory="public", html=True), name="public")


if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8088
    )
