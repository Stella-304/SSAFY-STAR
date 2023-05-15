using Cinemachine;
using Fusion;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraControl : MonoBehaviour
{
    [Header("Camera")]
    public Camera Camera;
    public CinemachineVirtualCamera cineCamera;
    public CinemachineVirtualCamera rightCamera;
    public CinemachineVirtualCamera leftCamera;

    public void InitiateCamera(Transform transform)
    {
        Camera = Camera.main;
        cineCamera = Camera.GetComponent<CinemachineVirtualCamera>();
        Camera.GetComponent<CameraMovement>().Target = transform;
        cineCamera.Follow = transform;
        cineCamera.LookAt = transform;
    }

    public void NPCPriority(Transform transform)
    {
        cineCamera.Priority = -10;
        rightCamera.Priority = 15;
        leftCamera.Priority = 15;
        rightCamera.LookAt = transform;
        leftCamera.LookAt = transform;
    }

    public void SetMainCameraPriorityHigh()
    {
        cineCamera.Priority = 20;
    }

    public void SetMainCameraPriorityLow()
    {
        cineCamera.Priority = 20;
        rightCamera.Priority = 10;
        leftCamera.Priority = 10;
    }
}
