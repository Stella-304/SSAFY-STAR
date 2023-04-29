using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameData : MonoBehaviour
{
    NetworkDebugStart networkDebugStart;

    private void Awake()
    {
        networkDebugStart = GameObject.Find("Prototype Network Start").GetComponent<NetworkDebugStart>();
    }

    private void Start()
    {
        networkDebugStart.StartSharedClient();
    }

    public void GameExit()
    {
        networkDebugStart.Shutdown();
    }
}
