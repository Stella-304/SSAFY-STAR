using Fusion;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NPC : MonoBehaviour
{
    GameObject NPCPrefab;

    public void TryCreateNpc()
    {
    }

    [Rpc(RpcSources.All, RpcTargets.All)]
    public void CreateNpc()
    {

    }

}
