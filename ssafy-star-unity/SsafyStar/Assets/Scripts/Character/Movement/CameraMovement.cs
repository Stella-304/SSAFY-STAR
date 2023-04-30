using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraMovement : MonoBehaviour
{
    [Header("¿Ãµø")]
    public Transform Target;
    public float MouseSensitivity = 10f;
    public Transform listenerTf;
    public Vector3 posOffset;
    public Vector3 lookOffset;

    [Header("¡‹¿Œæ∆øÙ")]
    public float scrollSpeed = 10f;
    public float minZoomDistance = 1f;
    public float maxZoomDistance = 10f;


    void LateUpdate()
    {
        if (Target == null)
        {
            return;
        }

        float scroollWheel = Input.GetAxis("Mouse ScrollWheel");
        if(scroollWheel != 0)
        {
            posOffset.y += scroollWheel * scrollSpeed *Time.deltaTime;
        }

        transform.position = Target.position + posOffset;
        transform.LookAt(Target.transform.position + lookOffset);
        listenerTf.position = Target.transform.position + lookOffset;
    }
}
