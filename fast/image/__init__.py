from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import Response
from fastapi import HTTPException
from fast.image.utils import convert


router = APIRouter()

@router.post("/process")
async def process_image(color: str, threshold: int, rev: bool, file: UploadFile):
    if file.content_type not in ['image/jpg', 'image/png', 'image/jpeg', 'image/webp']:
        raise HTTPException(status_code=415, detail=f'{file.content_type} is not supported')
    
    try:
        raw = await file.read()
        image = \
            convert(raw, threshold, 255, 215, 0,   rev) if color == 'gold' else \
            convert(raw, threshold, 25,  25,  25,  rev) if color == 'dark' else \
            convert(raw, threshold, 235, 235, 235, rev) if color == 'light' else \
            convert(raw, threshold, 255, 198, 244, rev)
    except Exception:
        raise HTTPException(status_code=500, detail='cannot process image')
    else:
        return Response(content=image, media_type="image/png")
    