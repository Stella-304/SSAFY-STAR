using Fusion;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NetworkStartBridge : MonoBehaviour
{
    public void Shutdown()
    {
        Debug.Log("Shutdown");
        //foreach (var runner in NetworkRunner.Instances)
        //{
        //    Debug.Log(runner);
        //    runner.Shutdown();
        //}
        for(int i = NetworkRunner.Instances.Count - 1; i >= 0; i--)
        {
            Debug.Log(i);
            NetworkRunner.Instances[i].Shutdown();
        }
    }
}
