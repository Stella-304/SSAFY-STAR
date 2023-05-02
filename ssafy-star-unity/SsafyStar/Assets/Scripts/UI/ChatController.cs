using System;
using UnityEngine;
using UnityEngine.UIElements;

public class ChatController : MonoBehaviour
{
    private UIDocument doc;
    private VisualElement chat;
    private VisualElement chatbox;
    private TextField inputfield;

    private bool chatboxVisibility = false;

    private MultiplayerChat multiChat;
    public PlayerMovement player;

    private void Start()
    {
        doc = GetComponent<UIDocument>();
        multiChat = GetComponentInChildren<MultiplayerChat>();

        chat = doc.rootVisualElement.Q<VisualElement>("Chat");
        chatbox = doc.rootVisualElement.Q<VisualElement>("chatbox");
        inputfield = doc.rootVisualElement.Q<TextField>("chatInputField");

        chatbox.style.visibility = Visibility.Hidden;

        chat.AddManipulator(new Clickable(ChatOnClicked));
        inputfield.RegisterCallback<KeyDownEvent>(e =>
        {
            if(e.keyCode.ToString() == "Return")
            {
                multiChat.CallMessageRPC(inputfield.text);
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

        //if(chatboxVisibility)
        //{
        //    player.stop = true;
        //}
        //else
        //{
        //    player.stop = false;
        //}
    }
}
