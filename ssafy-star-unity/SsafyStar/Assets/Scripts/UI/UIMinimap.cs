using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using UnityEngine.SceneManagement;

public class UIMinimap : MonoBehaviour
{
    [SerializeField]
    private Camera minimapCamera;
    [SerializeField]
    private float zoomMin = 1;
    [SerializeField]
    private float zoomMax = 30;
    [SerializeField]
    private float zoomOneStep = 1;
    [SerializeField]
    private GameObject fullMap;
    private bool isFullMap = false;

    private void Update()
    {
        if(Input.GetKeyDown(KeyCode.M))
        {
            fullMap.SetActive(isFullMap ? false : true);
            isFullMap = isFullMap ? false : true;
        }
    }

    public void ZoomIn()
    {
        minimapCamera.orthographicSize = Mathf.Max(minimapCamera.orthographicSize-zoomOneStep, zoomMin);
    }

    public void ZoomOut()
    {
        minimapCamera.orthographicSize = Mathf.Min(minimapCamera.orthographicSize + zoomOneStep, zoomMax);
    }
}
