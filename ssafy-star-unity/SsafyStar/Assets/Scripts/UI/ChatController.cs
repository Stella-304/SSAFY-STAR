using System;
using UnityEngine;
using Fusion;
using UnityEngine.UIElements;
using UnityEngine.UI;
using TMPro;
using System.Security.Cryptography;
using WebGLSupport;

public enum ChatType { Normal = 0, Party, Guild, Whisper, System, Count}
public class ChatController : NetworkBehaviour
{
    [SerializeField]
    private UIDocument doc;
    private VisualElement chat;
    public PlayerMovement player;

    [Header("GUI chatting")]
    [SerializeField]
    private GameObject chatContent;
    [SerializeField]
    private TMP_InputField inputChat;
    [SerializeField]
    private TMP_Text outputChat;
    [SerializeField]
    private UnityEngine.UI.Button sendChat;
    [SerializeField]
    private GameObject textChatPrefab;
    [SerializeField]
    private Transform parentContent;

    [Header("chat type")]
    [SerializeField]
    private Sprite[] spriteChatInputType; // 대화 속성에 해당하는 이미지 에셋
    [SerializeField]
    private UnityEngine.UI.Image imageChatInputType; // 대화 속성 이미지
    [SerializeField]
    private TextMeshProUGUI textInput;
    private ChatType currentInputType; // 현재 대화 속성
    private Color currentTextColor; // 입력에 따라 색상 변환

    private bool chatboxVisibility = false;
    public string username = "Guest";

    private void Awake()
    {
        currentInputType = ChatType.Normal;
        currentTextColor = Color.white;
    }

    private void Start()
    {
        chat = doc.rootVisualElement.Q<VisualElement>("Chat");

        chat.AddManipulator(new Clickable(ChatOnClicked));
    }

    public void Update()
    {
        if (Input.GetKeyDown(KeyCode.KeypadEnter) || Input.GetKeyDown(KeyCode.Return))
        {
            inputChat.Select();

            Debug.Log("enter");
            if (chatboxVisibility)
            {
                if (inputChat.text == "")
                {
                    ChatOnClicked();
                    return;
                }
                Debug.Log("send Message");
                SendMessage();
            }
            else
            {
                ChatOnClicked();
            }

            //대화 입력창 포커스 활성화;
            inputChat.ActivateInputField();
        }

        if(Input.GetKeyDown(KeyCode.Tab)&&chatboxVisibility)
        {
            SetCurrentInputType();
        }
    }

    private void ChatOnClicked()
    {
        Debug.Log("clicked");

        if (chatboxVisibility)
        {
            chatContent.SetActive(false);
        }
        else
        {
            chatContent.SetActive(true);
        }

        chatboxVisibility = !chatboxVisibility;

        player.stop = chatboxVisibility ? true : false;
    }

    public void SetUserName(string text)
    {
        username = text;
    }

    public void SendMessage()
    {
        Debug.Log(inputChat.text);
        RPCSendMessage(username, inputChat.text);
        inputChat.Select();
        inputChat.text = "";
    }

    [Rpc(RpcSources.All, RpcTargets.All)]
    public void RPCSendMessage(string username, string message, RpcInfo rpcInfo = default)
    {
        Debug.Log("<=" + message);

        GameObject clone = Instantiate(textChatPrefab, parentContent);
        ChatCell cell = clone.GetComponent<ChatCell>();

        //clone.GetComponent<TextMeshProUGUI>().text = $"{username}: {message}\n";
        cell.SetUp(currentInputType, currentTextColor, $"{username}: {message}\n");
    }

    private Color ChatTypeToColor(ChatType type)
    {
        Color[] colors = new Color[(int)ChatType.Count] {
            Color.black, Color.blue, Color.green, Color.magenta, Color.yellow
        };

        return colors[(int)type];
    }

    public void SetCurrentInputType()
    {
        //현재 대화 속성을 한 단계씩 변화(귓말, 시스템은 입력 속성에 없기 때문에 제외)
        currentInputType = (int)currentInputType < (int)ChatType.Count - 3 ? currentInputType + 1 : 0;
        //버튼 이미지 변경
        imageChatInputType.sprite = spriteChatInputType[(int)currentInputType];
        //텍스트 색상 변경
        currentTextColor = ChatTypeToColor(currentInputType);
        //대화 입력창의 텍스트 생상 변경
        textInput.color = currentTextColor;
    }
}
