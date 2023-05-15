using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using WebSocketSharp;

public class PromotionPanel : MonoBehaviour
{
    public GameObject panel;
    public void ClosePanel()
    {
        panel.SetActive(false);
    }
}
