//using System;
//using UnityEngine;
//using Fusion;
//using UnityEngine.UIElements;

//public class MultiplayerChat : NetworkBehaviour
//{
//    public string username = "Default";

//    public UIDocument doc;
//    [SerializeField]
//    private ChatController chatController;
//    private Label chatText;

//    public void Start()
//    {
//        Debug.Log("start");
//        chatController.multiChat = this.gameObject.GetComponent<MultiplayerChat>();
//        chatText = doc.rootVisualElement.Q<Label>("chattext");
//    }

//    public void SetUserName(string text)
//    {
//        username = text;
//    }

//    public void CallMessageRPC(string text)
//    {
//        RPCSendMessage(username, text);
//    }

//    [Rpc(RpcSources.All,RpcTargets.All)]
//    public void RPCSendMessage(string username, string message, RpcInfo rpcInfo = default)
//    {
//        Debug.Log(chatText);
//        chatText.text += $"{username}: {message}\n";
//    }
//}