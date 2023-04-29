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
    private bool inputfieldClicked = false;

    private MultiplayerChat multiChat;

    private void Awake()
    {
        doc = GetComponent<UIDocument>();
        multiChat = GetComponentInChildren<MultiplayerChat>();

        chat = doc.rootVisualElement.Q<VisualElement>("Chat");
        chatbox = doc.rootVisualElement.Q<VisualElement>("chatbox");
        inputfield = doc.rootVisualElement.Q<TextField>("chatInputField");

        chatbox.style.visibility = Visibility.Hidden;

        chat.AddManipulator(new Clickable(ChatOnClicked));
        //chatbox.AddManipulator(new Clickable(InputFieldClicked));
        inputfield.RegisterCallback<KeyDownEvent>(e =>
        {
            if(e.keyCode.ToString() == "Return")
            {
                Debug.Log("나는엔터");
                Debug.Log(inputfield.text);
                multiChat.CallMessageRPC(inputfield.text);
                inputfield.value = "";
                //inputfield.SetEnabled(false);
            }
        });
    }

    private void ChatOnClicked()
    {
        chatbox.style.visibility = chatboxVisibility ? Visibility.Hidden : Visibility.Visible;

        chatboxVisibility = !chatboxVisibility;
    }

    //private void InputFieldClicked()
    //{
    //    Debug.Log("clicked");

    //    inputfield.SetEnabled(inputfieldClicked ? true : false);

    //    inputfieldClicked = !inputfieldClicked;
    //}
}
