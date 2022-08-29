import cv2

def main():
    camera = cv2.VideoCapture(0)
    return_value,image = camera.read()
    cv2.imwrite('./FaceID-Data/NewUser.png',image)
    camera.release()
    cv2.destroyAllWindows()