using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using Fusion;

public class FaceCamera : MonoBehaviour
{
    Camera cam;
    [SerializeField]
    private TMP_Text textNickname;

    //[Networked]
    //public NetworkString<_16> _nickname { get; set; }

    private void Start()
    {
        cam = Camera.main;
    }

    void Update()
    {
        Transform cameraTransform = cam.transform;

        transform.LookAt(transform.position + cameraTransform.rotation * Vector3.forward, cameraTransform.rotation * Vector3.up);
    }


    //public void SetNickName()
    //{
    //    Debug.Log("SetNickName");
    //    SendMyNickName();
    //}

    ////[Rpc(RpcSources.All, RpcTargets.All)]
    //[Rpc(RpcSources.InputAuthority, RpcTargets.StateAuthority)]
    //public void SendMyNickName(RpcInfo rpcInfo = default)
    //{
    //    Debug.Log("SendMyNickName");
    //    Debug.Log(PlayerPrefs.GetString("Nickname", "Guest"));
    //    //textNickname.text = PlayerPrefs.GetString("Nickname", "Guest");
    //    //_nickname = PlayerPrefs.GetString("Nickname", "Guest");
    //    //textNickname.text = _nickname.ToString();
    //}
}
