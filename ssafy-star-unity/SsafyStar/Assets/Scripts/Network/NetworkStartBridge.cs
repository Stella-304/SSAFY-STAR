using Fusion;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NetworkStartBridge : MonoBehaviour
{
    public void Shutdown()
    {
        for (int i = NetworkRunner.Instances.Count - 1; i >= 0; i--)
        {

            //Debug.Log(i);
            //Debug.Log(NetworkRunner.Instances[i].GetPlayerUserId());
            NetworkRunner.Instances[i].Shutdown();
        }
    }
}
