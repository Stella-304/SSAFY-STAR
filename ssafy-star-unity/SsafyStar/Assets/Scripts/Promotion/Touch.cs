using TMPro;
using UnityEngine;

public class Touch : MonoBehaviour
{

    [Tooltip("�ǳ�")]
    public GameObject panel;

    [Tooltip("������ url")]
    public string url;

    [Tooltip("����")]
    public string content;

    [Tooltip("��ư object")]
    public GameObject button;

    [Tooltip("�ؽ�Ʈ object")]
    public TMP_Text textcontent;

    [Tooltip("�̹��� object")]
    public GameObject img;

    private void OnMouseDown()
    {
        panel.SetActive(true);
    }
}
