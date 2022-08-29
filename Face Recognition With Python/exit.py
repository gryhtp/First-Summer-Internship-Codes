import cv2
from simple_facerec import SimpleFacerec
from datetime import datetime
from datetime import date

def main():
    today = date.today()
    day = today.strftime("%b-%d-%Y")
    day_str = "Exit " + day + ".txt"

    dosya = open(day_str, "a+")
    dosya.write("--------------------  Ad, Saat, Tarih  --------------------\n")
    dosya.close()
    enteredPerson = []

    def yoklamayaYaz(name):
        with open(day_str, 'a+') as f:
            myDataList = f.readlines()
            nameList = []

            for line in myDataList:
                entry = line.split(',')
                nameList.append(entry[0])

            now = datetime.now()
            dtString = now.strftime('  %H:%M:%S')
            adtString = now.strftime('  %D')
            if not (name == "Bilinmiyor"):
                f.writelines(f'\n{name}{dtString}{adtString}\n')
                f.writelines("\n")
                enteredPerson.append(name)

    sfr = SimpleFacerec()
    sfr.load_encoding_images("./FaceID-Data/")

    cap = cv2.VideoCapture(0)

    flag = True

    while flag:
        ret, frame = cap.read()

        face_locations, face_names = sfr.detect_known_faces(frame)
        for face_loc, name in zip(face_locations, face_names):
            y1, x2, y2, x1 = face_loc[0], face_loc[1], face_loc[2], face_loc[3]

            cv2.putText(frame, name,(x1, y1 - 10), cv2.FONT_HERSHEY_DUPLEX, 1, (0, 0, 200), 2)
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 200), 4)

            if name in enteredPerson:
                flag = False
            else:
                yoklamayaYaz(name)

        cv2.imshow("Frame", frame)
        key = cv2.waitKey(1)
        if key == 27:
            break

    cap.release()
    cv2.destroyAllWindows()