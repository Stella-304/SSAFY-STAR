using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class ChatCell : MonoBehaviour
{
    public ChatType ChatType { private set; get; }

    public void SetUp(ChatType type, Color color, string textData)
    {
        TextMeshProUGUI text = GetComponent<TextMeshProUGUI>();

        //Debug.Log("type:" + type);
        //Debug.Log("color:" + color);

        ChatType = type;
        text.color = color;
        text.text = textData;
    }
}
