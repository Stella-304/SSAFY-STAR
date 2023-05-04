using System;
using UnityEngine;
using Fusion;
using UnityEngine.UIElements;
using UnityEngine.UI;
using TMPro;
using System.Security.Cryptography;
using WebGLSupport;

public class ChatController : NetworkBehaviour
{
    [SerializeField]
    private UIDocument doc;
    private VisualElement chat;
    private VisualElement chatbox;
    //private TextField inputfield;
    //private Label chatText;
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

    private bool chatboxVisibility = false;
    public string username = "Default";

    private void Start()
    {
        chat = doc.rootVisualElement.Q<VisualElement>("Chat");
        chatbox = doc.rootVisualElement.Q<VisualElement>("chatbox");
        //inputfield = doc.rootVisualElement.Q<TextField>("chatInputField");
        //chatText = doc.rootVisualElement.Q<Label>("chattext");

        chatbox.style.visibility = Visibility.Hidden;

        chat.AddManipulator(new Clickable(ChatOnClicked));

        //inputfield.RegisterCallback<KeyDownEvent>(e =>
        //{
        //    if(e.keyCode.ToString() == "Return")
        //    {
        //        Debug.Log("=>"+inputfield.text);
        //        CallMessageRPC(inputfield.text);
        //        inputfield.value = "";
        //    }
        //});
    }

    public void Update()
    {
        if (Input.GetKeyDown(KeyCode.KeypadEnter) || Input.GetKeyDown(KeyCode.Return))
        {
            inputChat.Select();

            if (inputChat.text == "") return;

            Debug.Log("enter");
            if (chatboxVisibility)
            {
                Debug.Log("send Message");
                SendMessage();
            }
        }
    }

    private void ChatOnClicked()
    {
        Debug.Log("clicked");

        //chatbox.style.visibility = chatboxVisibility ? Visibility.Hidden : Visibility.Visible;

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

    //public void CallMessageRPC(string text)
    //{
    //    RPCSendMessage(username, text);
    //}

    [Rpc(RpcSources.All, RpcTargets.All)]
    public void RPCSendMessage(string username, string message, RpcInfo rpcInfo = default)
    {
        Debug.Log("<=" + message);
        outputChat.text += $"{username}: {message}\n";
        //chatText.text += $"{username}: {message}\n";
    }
}
