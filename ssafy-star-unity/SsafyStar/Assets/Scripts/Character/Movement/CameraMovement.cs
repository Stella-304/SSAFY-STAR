using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraMovement : MonoBehaviour
{
    public Transform Target;
    public float MouseSensitivity = 10f;
    public Transform listenerTf;
    public Vector3 posOffset;
    public Vector3 lookOffset;

    private float vertialRotation;
    private float horizontalRotation;

    void LateUpdate()
    {
        if (Target == null)
        {
            return;
        }

        transform.position = Target.position + posOffset;
        transform.LookAt(Target.transform.position + lookOffset);
        listenerTf.position = Target.transform.position + lookOffset;

        //float mouseX = Input.GetAxis("Mouse X");
        //float mouseY = Input.GetAxis("Mouse Y");

        //vertialRotation -= mouseY * MouseSensitivity;
        //vertialRotation = Mathf.Clamp(vertialRotation, -70f, 70f);

        //horizontalRotation += mouseX * MouseSensitivity;

        //transform.rotation = Quaternion.Euler(vertialRotation, horizontalRotation, 0);
    }
}
