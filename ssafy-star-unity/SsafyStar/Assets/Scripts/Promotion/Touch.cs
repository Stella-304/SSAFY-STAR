using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class Touch : MonoBehaviour
{

    [Tooltip("판넬")]
    public GameObject panel;

    [Tooltip("페이지 url")]
    public string url;

    [Tooltip("제목")]
    public string title;

    [Tooltip("내용")]
    [TextArea]
    public string content;

    [Tooltip("이미지")]
    public Sprite image;

    [Tooltip("hover이름")]
    public GameObject hover;

    [Tooltip("제목 object")]
    public TMP_Text titleObject;

    [Tooltip("버튼 object")]
    public Button button;

    [Tooltip("텍스트 object")]
    public TMP_Text textcontent;

    [Tooltip("이미지 object")]
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
