using System.Collections;
using System.Collections.Generic;
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
    //private Button btnExit;
    //private Button btnSetting;
    private Button btnMute;
    private VisualElement cardPlay;
    private VisualElement cardGuest;


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

        //btnSettings = btnSettingTemplate.CloneTree();
        //var btnBack = btnSettings.Q<Button>("ButtonBack");
        //btnBack.clicked += BtnBackOnClickec;
    }

    public void SetNickName(string nickname)
    {
        this.nickname = nickname.Trim();
        Debug.Log("nickname:" + this.nickname);
    }

    public void SetLogin(string result)
    {
        isLogin = result=="true" ? true : false;
        Debug.Log("login:" + isLogin);
    }

    private void BtnPlayOnClicked()
    {
        Debug.Log("play");
        if(nickname == null) { Debug.Log("로그인하지 않음"); }
        //SceneManager.LoadScene("Lobby");
    }

    private void BtnGuestOnClicked()
    {
        Debug.Log("guest");
        //SceneManager.LoadScene("Lobby");
    }

    private void BtnMuteOnClicked()
    {
        muted = !muted;
        var bg = btnMute.style.backgroundImage;
        bg.value = Background.FromSprite(muted?muteSprite:unmuteSprite);
        btnMute.style.backgroundImage = bg;

        AudioListener.volume = muted ? 0 : 1;
    }

    //private void BtnSettingOnClicked()
    //{
    //    btnWrapper.Clear();
    //    btnWrapper.Add(btnSettings);
    //}

    //private void BtnBackOnClickec()
    //{
    //    btnWrapper.Clear();

    //    btnWrapper.Add(cardPlay);
    //    btnWrapper.Add(cardOther);

    //    //btnWrapper.Add(btnPlay);
    //    //btnWrapper.Add(btnSetting);
    //    //btnWrapper.Add(btnExit);
    //}
}
