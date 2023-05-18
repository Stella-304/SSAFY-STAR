using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RespawnManager : MonoBehaviour
{
    public Transform respawnPos;

    void OnTriggerEnter(Collider other)
    {
        //Debug.Log("enter");
        //Debug.Log(other.gameObject.name);
        other.GetComponent<PlayerMovement>().doRespawn = true;
    }
}
