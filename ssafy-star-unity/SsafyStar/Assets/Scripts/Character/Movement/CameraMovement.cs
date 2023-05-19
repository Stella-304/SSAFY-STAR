using System.Collections;
using System.Collections.Generic;
using System.Net;
using Unity.VisualScripting;
using UnityEngine;

public class CameraMovement : MonoBehaviour
{
    [Header("이동")]
    public bool stop = false;
    public Transform Target;
    public float MouseSensitivity = 10f;
    public Transform listenerTf;
    public Vector3 posOffset;
    public Vector3 lookOffset;

    [Header("기본 카메라 위치")]
    public Vector3 posOffsetOrigin;
    public Vector3 lookOffsetOrigin;

    [Header("줌인아웃")]
    public float scrollSpeed = 10f;
    public float minZoomDistance = 1f;
    public float maxZoomDistance = 10f;

    [Header("회전")]
    private Vector2 mousePos;
    public float rotationSpeed = 5f;
    public float minRotateDistanceX = -20f;
    public float maxRotateDistanceX = 20f;
    public float minRotateDistanceY = 1.5f;
    public float maxRotateDistanceY = 17f;

    private void Awake()
    {
        posOffsetOrigin = posOffset;
        lookOffsetOrigin = lookOffset;
    }

    void LateUpdate()
    {
        if (Target == null)
        {
            return;
        }

        if(stop)
        {
            return;
        }

        if(Input.GetKeyDown(KeyCode.C))
        {
            ResetCamera();
        }

        mousePos = Input.mousePosition;

        //if (mousePos.y < 650 && mousePos.y > 180)
        //{
        //    if (mousePos.x < 200)
        //    {
        //        lookOffset.x -= rotationSpeed * Time.deltaTime;
        //        lookOffset.x = Mathf.Clamp(lookOffset.x, minRotateDistanceX, maxRotateDistanceX);
        //    }
        //    if (mousePos.x > 1500)
        //    {
        //        lookOffset.x += rotationSpeed * Time.deltaTime;
        //        lookOffset.x = Mathf.Clamp(lookOffset.x, minRotateDistanceX, maxRotateDistanceX);
        //    }
        //}
        
        if(mousePos.x < 1500 && mousePos.x > 300)
        {
            if(mousePos.y<150)
            {
                lookOffset.y -= rotationSpeed * Time.deltaTime;
                lookOffset.y = Mathf.Clamp(lookOffset.y, minRotateDistanceY, maxRotateDistanceY);
            }
            else if(mousePos.y>900)
            {
                lookOffset.y += rotationSpeed * Time.deltaTime;
                lookOffset.y = Mathf.Clamp(lookOffset.y, minRotateDistanceY, maxRotateDistanceY);
            }
        }

        float scroollWheel = Input.GetAxis("Mouse ScrollWheel");
        if (scroollWheel != 0)
        {
            posOffset.y += scroollWheel * scrollSpeed * Time.deltaTime;
            posOffset.y = Mathf.Clamp(posOffset.y, minZoomDistance, maxZoomDistance);
        }

        transform.position = Target.position + posOffset;
        transform.LookAt(Target.transform.position + lookOffset);
        listenerTf.position = Target.transform.position + lookOffset;
    }

    public void ResetCamera()
    {
        posOffset = posOffsetOrigin;
        lookOffset = lookOffsetOrigin;
    }
}
