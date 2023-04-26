using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using Fusion;

public class MultiplayerChat : NetworkBehaviour
{
    public TMP_Text message;
    public TMP_Text input;
    public TMP_Text usernameInput;
    public string username = "Default";
    // Start is called before the first frame update

    public void SetUserName()
    {
        username = usernameInput.text;
    }

    public void CallMessageRPC()
    {
        string message = input.text;
        RPCSendMessage(username, message);
    }

    [Rpc(RpcSources.All,RpcTargets.All)]
    public void RPCSendMessage(string username, string message, RpcInfo rpcInfo = default)
    {
        this.message.text += $"{username}: {message}\n";
    }
}
