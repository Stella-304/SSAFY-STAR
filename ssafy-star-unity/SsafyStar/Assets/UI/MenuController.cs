using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;
using UnityEngine.SceneManagement;

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
    [SerializeField]
    private VisualTreeAsset btnSettingTemplate;
    private VisualElement btnSettings;

    private UIDocument doc;
    private Button btnPlay;
    private Button btnExit;
    private Button btnSetting;
    private Button btnMute;
    private VisualElement cardPlay;
    private VisualElement cardOther;


    private void Awake()
    {
        doc = GetComponent<UIDocument>();

        btnPlay = doc.rootVisualElement.Q<Button>("ButtonPlay");
        btnExit = doc.rootVisualElement.Q<Button>("ButtonExit");
        btnSetting = doc.rootVisualElement.Q<Button>("ButtonSetting");
        btnMute = doc.rootVisualElement.Q<Button>("ButtonMute");
        cardPlay = doc.rootVisualElement.Q<VisualElement>("CardPlay");
        cardOther = doc.rootVisualElement.Q<VisualElement>("CardOther");

        btnWrapper = doc.rootVisualElement.Q<VisualElement>("Buttons");

        btnPlay.clicked += BtnPlayOnClicked;//()=>{ÇÔ¼ö();};
        btnExit.clicked += BtnExitOnClicked;
        btnMute.clicked += BtnMuteOnClicked;
        btnSetting.clicked += BtnSettingOnClicked;

        btnSettings = btnSettingTemplate.CloneTree();
        var btnBack = btnSettings.Q<Button>("ButtonBack");
        btnBack.clicked += BtnBackOnClickec;
    }

    private void BtnPlayOnClicked()
    {
        SceneManager.LoadScene("FusionTest");
    }

    private void BtnExitOnClicked()
    {
        Application.Quit();
    }

    private void BtnMuteOnClicked()
    {
        muted = !muted;
        var bg = btnMute.style.backgroundImage;
        bg.value = Background.FromSprite(muted?muteSprite:unmuteSprite);
        btnMute.style.backgroundImage = bg;

        AudioListener.volume = muted ? 0 : 1;
    }

    private void BtnSettingOnClicked()
    {
        btnWrapper.Clear();
        btnWrapper.Add(btnSettings);
    }

    private void BtnBackOnClickec()
    {
        btnWrapper.Clear();

        btnWrapper.Add(cardPlay);
        btnWrapper.Add(cardOther);

        //btnWrapper.Add(btnPlay);
        //btnWrapper.Add(btnSetting);
        //btnWrapper.Add(btnExit);
    }
}
