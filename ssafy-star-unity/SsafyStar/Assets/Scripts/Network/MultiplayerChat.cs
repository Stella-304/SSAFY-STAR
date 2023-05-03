using System;
using UnityEngine;
using Fusion;
using UnityEngine.UIElements;

public class MultiplayerChat : NetworkBehaviour
{
    public string username = "Default";

    private UIDocument doc;
    private Label chatText;

    private void Start()
    {
        doc = GetComponentInParent<UIDocument>();
        chatText = doc.rootVisualElement.Q<Label>("chattext");
    }

    public void SetUserName(string text)
    {
        username = text;
    }

    public void CallMessageRPC(string text)
    {
        RPCSendMessage(username, text);
    }

    [Rpc(RpcSources.All,RpcTargets.All)]
    public void RPCSendMessage(string username, string message, RpcInfo rpcInfo = default)
    {
        chatText.text += $"{username}: {message}\n";
    }
}
