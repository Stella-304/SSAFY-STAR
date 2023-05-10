using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.UIElements;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using TMPro;
using System;

public class MenuController : MonoBehaviour
{
    [Header("Mute Button")]
    [SerializeField]
    private Sprite muteSprite;
    [SerializeField]
    private Sprite unmuteSprite;
    private bool muted;

    [Header("WebGL")]
    private string _nickname;
    private bool _isLogin;

    [Header("NickNameUI")]
    [SerializeField]
    private GameObject panelNickname;
    [SerializeField]
    private TMP_Text textNickname;
    [SerializeField]
    private TMP_Text textResult;

    private UIDocument doc;
    private UnityEngine.UIElements.Button btnMute;
    private VisualElement cardPlay;
    private VisualElement cardGuest;

    [DllImport("__Internal")]
    private static extern void GetUser(int accessNumber);

    private void Awake()
    {
        doc = GetComponent<UIDocument>();

        btnMute = doc.rootVisualElement.Q<UnityEngine.UIElements.Button>("ButtonMute");
        cardPlay = doc.rootVisualElement.Q<VisualElement>("CardPlay");
        cardGuest = doc.rootVisualElement.Q<VisualElement>("CardGuest");

        cardPlay.AddManipulator(new Clickable(BtnPlayOnClicked));
        cardGuest.AddManipulator(new Clickable(BtnGuestOnClicked));
        btnMute.clicked += BtnMuteOnClicked;
    }

    //Unity���� �÷��� ��ư�� �������� ����Ǵ� �Լ�
    private void BtnPlayOnClicked()
    {
//webGL���� react�� ���� ����
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    GetUser(100);
    Debug.Log("Unity -> React ����");
#endif
    }

    //Unity���� �Խ�Ʈ�� �÷��� ��ư�� �������� ����Ǵ� �Լ�
    private void BtnGuestOnClicked()
    {
        OpenNickNamePanel();
    }

    //React���� �α��� ������ �����ֱ� ���� �����ϴ� �Լ�
    public void GetLogin(int isLogin)
    {
        if (isLogin == 1)
        {
            Debug.Log("�α��� ��");
            _isLogin = true;
        }
        else if (isLogin == 0)
        {
            Debug.Log("�α��� ���� ����");
            _isLogin = false;
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
            OpenNickNamePanel();
        }
        else
        {
            Debug.Log("�г���:" + nickname);
            _nickname = nickname;
            SceneManager.LoadScene("Lobby");
        }
    }

    public void OpenNickNamePanel()
    {
        panelNickname.SetActive(true);
    }

    public void SetNickName()
    {
        _nickname = textNickname.text;

        if(_nickname.Length>10)
        {
            textResult.gameObject.SetActive(true);
            textResult.text = "10���� �̳��� �Է����ּ���";
        }
        else
        {
            SceneManager.LoadScene("Lobby");
        }
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
