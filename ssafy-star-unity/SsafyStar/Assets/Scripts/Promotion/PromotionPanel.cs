using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PromotionPanel : MonoBehaviour
{
    public GameObject panel;
    public void ClosePanel()
    {
        panel.SetActive(false);
        Camera.main.GetComponent<CameraMovement>().stop = false;
    }
}
