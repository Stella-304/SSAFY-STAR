using TMPro;
using UnityEngine;

public class Touch : MonoBehaviour
{

    [Tooltip("판넬")]
    public GameObject panel;

    [Tooltip("페이지 url")]
    public string url;

    [Tooltip("내용")]
    public string content;

    [Tooltip("버튼 object")]
    public GameObject button;

    [Tooltip("텍스트 object")]
    public TMP_Text textcontent;

    [Tooltip("이미지 object")]
    public GameObject img;

    private void OnMouseDown()
    {
        panel.SetActive(true);
    }
}
