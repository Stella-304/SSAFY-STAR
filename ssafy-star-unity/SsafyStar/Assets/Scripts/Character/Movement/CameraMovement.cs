using System.Collections;
using System.Collections.Generic;
using System.Net;
using Unity.VisualScripting;
using UnityEngine;

public class CameraMovement : MonoBehaviour
{
    [Header("�̵�")]
    public Transform Target;
    public float MouseSensitivity = 10f;
    public Transform listenerTf;
    public Vector3 posOffset;
    public Vector3 lookOffset;

    [Header("���ξƿ�")]
    public float scrollSpeed = 10f;
    public float minZoomDistance = 1f;
    public float maxZoomDistance = 10f;

    [Header("ȸ��")]
    private Vector2 mousePos;
    public float rotationSpeed = 5f;
    public float minRotateDistance = -20f;
    public float maxRotateDistance = 20f;

    void LateUpdate()
    {
        if (Target == null)
        {
            return;
        }

        mousePos = Input.mousePosition;
        if(mousePos.x<100)
        {
            Debug.Log("�������� ȸ��");
            lookOffset.x -= rotationSpeed * Time.deltaTime;
            lookOffset.x = Mathf.Clamp(lookOffset.x, minRotateDistance, maxRotateDistance);
        }
        if(mousePos.x>1800)
        {
            Debug.Log("���������� ȸ��");
            lookOffset.x += rotationSpeed * Time.deltaTime;
            lookOffset.x = Mathf.Clamp(lookOffset.x, minRotateDistance, maxRotateDistance);
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
}
