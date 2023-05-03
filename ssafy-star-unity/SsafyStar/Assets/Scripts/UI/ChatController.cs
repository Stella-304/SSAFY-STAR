using System;
using UnityEngine;
using Fusion;
using UnityEngine.UIElements;

public class ChatController : NetworkBehaviour
{
    [SerializeField]
    private UIDocument doc;
    private VisualElement chat;
    private VisualElement chatbox;
    private TextField inputfield;
    private Label chatText;
    public PlayerMovement player;

    private bool chatboxVisibility = false;
    public string username = "Default";

    private void Start()
    {
        chat = doc.rootVisualElement.Q<VisualElement>("Chat");
        chatbox = doc.rootVisualElement.Q<VisualElement>("chatbox");
        inputfield = doc.rootVisualElement.Q<TextField>("chatInputField");
        chatText = doc.rootVisualElement.Q<Label>("chattext");

        chatbox.style.visibility = Visibility.Hidden;

        chat.AddManipulator(new Clickable(ChatOnClicked));

        inputfield.RegisterCallback<KeyDownEvent>(e =>
        {
            if(e.keyCode.ToString() == "Return")
            {
                Debug.Log("=>"+inputfield.text);
                CallMessageRPC(inputfield.text);
                inputfield.value = "";
            }
        });
    }

    private void ChatOnClicked()
    {
        Debug.Log("clicked");

        chatbox.style.visibility = chatboxVisibility ? Visibility.Hidden : Visibility.Visible;
        
        chatboxVisibility = !chatboxVisibility;

        player.stop = chatboxVisibility?true:false;
    }

    public void SetUserName(string text)
    {
        username = text;
    }

    public void CallMessageRPC(string text)
    {
        RPCSendMessage(username, text);
    }

    [Rpc(RpcSources.All, RpcTargets.All)]
    public void RPCSendMessage(string username, string message, RpcInfo rpcInfo = default)
    {
        Debug.Log("<="+message);
        chatText.text += $"{username}: {message}\n";
    }
}
