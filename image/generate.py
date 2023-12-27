import cv2


def convert(path:str, r:int, g:int, b:int, name:str) -> None:
    # read in gray scale
    img = cv2.imread(path, 0)

    # polarize the image to black and white only
    img[img>50] = 255
    img[img<=50] = 0

    # convert the image to RGBA (A for alpha)
    new = cv2.cvtColor(img, cv2.COLOR_GRAY2RGBA)
    new[:,:,0] = b
    new[:,:,1] = g
    new[:,:,2] = r
    new[:,:,3] = ~img

    # gaussian blur and resize to smooth the image
    blur = cv2.GaussianBlur(new, (3,3), 1)
    resize = cv2.resize(blur, None, fx=0.9, fy=0.9)

    #output
    cv2.imwrite(f'{name}.png', resize)


# change the image name 
PATH = 'firemoth.png'
NAME = PATH.split('.')[0]

# feel free to try different color
#       PATH  R    G    B    NAME
convert(PATH, 255, 215, 0,   f'{NAME}-gold')
convert(PATH, 235, 235, 235, f'{NAME}-light')
convert(PATH, 25,  25,  25,  f'{NAME}-dark')
convert(PATH, 255, 198, 244, f'{NAME}-pink')
