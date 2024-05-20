import numpy as np
import cv2


def convert(raw:bytes, threshold:int, r:int, g:int, b:int, rev:bool) -> None:
    buf = np.frombuffer(raw, np.uint8)
    img = cv2.imdecode(buf, cv2.IMREAD_GRAYSCALE)
    
    img[img>threshold] = 255
    img[img<=threshold] = 0

    new = cv2.cvtColor(img, cv2.COLOR_GRAY2RGBA)
    mask = img==255 if rev else img==0
    new[mask, 0] = b
    new[mask, 1] = g
    new[mask, 2] = r
    new[:, :, 3] = img if rev else ~img

    blur = cv2.GaussianBlur(new, (3,3), 1)
    resize = cv2.resize(blur, None, fx=0.9, fy=0.9)
    _, result = cv2.imencode(".png", resize)
    return result.tobytes()