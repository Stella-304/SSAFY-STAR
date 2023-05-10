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

    //React에서 로그인 정보를 보내주기 위해 실행하는 함수
    public void GetLogin(int isLogin)
    {
        if (isLogin == 1)
        {
            Debug.Log("로그인 함");
        }
        else if (isLogin == 0)
        {
            Debug.Log("로그인 하지 않음");
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
        }
        else
        {
            Debug.Log("닉네임:" + nickname);
        }
    }

    //Unity에서 플레이 버튼을 눌렀을때 실행되는 함수
    private void BtnPlayOnClicked()
    {
//webGL에서 react로 값을 보냄
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    GetUser(100);
    Debug.Log("보냄");
#endif
        Debug.Log("play");
        if (nickname == null) { Debug.Log("로그인하지 않음"); }
        //SceneManager.LoadScene("Lobby");
    }

    //Unity에서 게스트로 플레이 버튼을 눌렀을때 실행되는 함수
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
