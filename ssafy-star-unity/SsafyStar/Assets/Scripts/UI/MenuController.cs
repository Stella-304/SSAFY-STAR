using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.UIElements;
using UnityEngine.SceneManagement;
using System;

public class MenuController : MonoBehaviour
{
    [Header("Mute Button")]
    [SerializeField]
    private Sprite muteSprite;
    [SerializeField]
    private Sprite unmuteSprite;
    private bool muted;

    [Header("Setting Button")]
    private VisualElement btnWrapper;
    //[SerializeField]
    //private VisualTreeAsset btnSettingTemplate;
    //private VisualElement btnSettings;

    [Header("WebGL")]
    private string nickname;
    private bool isLogin;

    private UIDocument doc;
    private Button btnPlay;
    private Button btnMute;
    private VisualElement cardPlay;
    private VisualElement cardGuest;

    [DllImport("__Internal")]
    private static extern void GetUser(int accessNumber);

    private void Awake()
    {
        doc = GetComponent<UIDocument>();

        btnPlay = doc.rootVisualElement.Q<Button>("ButtonPlay");
        btnMute = doc.rootVisualElement.Q<Button>("ButtonMute");
        cardPlay = doc.rootVisualElement.Q<VisualElement>("CardPlay");
        cardGuest = doc.rootVisualElement.Q<VisualElement>("CardGuest");

        btnWrapper = doc.rootVisualElement.Q<VisualElement>("Buttons");

        cardPlay.AddManipulator(new Clickable(BtnPlayOnClicked));
        cardGuest.AddManipulator(new Clickable(BtnGuestOnClicked));
        btnMute.clicked += BtnMuteOnClicked;
    }

    //React���� �α��� ������ �����ֱ� ���� �����ϴ� �Լ�
    public void GetLogin(int isLogin)
    {
        if (isLogin == 1)
        {
            Debug.Log("�α��� ��");
        }
        else if (isLogin == 0)
        {
            Debug.Log("�α��� ���� ����");
        }
        else
        {
            Debug.Log("�̻��� ���� ���Ծ�");
        }
    }

    //React���� �г��� ������ �����ֱ� ���� �����ϴ� �Լ�
    public void GetNickname(string nickname = "")
    {
        if (nickname == "")
        {
            Debug.Log("�г����� ����");
        }
        else
        {
            Debug.Log("�г���:" + nickname);
        }
    }

    //Unity���� �÷��� ��ư�� �������� ����Ǵ� �Լ�
    private void BtnPlayOnClicked()
    {
//webGL���� react�� ���� ����
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    GetUser(100);
    Debug.Log("����");
#endif
        Debug.Log("play");
        if (nickname == null) { Debug.Log("�α������� ����"); }
        //SceneManager.LoadScene("Lobby");
    }

    //Unity���� �Խ�Ʈ�� �÷��� ��ư�� �������� ����Ǵ� �Լ�
    private void BtnGuestOnClicked()
    {
        Debug.Log("guest");
        SceneManager.LoadScene("Lobby");
    }

    private void BtnMuteOnClicked()
    {
        muted = !muted;
        var bg = btnMute.style.backgroundImage;
        bg.value = Background.FromSprite(muted ? muteSprite : unmuteSprite);
        btnMute.style.backgroundImage = bg;

        AudioListener.volume = muted ? 0 : 1;
    }
}
