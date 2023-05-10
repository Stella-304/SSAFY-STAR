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
    public static MenuController Instance;

    [Header("Mute Button")]
    [SerializeField]
    private Sprite muteSprite;
    [SerializeField]
    private Sprite unmuteSprite;
    private bool muted;

    [Header("WebGL")]
    private string _nickname = "";
    private string _token = "";

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

    private bool isGuest = false;

    [DllImport("__Internal")]
    private static extern void GetUser(int accessNumber);

    private void Awake()
    {
        Instance = this;

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

        isGuest = false;
        //webGL에서 react로 값을 보냄
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    GetUser(100);
    Debug.Log("Unity -> React 보냄");
#endif
    }

    //Unity에서 게스트로 플레이 버튼을 눌렀을때 실행되는 함수
    private void BtnGuestOnClicked()
    {
        isGuest = true;
        OpenNickNamePanel();
    }

    //React에서 로그인 정보를 보내주기 위해 실행하는 함수
    public void GetLogin(string token)
    {
        if (token != "")
        {
            Debug.Log("로그인 함 email:" + token);
            _token = token;
        }
        else
        {
            Debug.Log("로그인 하지 않음");
            _token = "";
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
        Debug.Log("OpenNickNamePanel");
        panelNickname.SetActive(true);
    }

    public void CheckDuplicate()
    {
        Debug.Log("CheckDuplicate");
        _nickname = textNickname.text;
        if (_nickname.Length > 10)
        {
            textResult.gameObject.SetActive(true);
            textResult.text = "10글자 이내로 입력해주세요";
            _nickname = "";
        }
        else
        {
            Debug.Log("10글자 이내");
            StartCoroutine(Request.Instance.ApiGetRequest($"/app/user/nickname/check-duplicate?nickname={_nickname}",
                                                          _nickname, "nickname", _token));
        }
    }

    public void PrintError(string message)
    {
        if (message == "중복")
        {
            textResult.text = "중복된 닉네임입니다.";
        }
        else if (message == "실패")
        {
            textResult.text = "닉네임 등록에 실패했습니다.";
        }
    }

    public void SetNickName()
    {
        _nickname = textNickname.text;
        Debug.Log("SetNickName");
        if (isGuest)
        {
            SceneManager.LoadScene("Lobby");
        }
        else
        {
            StartCoroutine(Request.Instance.ApiPatchRequest("/app/user", _nickname, "nickname", _token));
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
