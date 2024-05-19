from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fast import image
from fast import chemistry

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_methods=['GET', 'POST'],
    allow_origins=['*'],
    allow_headers=["*"],
)

app.include_router(image.router, prefix='/image')
app.include_router(chemistry.router, prefix='/chemistry')

@app.get('/')
def root():
    return 'toolbox root endpoint'
