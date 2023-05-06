using System;
using System.Collections.Generic;
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

    public string username = "Guest";

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
    private bool chatboxVisibility = false;

    [Header("chat type")]
    [SerializeField]
    private Sprite[] spriteChatInputType; // ��ȭ �Ӽ��� �ش��ϴ� �̹��� ����
    [SerializeField]
    private UnityEngine.UI.Image imageChatInputType; // ��ȭ �Ӽ� �̹���
    [SerializeField]
    private TextMeshProUGUI textInput;

    private ChatType currentInputType; // ���� ��ȭ �Ӽ�
    private Color currentTextColor; // �Է¿� ���� ���� ��ȯ

    private List<ChatCell> chatList; //��ȭâ�� ��µǴ� ��� ��ȭ�� ����
    private ChatType currentViewType; //���� ��ȭ ���� �Ӽ�

    [Header("whisper")]
    private string lastChatData = ""; //������ ��ȭ ����
    private string lastWhisperID = ""; // ������ �Ӹ� ���
    private string friendID = "Friend";//ģ�� ���̵�;

    private void Awake()
    {
        chatList = new List<ChatCell>();

        currentInputType = ChatType.Normal;
        currentTextColor = Color.black;
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

            //��ȭ �Է�â ��Ŀ�� Ȱ��ȭ;
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

        UpdateChatWithCommand(username, message);
    }

    public void PrintChatData(string username, string message, ChatType type, Color color, RpcInfo rpcInfo = default)
    {
        GameObject clone = Instantiate(textChatPrefab, parentContent);
        ChatCell cell = clone.GetComponent<ChatCell>();

        //clone.GetComponent<TextMeshProUGUI>().text = $"{username}: {message}\n";
        cell.SetUp(type, color, $"{username}: {message}\n");

        chatList.Add(cell);
    }

    public void UpdateChatWithCommand(string username, string message)
    {
        if(!message.StartsWith('/'))
        {
            //lastChatData = message;
            PrintChatData(username, message, currentInputType, currentTextColor);
            return;
        }

        //// �������� �ۼ��� ���� �ٽ� ���
        //if(message.StartsWith("/re"))
        //{
        //    if(lastChatData.Equals(""))
        //    {
        //        inputChat.text = "";
        //        return;
        //    }

        //    UpdateChatWithCommand(lastChatData, message);
        //}
        //�Ӹ�
        if(message.StartsWith("/w"))
        {
            //lastChatData = message;

            //��ɾ�, �Ӹ����, ����
            string[] whisper = message.Split(' ', 3);

            //��� ������ ���̵� �˻��� ������ ���̵� �ִ��� �˻� ��
            //����� ������ ������ ������ �ý��� �޼��� ���
            if (whisper[1]==friendID)
            {
                lastWhisperID = whisper[1];

                PrintChatData(username, $"[to {whisper[1]}] {whisper[2]}", ChatType.Whisper, ChatTypeToColor(ChatType.Whisper));
            }
            else
            {
                PrintChatData("[system]", $"[{whisper[1]}]���� ã�� ���߽��ϴ�", ChatType.System, ChatTypeToColor(ChatType.System));
            }
        }
        //�������� �Ӹ��� ���� ��󿡰� �ٽ� �Ӹ� ������
        else if(message.StartsWith("/r"))
        {
            if(lastWhisperID.Equals(""))
            {
                inputChat.text = "";
                return;
            }

            //lastChatData = message;

            string[] whisper = message.Split(' ', 2);

            PrintChatData(username, $"[to {lastWhisperID}] {whisper[1]}", ChatType.Whisper, ChatTypeToColor(ChatType.Whisper));
        }
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
        //���� ��ȭ �Ӽ��� �� �ܰ辿 ��ȭ(�Ӹ�, �ý����� �Է� �Ӽ��� ���� ������ ����)
        currentInputType = (int)currentInputType < (int)ChatType.Count - 3 ? currentInputType + 1 : 0;
        //��ư �̹��� ����
        imageChatInputType.sprite = spriteChatInputType[(int)currentInputType];
        //�ؽ�Ʈ ���� ����
        currentTextColor = ChatTypeToColor(currentInputType);
        //��ȭ �Է�â�� �ؽ�Ʈ ���� ����
        textInput.color = currentTextColor;
    }

    public void SetCurrentViewType(int newType)
    {
        //Button UI�� OnClick �̺�Ʈ�� �������� �Ű������� ó���� �ȵǼ� int�� �޾ƿ´�.
        currentViewType = (ChatType)newType;

        if(currentViewType == ChatType.Normal)
        {
            //��� ��ȭ ��� Ȱ��ȭ
            for(int i = 0; i<chatList.Count; ++i)
            {
                chatList[i].gameObject.SetActive(true);
            }
        }
        else
        {
            //���� ��ȭ ���� ������ Ȱ��ȭ
            for(int i = 0; i<chatList.Count; ++i)
            {
                chatList[i].gameObject.SetActive(chatList[i].ChatType == currentViewType);
            }
        }
    }
}
