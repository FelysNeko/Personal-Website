from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Response
from fast import image
from fast import chemistry

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_methods=['*'],
    allow_origins=['*'],
    allow_headers=["*"],
)

app.include_router(image.router, prefix='/image')
app.include_router(chemistry.router, prefix='/chemistry')

@app.get('/')
async def root():
    return Response(content='felys-toolbox root endpoint')
