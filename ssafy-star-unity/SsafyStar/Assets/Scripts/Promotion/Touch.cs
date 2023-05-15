using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class Touch : MonoBehaviour
{

    [Tooltip("�ǳ�")]
    public GameObject panel;

    [Tooltip("������ url")]
    public string url;

    [Tooltip("����")]
    public string title;

    [Tooltip("����")]
    [TextArea]
    public string content;

    [Tooltip("�̹���")]
    public Sprite image;

    [Tooltip("hover�̸�")]
    public GameObject hover;

    [Tooltip("���� object")]
    public TMP_Text titleObject;

    [Tooltip("��ư object")]
    public Button button;

    [Tooltip("�ؽ�Ʈ object")]
    public TMP_Text textcontent;

    [Tooltip("�̹��� object")]
    public GameObject img;

    private void goPage()
    {
        Application.OpenURL(url);
    }

    private void OnMouseDown()
    {
        //button listener reset
        button.onClick.RemoveAllListeners();
        //button event
        button.onClick.AddListener(goPage);

        //panel title input
        titleObject.text = title;
        //panel content input
        textcontent.text = content;

        //panel content image
        img.GetComponent<Image>().sprite = image;

        panel.SetActive(true);
    }

    private void OnMouseOver()
    {
        hover.SetActive(true);
    }

    private void OnMouseExit()
    {
        hover.SetActive(false);
    }
}
