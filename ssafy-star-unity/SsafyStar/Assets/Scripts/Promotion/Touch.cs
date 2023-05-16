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
        if (button != null)
        {
            //button listener reset
            button.onClick.RemoveAllListeners();
            //button event
            button.onClick.AddListener(goPage);

        }

        if (titleObject != null)
        {
            //panel title input
            titleObject.text = title;
        }

        if (textcontent != null)
        {
            //panel content input
            textcontent.text = content;

        }

        //panel content image
        img.GetComponent<Image>().sprite = image;

        panel.SetActive(true);

        Camera.main.GetComponent<CameraMovement>().stop = true;
    }

    private void OnMouseOver()
    {
        if (hover != null)
            hover.SetActive(true);
    }

    private void OnMouseExit()
    {
        if (hover != null)
            hover.SetActive(false);
    }
}
