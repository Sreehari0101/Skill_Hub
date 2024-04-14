from scipy.spatial import distance as dist
from imutils.video import VideoStream
from imutils import face_utils
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import imutils
import time
import dlib
import cv2
import os

vs = None
EYE_AR_THRESH = 1
COUNTER = 0
TOTAL = 0
LOOKDOWN_COUNTER = 0

def eye_aspect_ratio(eye):
    A = dist.euclidean(eye[1], eye[5])
    B = dist.euclidean(eye[2], eye[4])
    C = dist.euclidean(eye[0], eye[3])
    ear = (A + B) / (2.0 * C)
    return ear

@csrf_exempt
@require_POST
def start_tracking(request, courseId):
    global EYE_AR_THRESH, COUNTER, TOTAL, LOOKDOWN_COUNTER

    fps = 10
    EYE_AR_CONSEC_FRAMES = 2 * fps

    detector = dlib.get_frontal_face_detector()
    current_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.abspath(os.path.join(current_dir, os.pardir))
    shape_predictor_path = os.path.join(parent_dir, 'models', 'shape_predictor_68_face_landmarks.dat')
    predictor = dlib.shape_predictor(shape_predictor_path)  # Initialize predictor

    (lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
    (rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]

    vs = VideoStream(src=0).start()
    time.sleep(0.5)

    _sum = 0
    _counter = int(5 * fps)
    disengaged = False
    LOOKDOWN_COUNTER = 0

    while True:
        frame = vs.read()
        frame = imutils.resize(frame, width=800, height= 800)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        rects = detector(gray, 0)
        
        if len(rects) != 0:
            LOOKDOWN_COUNTER = 0
            shape = predictor(gray, rects[0])
            shape = face_utils.shape_to_np(shape)
            leftEye = shape[lStart:lEnd]
            rightEye = shape[rStart:rEnd]
            leftEAR = eye_aspect_ratio(leftEye)
            rightEAR = eye_aspect_ratio(rightEye)
            ear = (leftEAR + rightEAR) / 2.0

            if EYE_AR_THRESH == 1:
                if _counter > 0:
                    _sum += ear
                    _counter -= 1
                else:
                    EYE_AR_THRESH = _sum / int(5 * fps) * 0.9
                    start = int(time.time())
            
            if _counter == 0:       
                leftEyeHull = cv2.convexHull(leftEye)
                rightEyeHull = cv2.convexHull(rightEye)
                cv2.drawContours(frame, [leftEyeHull], -1, (0, 255, 0), 1)
                cv2.drawContours(frame, [rightEyeHull], -1, (0, 255, 0), 1)
                
                if COUNTER >= EYE_AR_CONSEC_FRAMES:
                    disengaged = True
                    TOTAL += 1
                    if ear >= EYE_AR_THRESH:
                        COUNTER = 0
                    else:
                        COUNTER += 1
                elif COUNTER < EYE_AR_CONSEC_FRAMES:
                    disengaged = False
                    if ear < EYE_AR_THRESH:
                        COUNTER += 1
                    else:
                        COUNTER = 0
               
                if disengaged:
                    print("Disengaged")
                    cv2.putText(frame, "Disengaged",(10, 30),           # visual output
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                else:
                    print("Engaged")
                    cv2.putText(frame, "Engaged",(10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
                cv2.putText(frame, "EAR: {:.2f}".format(ear), (300, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)
                cv2.putText(frame, "Total: {:.2f}".format(TOTAL/fps),(300, 70),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)

                print("EAR:", ear)
                print("Total Disengaged:", TOTAL / fps)

        elif EYE_AR_THRESH != 1:
            LOOKDOWN_COUNTER += 1
            ear = 0

            if LOOKDOWN_COUNTER >= EYE_AR_CONSEC_FRAMES:
                disengaged = True
                TOTAL += 1

            if disengaged:
                print("Disengaged")
                cv2.putText(frame, "Disengaged",(10, 30),           # visual output
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
            else:
                print("Engaged")
                cv2.putText(frame, "Engaged",(10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            cv2.putText(frame, "EAR: {:.2f}".format(ear), (300, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)
            cv2.putText(frame, "Total: {:.2f}".format(TOTAL/fps),(300, 70),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)
            print("EAR:", ear)
            print("Total Disengaged:", TOTAL / fps)

        cv2.imshow("Frame", frame)
        key = cv2.waitKey(1) & 0xFF
        if key == ord("q"):  # Press 'q' to exit the loop
            break

    cv2.destroyAllWindows()
    vs.stop()



@csrf_exempt
@require_POST
def pause_tracking(request, courseId):
    global vs
    
    if vs:
        vs.stop()
        vs = None
        print("Tracking paused successfully")
        return HttpResponse("Tracking paused successfully")
    else:
        print("Tracking is not running")
        return HttpResponse("Tracking is not running")
     
    

@csrf_exempt
@require_POST
def stop_tracking(request, courseId):
    global vs, EYE_AR_THRESH, COUNTER, TOTAL, LOOKDOWN_COUNTER

    if vs:
        vs.stop()
        vs = None
        # Reset global variables
        EYE_AR_THRESH = 1
        COUNTER = 0
        TOTAL = 0
        LOOKDOWN_COUNTER = 0
        print("Tracking stopped successfull")
        return HttpResponse("Tracking stopped successfull")
    else:
        print("Tracking is not running")
        return HttpResponse("Tracking is not running")