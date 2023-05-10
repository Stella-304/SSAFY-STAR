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

    //Unity에서 플레이 버튼을 눌렀을때 실행되는 함수
    private void BtnPlayOnClicked()
    {
//webGL에서 react로 값을 보냄
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    GetUser(100);
    Debug.Log("Unity -> React 보냄");
#endif
    }

    //Unity에서 게스트로 플레이 버튼을 눌렀을때 실행되는 함수
    private void BtnGuestOnClicked()
    {
        OpenNickNamePanel();
    }

    //React에서 로그인 정보를 보내주기 위해 실행하는 함수
    public void GetLogin(int isLogin)
    {
        if (isLogin == 1)
        {
            Debug.Log("로그인 함");
            _isLogin = true;
        }
        else if (isLogin == 0)
        {
            Debug.Log("로그인 하지 않음");
            _isLogin = false;
        }
        else
        {
            Debug.Log("이상한 값이 들어왔어");
        }
    }

    //React에서 닉네임 정보를 보내주기 위해 실행하는 함수
    public void GetNickname(string nickname = "")
    {
        if (nickname == "")
        {
            Debug.Log("닉네임이 없음");
            OpenNickNamePanel();
        }
        else
        {
            Debug.Log("닉네임:" + nickname);
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
            textResult.text = "10글자 이내로 입력해주세요";
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
