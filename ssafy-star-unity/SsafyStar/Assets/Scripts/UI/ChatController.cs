using System;
using UnityEngine;
using UnityEngine.UIElements;

public class ChatController : MonoBehaviour
{
    private UIDocument doc;
    private VisualElement chat;
    private VisualElement chatbox;

    private bool chatboxVisibility;

    private void Awake()
    {
        doc = GetComponent<UIDocument>();

        chat = doc.rootVisualElement.Q<VisualElement>("Chat");
        chatbox = doc.rootVisualElement.Q<VisualElement>("chatbox");

        chat.AddManipulator(new Clickable(ChatOnClicked));
    }

    private void ChatOnClicked()
    {
        chatbox.style.visibility = chatboxVisibility ? Visibility.Visible : Visibility.Hidden;

        chatboxVisibility = !chatboxVisibility;
    }
}
