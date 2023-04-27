using Fusion;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.SceneManagement;

public class NetworkStartBridge : MonoBehaviour
{
    public void Shutdown()
    {
        Debug.Log("shutdownBtn");

        //for (int i = NetworkRunner.Instances.Count - 1; i >= 0; i--)
        //{
        //    Debug.Log(i);
        //    Debug.Log(NetworkRunner.Instances[i].gameObject.name);
        //    NetworkRunner.Instances[i].Shutdown();
        //    Debug.Log("shut!");
        //}

        //Destroy(GameObject.Find("Temporary Runner Prefab"));
        //Destroy(GameObject.Find("Network Start"));
        //Destroy(GameObject.Find("Client A"));
    }
}
